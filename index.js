/**
 * Created by scott on 16-3-31.
 */
'use strict'

const sps = require('./static-proxy-server')

module.exports = {
    register,
    run,
    config: {
        port: 8080,
        host: 'localhost',
        browse: true,
        https: false,
        apiProxy: null,
        allowNoPrograms: true
    }
}

/**
 *
 * @param {Command} cmd
 * @param {function(Object)} optionsCallback
 */
function register(cmd, optionsCallback) {
    return cmd
        .description('run a program on the target release dir. program argument or dir option should exist one.')
        .arguments('[program...]')
        .usage('[program...] [options]')
        .option('--dest-prefix <prefix>', 'the output dir prefix you use in your dev or release or other command. Default is release')
        .option('--dest-postfix <postfix>', 'the actual output dir to host every asset')
        .option('--dir <dir>', 'the directory you want the server to serve')
        .option('--no-browse', 'do not open the browser automatically')
        .option('--https', 'use https protocol to serve the resources')
        .action(function (program) {
            const opts = Object.assign({ program: program }, this.opts())
            if (!opts.destPrefix) {
                opts.destPrefix = 'release'
            }
            optionsCallback(opts)
        })
}

function run(runtime) {
    sps(runtime.config)
}
