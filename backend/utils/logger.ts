import chalk from 'chalk'

class Logging {
    public static log = (args: any) => this.info(args)

    public static info = (args: any) => {
        console.info(
            chalk.blue(`[${new Date().toLocaleString()}][INFO]`),
            typeof args === 'string' ? chalk.blueBright(args) : args
        )
    }

    public static warn = (args: any) => {
        console.warn(
            chalk.yellow(`[${new Date().toLocaleString()}][WARN]`),
            typeof args === 'string' ? chalk.yellowBright(args) : args
        )
    }

    public static error = (args: any) => {
        console.error(
            chalk.red(`[${new Date().toLocaleString()}][ERROR]`),
            typeof args === 'string' ? chalk.redBright(args) : args
        )
    }
}

export default Logging
