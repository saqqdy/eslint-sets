import { format } from 'util'
import { yellow, red, green } from 'colors'

/**
 * 输出日志
 * @example
 *
 * @param message - 需要输出的内容
 * @param type - 输出的类型
 */
export function echo(
    message: string,
    type?: 'warning' | 'info' | 'error' | 'success'
): void {
    let output = format(message)
    switch (type) {
        case 'warning':
            output = yellow(output)
            break
        case 'error':
            output = red(output)
            break
        case 'success':
            output = green(output)
            break
        default:
            break
    }
    output += '\n'
    process.stdout.write(output)
}

export default echo
