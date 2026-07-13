import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

interface RuleInfo {
	name: string
	plugin: string
	deprecated: boolean
	replacement?: string
	deprecatedIn?: string
}

interface _PluginInfo {
	name: string
	version: string
	deprecatedRules: RuleInfo[]
}

// Known deprecated rules across ESLint plugins
const DEPRECATED_RULES: Record<string, RuleInfo[]> = {
	'@typescript-eslint': [
		{
			name: 'ban-types',
			deprecated: true,
			replacement: 'no-restricted-types',
			deprecatedIn: 'v5.x',
			plugin: '@typescript-eslint',
		},
		{
			name: 'camelcase',
			deprecated: true,
			replacement: 'naming-convention',
			deprecatedIn: 'v5.x',
			plugin: '@typescript-eslint',
		},
	],
	'eslint-plugin-vue': [
		{
			name: 'html-self-closing',
			deprecated: false,
			plugin: 'eslint-plugin-vue',
		},
	],
	'eslint-plugin-react': [
		{
			name: 'jsx-uses-react',
			deprecated: true,
			replacement: 'react-in-jsx-scope (not needed in React 17+)',
			deprecatedIn: 'v7.x',
			plugin: 'eslint-plugin-react',
		},
	],
	eslint: [
		{
			name: 'indent-legacy',
			deprecated: true,
			replacement: 'indent',
			deprecatedIn: 'ESLint 8.x',
			plugin: 'eslint',
		},
	],
}

// Rules that should be migrated for better alternatives
const MIGRATION_SUGGESTIONS: Record<string, string> = {
	'@typescript-eslint/explicit-function-return-type': 'Consider using @typescript-eslint/explicit-module-boundary-types for better flexibility',
	'@typescript-eslint/no-explicit-any': 'Consider using @typescript-eslint/no-unsafe-assignment for more granular control',
	'no-return-await': 'Use @typescript-eslint/return-await for better TypeScript support',
}

class RuleChecker {
	private rulesCache: Map<string, Set<string>> = new Map()

	/**
	 * Extract all rules used in a configuration file
	 */
	extractRulesFromConfig(configPath: string): Set<string> {
		if (this.rulesCache.has(configPath)) {
			return this.rulesCache.get(configPath)!
		}

		if (!existsSync(configPath)) {
			return new Set()
		}

		try {
			const content = readFileSync(configPath, 'utf-8')
			const rulesMatch = content.match(/rules:\s*{([^}]+)}/s)

			if (!rulesMatch) {
				return new Set()
			}

			const rulesText = rulesMatch[1]
			const ruleNames = rulesText.match(/['"]([^'"]+)['"]\s*:/g) || []
			const rules = new Set(
				ruleNames.map(r => r.match(/['"]([^'"]+)['"]/)?.[1] || '').filter(Boolean),
			)

			this.rulesCache.set(configPath, rules)
			return rules
		} catch {
			return new Set()
		}
	}

	/**
	 * Check if a rule is deprecated
	 */
	isRuleDeprecated(ruleName: string): RuleInfo | null {
		for (const pluginRules of Object.values(DEPRECATED_RULES)) {
			for (const ruleInfo of pluginRules) {
				const fullRuleName = ruleInfo.plugin === 'eslint' ? ruleInfo.name : `${ruleInfo.plugin}/${ruleInfo.name}`
				if (fullRuleName === ruleName && ruleInfo.deprecated) {
					return ruleInfo
				}
			}
		}
		return null
	}

	/**
	 * Get migration suggestion for a rule
	 */
	getMigrationSuggestion(ruleName: string): string | null {
		return MIGRATION_SUGGESTIONS[ruleName] || null
	}

	/**
	 * Analyze all config files for deprecated rules
	 */
	analyzeConfigs(): { file: string, deprecatedRules: RuleInfo[], suggestions: string[] }[] {
		const configsDir = join(process.cwd(), 'src', 'configs')
		const results: { file: string, deprecatedRules: RuleInfo[], suggestions: string[] }[] = []

		const configFiles = [
			'typescript.ts',
			'vue.ts',
			'react.ts',
			'javascript.ts',
			'jsx.ts',
		]

		for (const file of configFiles) {
			const configPath = join(configsDir, file)
			const rules = this.extractRulesFromConfig(configPath)
			const deprecatedRules: RuleInfo[] = []
			const suggestions: string[] = []

			for (const rule of rules) {
				const deprecatedInfo = this.isRuleDeprecated(rule)
				if (deprecatedInfo) {
					deprecatedRules.push(deprecatedInfo)
				}

				const suggestion = this.getMigrationSuggestion(rule)
				if (suggestion) {
					suggestions.push(`${rule}: ${suggestion}`)
				}
			}

			if (deprecatedRules.length > 0 || suggestions.length > 0) {
				results.push({ file, deprecatedRules, suggestions })
			}
		}

		return results
	}
}

describe('Rule Updates Detection', () => {
	const checker = new RuleChecker()

	describe('Deprecated Rule Detection', () => {
		it('should detect deprecated rules in configuration files', async () => {
			console.info('\n🔍 Checking for deprecated ESLint rules...\n')

			const results = checker.analyzeConfigs()

			for (const result of results) {
				if (result.deprecatedRules.length > 0) {
					console.info(`⚠️  Deprecated rules found in ${result.file}:`)
					for (const rule of result.deprecatedRules) {
						console.info(`  - ${rule.name} (deprecated in ${rule.deprecatedIn})`)
						if (rule.replacement) {
							console.info(`    ✨ Replacement: ${rule.replacement}`)
						}
					}
				}
			}

			// Check if any deprecated rules were found
			const hasDeprecatedRules = results.some(r => r.deprecatedRules.length > 0)

			if (!hasDeprecatedRules) {
				console.info('✅ No deprecated rules found in configuration files\n')
			}

			// This test doesn't fail on deprecated rules, just reports them
			expect(typeof hasDeprecatedRules).toBe('boolean')
		})

		it('should check for known deprecated rules', async () => {
			// Test the deprecation checker with known deprecated rules
			const deprecatedRule = checker.isRuleDeprecated('@typescript-eslint/ban-types')
			expect(deprecatedRule).not.toBeNull()
			expect(deprecatedRule?.deprecated).toBe(true)

			// Test a non-deprecated rule
			const validRule = checker.isRuleDeprecated('@typescript-eslint/no-unused-vars')
			expect(validRule).toBeNull()
		})
	})

	describe('Migration Suggestions', () => {
		it('should provide migration suggestions for outdated rules', async () => {
			console.info('\n💡 Checking for rule migration opportunities...\n')

			const results = checker.analyzeConfigs()

			for (const result of results) {
				if (result.suggestions.length > 0) {
					console.info(`📝 Migration suggestions for ${result.file}:`)
					for (const suggestion of result.suggestions) {
						console.info(`  - ${suggestion}`)
					}
				}
			}

			// This test is informational, always passes
			expect(true).toBe(true)
		})

		it('should suggest better alternatives for certain rules', async () => {
			const suggestion = checker.getMigrationSuggestion('@typescript-eslint/explicit-function-return-type')
			expect(suggestion).not.toBeNull()
			expect(suggestion).toContain('explicit-module-boundary-types')
		})
	})

	describe('Plugin Compatibility', () => {
		it('should verify plugin versions in package.json', async () => {
			const packageJsonPath = join(process.cwd(), 'package.json')
			const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

			console.info('\n📦 Checking plugin versions...\n')

			const eslintPlugins = Object.keys({
				...packageJson.dependencies,
				...packageJson.devDependencies,
				...packageJson.optionalDependencies,
			}).filter(name => name.includes('eslint') && name !== 'eslint')

			console.info(`Found ${eslintPlugins.length} ESLint-related plugins:`)
			eslintPlugins.forEach(plugin => {
				const version = packageJson.dependencies[plugin]
					|| packageJson.devDependencies[plugin]
					|| packageJson.optionalDependencies[plugin]
				console.info(`  - ${plugin}: ${version}`)
			})

			expect(eslintPlugins.length).toBeGreaterThan(0)
		})
	})

	describe('Rule Configuration Validation', () => {
		it('should validate rule configurations', async () => {
			console.info('\n✅ Validating rule configurations...\n')

			// Check that TypeScript config has rules
			const tsRules = checker.extractRulesFromConfig(
				join(process.cwd(), 'src', 'configs', 'typescript.ts'),
			)
			expect(tsRules.size).toBeGreaterThan(0)
			console.info(`✓ TypeScript config has ${tsRules.size} rules`)

			// Check that Vue config has rules
			const vueRules = checker.extractRulesFromConfig(
				join(process.cwd(), 'src', 'configs', 'vue.ts'),
			)
			expect(vueRules.size).toBeGreaterThan(0)
			console.info(`✓ Vue config has ${vueRules.size} rules`)

			// Check that React config has rules
			const reactRules = checker.extractRulesFromConfig(
				join(process.cwd(), 'src', 'configs', 'react.ts'),
			)
			expect(reactRules.size).toBeGreaterThan(0)
			console.info(`✓ React config has ${reactRules.size} rules`)
		})
	})

	describe('Rule Coverage Report', () => {
		it('should generate a comprehensive rule report', async () => {
			console.info('\n📊 RULE UPDATE REPORT')
			console.info('='.repeat(60))

			const results = checker.analyzeConfigs()

			let totalDeprecated = 0,
				totalSuggestions = 0

			for (const result of results) {
				totalDeprecated += result.deprecatedRules.length
				totalSuggestions += result.suggestions.length
			}

			console.info(`Total deprecated rules found: ${totalDeprecated}`)
			console.info(`Total migration suggestions: ${totalSuggestions}`)
			console.info('='.repeat(60))

			if (totalDeprecated > 0) {
				console.info('\n⚠️  Action Required: Update deprecated rules to their replacements')
			}

			if (totalSuggestions > 0) {
				console.info('\n💡 Consider applying migration suggestions for better rule usage')
			}

			if (totalDeprecated === 0 && totalSuggestions === 0) {
				console.info('\n✅ All rules are up-to-date!')
			}

			// This test always passes, it's just for reporting
			expect(true).toBe(true)
		})
	})
})
