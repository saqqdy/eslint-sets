import { format } from 'util'
import chalk from 'chalk'

/**
 * echo logs
 * @example
 *
 * @param message - log content
 * @param type - log type
 */
export function echo(message: string, type?: 'warning' | 'info' | 'error' | 'success'): void {
	let output = format(message)
	switch (type) {
		case 'warning':
			output = chalk.yellow(output)
			break
		case 'error':
			output = chalk.red(output)
			break
		case 'success':
			output = chalk.green(output)
			break
		default:
			break
	}
	output += '\n'
	process.stdout.write(output)
}

export default echo
