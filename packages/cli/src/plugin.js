const log = require('@home-gallery/logger')('cli.export')

const command = {
  command: 'plugin',
  describe: 'Plugin handling',
  builder: (yargs) => {
    return yargs.option({
      config: {
        alias: 'c',
        describe: 'Configuration file'
      },
      'auto-config': {
        boolean: true,
        default: true,
        describe: 'Search for configuration on common configuration directories'
      },
    })
    .command(
      ['create', '$0'],
      'Create a new plugin',
      (yargs) => yargs
        .options({
          name: {
            required: true,
            describe: 'Plugin name'
          },
          dir: {
            describe: 'Output directory'
          },
          modules: {
            required: true,
            array: true,
            describe: 'Plugin modules. Any set of extractor, database, query, webapp'
          },
        }),
      (argv) => {
        const { createPlugin } = require('@home-gallery/plugin')
        const { load, mapArgs, validatePaths } = require('./config')

        const argvMapping = {
          'name': 'plugin.name',
          'dir': 'plugin.outDir',
          'modules': 'plugin.modules'
        }

        const setDefaults = config => {
          config.plugin.outDir = config.plugin.outDir || config.plugins?.dir || 'plugins'
        }
        
        const run = async() => {
          const options = await load(argv.config, false, argv.autoConfig)

          mapArgs(argv, options.config, argvMapping)
          setDefaults(options.config)
          validatePaths(options.config, [])

          return createPlugin(options)
        }

        const t0 = Date.now();
        run()
          .then((dir) => {
            log.info(t0, `Created plugin at ${dir}`);
          })
          .catch(err => {
            log.error(err, `Plugin creation failed: ${err}`);
            process.exit(1)
          })

      }
    )
  }
}

module.exports = command;
