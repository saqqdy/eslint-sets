import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface CoverageData {
	config: string
	coverage: number
	scenarios: string[]
	testFiles: number
	rules: number
	missing: string[]
}

interface FrameworkInfo {
	name: string
	configOption: string
	testFile: string
	scenarios: string[]
}

interface CoverageReport {
	timestamp: string
	version: string
	summary: {
		total: number
		covered: number
		averageCoverage: number
		totalScenarios: number
		missingScenarios: number
	}
	frameworks: CoverageData[]
	recommendations: string[]
}

const FRAMEWORKS: FrameworkInfo[] = [
	{ name: 'JavaScript', configOption: 'javascript', testFile: 'javascript.test.ts', scenarios: ['basic', 'strict', 'node'] },
	{ name: 'TypeScript', configOption: 'typescript', testFile: 'typescript.test.ts', scenarios: ['basic', 'strict', 'type-aware'] },
	{ name: 'Vue', configOption: 'vue', testFile: 'vue.test.ts', scenarios: ['vue2', 'vue3', 'composition-api'] },
	{ name: 'React', configOption: 'react', testFile: 'react.test.ts', scenarios: ['basic', 'hooks', 'jsx'] },
	{ name: 'Svelte', configOption: 'svelte', testFile: 'svelte.test.ts', scenarios: ['basic', 'svelte5'] },
	{ name: 'Astro', configOption: 'astro', testFile: 'astro.test.ts', scenarios: ['basic', 'islands'] },
	{ name: 'UnoCSS', configOption: 'unocss', testFile: 'unocss.test.ts', scenarios: ['basic', 'shortcuts'] },
	{ name: 'Solid', configOption: 'solid', testFile: 'solid.test.ts', scenarios: ['basic', 'components'] },
	{ name: 'Unicorn', configOption: 'unicorn', testFile: 'unicorn.test.ts', scenarios: ['basic'] },
	{ name: 'YAML', configOption: 'yaml', testFile: 'yaml.test.ts', scenarios: ['basic'] },
]

function parseCoverageOutput(output: string): number {
	// Parse vitest coverage output
	const match = output.match(/All files\s+\|\s+(\d+\.?\d*)/)
	return match ? Number.parseFloat(match[1]) : 0
}

function getTestScenarios(testFile: string): string[] {
	const testPath = join(process.cwd(), 'test', testFile)
	if (!existsSync(testPath)) {
		return []
	}

	try {
		const content = readFileSync(testPath, 'utf-8')
		const describeMatches = content.matchAll(/describe\(['"]([^'"]+)['"]/g)
		const itMatches = content.matchAll(/it\(['"]([^'"]+)['"]/g)

		const scenarios = new Set<string>()
		for (const match of describeMatches) {
			scenarios.add(match[1])
		}
		for (const match of itMatches) {
			scenarios.add(match[1])
		}

		return Array.from(scenarios)
	} catch {
		return []
	}
}

function countTestFiles(config: string): number {
	const testDir = join(process.cwd(), 'test')
	try {
		const output = execSync(`find ${testDir} -name "*.test.ts"`, { encoding: 'utf-8' })
		const files = output.trim().split('\n').filter(f => f.includes(config) || f.includes(config.replace('js', 'javascript')))
		return files.length
	} catch {
		return 0
	}
}

function getRuleCount(config: string): number {
	// Try to read the source config file and count rules
	const configPath = join(process.cwd(), 'src', 'configs', `${config}.ts`)
	if (existsSync(configPath)) {
		try {
			const content = readFileSync(configPath, 'utf-8')
			// Count rules in the config
			const rulesMatches = content.match(/rules:\s*{/g)
			return rulesMatches ? rulesMatches.length : 0
		} catch {
			return 0
		}
	}
	return 0
}

function generateRecommendations(results: CoverageData[]): string[] {
	const recommendations: string[] = []

	// Find frameworks with low coverage
	const lowCoverage = results.filter(r => r.coverage < 80)
	if (lowCoverage.length > 0) {
		recommendations.push(`Improve test coverage for: ${lowCoverage.map(r => r.config).join(', ')}`)
	}

	// Find frameworks with missing scenarios
	const missingScenarios = results.filter(r => r.missing.length > 0)
	if (missingScenarios.length > 0) {
		recommendations.push(`Add missing test scenarios for: ${missingScenarios.map(r => r.config).join(', ')}`)
	}

	// Check for frameworks without test files
	const noTests = results.filter(r => r.testFiles === 0)
	if (noTests.length > 0) {
		recommendations.push(`Create test files for: ${noTests.map(r => r.config).join(', ')}`)
	}

	return recommendations
}

async function generateCoverageReport(): Promise<CoverageReport> {
	console.log('🔍 Analyzing test coverage for all frameworks...\n')

	const results: CoverageData[] = []

	// Read package.json for version
	const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))

	for (const framework of FRAMEWORKS) {
		console.log(`📊 Analyzing ${framework.name}...`)

		const testScenarios = getTestScenarios(framework.testFile)
		const missingScenarios = framework.scenarios.filter(s => !testScenarios.some(ts => ts.toLowerCase().includes(s.toLowerCase())))

		let coverage = 0
		try {
			// Run tests with coverage for this framework
			const output = execSync(
				`pnpm vitest run test/${framework.testFile} --coverage --reporter=json 2>/dev/null || echo "{}"`,
				{
					encoding: 'utf-8',
					stdio: 'pipe',
					timeout: 60000,
				},
			)
			coverage = parseCoverageOutput(output)
		} catch {
			// If test fails, still try to get some coverage data
			console.log(`  ⚠️  Test execution failed for ${framework.name}`)
		}

		const data: CoverageData = {
			config: framework.name,
			coverage,
			scenarios: testScenarios,
			testFiles: countTestFiles(framework.configOption),
			rules: getRuleCount(framework.configOption),
			missing: missingScenarios,
		}

		results.push(data)
		console.log(`  ✓ Coverage: ${coverage}%`)
		console.log(`  ✓ Scenarios: ${testScenarios.length}`)
		console.log(`  ✓ Missing: ${missingScenarios.length}\n`)
	}

	const summary = {
		total: results.length,
		covered: results.filter(r => r.coverage > 0).length,
		averageCoverage: Math.round(results.reduce((sum, r) => sum + r.coverage, 0) / results.length),
		totalScenarios: results.reduce((sum, r) => sum + r.scenarios.length, 0),
		missingScenarios: results.reduce((sum, r) => sum + r.missing.length, 0),
	}

	const recommendations = generateRecommendations(results)

	const report: CoverageReport = {
		timestamp: new Date().toISOString(),
		version: packageJson.version,
		summary,
		frameworks: results,
		recommendations,
	}

	// Write JSON report
	const reportPath = join(process.cwd(), 'coverage-report.json')
	writeFileSync(reportPath, JSON.stringify(report, null, 2))
	console.log(`\n📄 Coverage report saved to: ${reportPath}`)

	// Write Markdown report
	const markdownPath = join(process.cwd(), 'coverage-report.md')
	generateMarkdownReport(report, markdownPath)
	console.log(`📄 Coverage report (Markdown) saved to: ${markdownPath}`)

	// Print summary
	console.log(`\n${'='.repeat(60)}`)
	console.log('📊 COVERAGE SUMMARY')
	console.log('='.repeat(60))
	console.log(`Total Frameworks: ${summary.total}`)
	console.log(`Covered: ${summary.covered}`)
	console.log(`Average Coverage: ${summary.averageCoverage}%`)
	console.log(`Total Scenarios: ${summary.totalScenarios}`)
	console.log(`Missing Scenarios: ${summary.missingScenarios}`)
	console.log('='.repeat(60))

	if (recommendations.length > 0) {
		console.log('\n💡 RECOMMENDATIONS:')
		recommendations.forEach((rec, i) => {
			console.log(`  ${i + 1}. ${rec}`)
		})
	}

	return report
}

function generateMarkdownReport(report: CoverageReport, outputPath: string): void {
	const lines: string[] = [
		'# ESLint Sets - Test Coverage Report',
		'',
		`**Generated:** ${report.timestamp}`,
		`**Version:** ${report.version}`,
		'',
		'## 📊 Summary',
		'',
		`| Metric | Value |`,
		`|--------|-------|`,
		`| Total Frameworks | ${report.summary.total} |`,
		`| Covered | ${report.summary.covered} |`,
		`| Average Coverage | ${report.summary.averageCoverage}% |`,
		`| Total Scenarios | ${report.summary.totalScenarios} |`,
		`| Missing Scenarios | ${report.summary.missingScenarios} |`,
		'',
		'## 🎯 Framework Coverage',
		'',
		`| Framework | Coverage | Scenarios | Test Files | Rules | Missing |`,
		`|-----------|----------|-----------|------------|-------|---------|`,
	]

	for (const framework of report.frameworks) {
		const missingBadge = framework.missing.length > 0 ? `⚠️ ${framework.missing.length}` : '✅ 0'
		lines.push(
			`| ${framework.config} | ${framework.coverage}% | ${framework.scenarios.length} | ${framework.testFiles} | ${framework.rules} | ${missingBadge} |`,
		)
	}

	if (report.recommendations.length > 0) {
		lines.push('')
		lines.push('## 💡 Recommendations')
		lines.push('')
		for (const rec of report.recommendations) {
			lines.push(`- ${rec}`)
		}
	}

	writeFileSync(outputPath, lines.join('\n'))
}

// Run the coverage report
generateCoverageReport().catch(console.error)
