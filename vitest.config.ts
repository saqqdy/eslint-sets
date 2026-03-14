import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			exclude: ['src/types.ts', 'src/constants.ts'],
			include: ['src/**/*.ts'],
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
		environment: 'node',
		exclude: ['node_modules', 'dist'],
		globals: true,
		hookTimeout: 30000,
		include: ['test/**/*.test.ts'],
		testTimeout: 30000,
	},
})
