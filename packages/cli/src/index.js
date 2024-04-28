#!/usr/bin/env node

const { loggerOptions, loggerMiddleware } = require('./logger')

const yargs = require('yargs');
const fileIndexCli = require('./file-index');
const extractCli = require('./extractor');
const databaseCli = require('./database');
const serverCli = require('./server');
const storageCli = require('./storage');
const exportCli = require('./export');
const fetchCli = require('./fetch');
const castCli = require('./cast');
const interactiveCli = require('./interactive');
const runCli = require('./run')
const pluginCli = require('./plugin')

const cli = () => {
  yargs.usage('Usage: $0 [global options] <command> [options]')
    .env('GALLERY')
    .options(loggerOptions)
    .default('level', undefined, 'debug')
    .middleware(loggerMiddleware)
    .command(fileIndexCli)
    .command(extractCli)
    .command(databaseCli)
    .command(serverCli)
    .command(storageCli)
    .command(exportCli)
    .command(fetchCli)
    .command(castCli)
    .command(interactiveCli)
    .command(runCli)
    .command(pluginCli)
    .demandCommand()
    .help()
    .alias('h', 'help')
    .epilog('(c) 2024 HomeGallery - https://home-gallery.org')
    .argv;
}

module.exports = cli;
