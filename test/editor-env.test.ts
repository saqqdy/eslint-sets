import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { EDITOR_ENV_KEYS } from '../src/constants'
import { isInEditorEnv, isInGitHooksOrLintStaged } from '../src/utils'

/**
 * Editor-environment detection controls whether strict-but-annoying rules
 * (e.g. `prefer-const`, `unused-imports`) are downgraded to `warn` in editors
 * and left as `error` in CI / git hooks. These tests pin the v6.6.0 guards:
 *
 * - CI always returns false (rules stay strict)
 * - git hooks / lint-staged always return false (rules stay strict)
 * - ZED editor (not its bundled terminal) counts as an editor
 * - only the keys in EDITOR_ENV_KEYS trigger detection (TERM_PROGRAM was removed)
 *
 * Each test sets a minimal `process.env` so results do not depend on where
 * vitest happens to run (e.g. a VS Code terminal with VSCODE_PID exported).
 */
describe('isInGitHooksOrLintStaged', () => {
	let originalEnv: typeof process.env
	beforeEach(() => {
		originalEnv = { ...process.env }
	})
	afterEach(() => {
		process.env = originalEnv
	})

	it('returns true when GIT_PARAMS is set', () => {
		process.env = { GIT_PARAMS: 'commit-msg' }
		expect(isInGitHooksOrLintStaged()).toBe(true)
	})

	it('returns true when VSCODE_GIT_COMMAND is set', () => {
		process.env = { VSCODE_GIT_COMMAND: 'git.commit' }
		expect(isInGitHooksOrLintStaged()).toBe(true)
	})

	it('returns true when npm_lifecycle_script starts with lint-staged', () => {
		process.env = { npm_lifecycle_script: 'lint-staged' }
		expect(isInGitHooksOrLintStaged()).toBe(true)
	})

	it('returns false when npm_lifecycle_script does not start with lint-staged', () => {
		process.env = { npm_lifecycle_script: 'vitest run' }
		expect(isInGitHooksOrLintStaged()).toBe(false)
	})

	it('returns false when no markers are set', () => {
		process.env = {}
		expect(isInGitHooksOrLintStaged()).toBe(false)
	})
})

describe('isInEditorEnv', () => {
	let originalEnv: typeof process.env
	beforeEach(() => {
		originalEnv = { ...process.env }
	})
	afterEach(() => {
		process.env = originalEnv
	})

	it('returns false in CI even when editor keys are set', () => {
		process.env = { CI: 'true', VSCODE_PID: '12345' }
		expect(isInEditorEnv()).toBe(false)
	})

	it('returns false in a git hook (GIT_PARAMS) even with editor keys', () => {
		process.env = { GIT_PARAMS: 'x', VSCODE_PID: '12345' }
		expect(isInEditorEnv()).toBe(false)
	})

	it('returns false in lint-staged even with editor keys', () => {
		process.env = { npm_lifecycle_script: 'lint-staged', VSCODE_PID: '12345' }
		expect(isInEditorEnv()).toBe(false)
	})

	it('returns true for ZED editor (ZED_ENVIRONMENT without ZED_TERM)', () => {
		process.env = { ZED_ENVIRONMENT: '1' }
		expect(isInEditorEnv()).toBe(true)
	})

	it('returns false for ZED bundled terminal (ZED_ENVIRONMENT with ZED_TERM)', () => {
		process.env = { ZED_ENVIRONMENT: '1', ZED_TERM: '1' }
		expect(isInEditorEnv()).toBe(false)
	})

	// Every key in EDITOR_ENV_KEYS must trigger detection on its own.
	it.each(EDITOR_ENV_KEYS)('returns true when editor key "%s" is set', key => {
		process.env = { [key]: '1' }
		expect(isInEditorEnv()).toBe(true)
	})

	it('returns false for TERM_PROGRAM (removed from EDITOR_ENV_KEYS)', () => {
		// TERM_PROGRAM caused CI false-positives and was dropped in v6.6.0.
		process.env = { TERM_PROGRAM: 'apple-vscode' }
		expect(isInEditorEnv()).toBe(false)
	})

	it('returns false when no editor markers are set', () => {
		process.env = {}
		expect(isInEditorEnv()).toBe(false)
	})
})
