/* globals gauge */
"use strict";

const { runCli } = require('../utils');

step("Create plugin <name> with modules <modules>", async (name, modules) => {
  return runCli(['plugin', 'create', '--name', name, '--modules', modules.split('\s*,\s*')]);
})

