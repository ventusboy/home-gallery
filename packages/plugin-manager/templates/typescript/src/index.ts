import { Plugin } from '@home-gallery/types'
import { PluginManager } from '@home-gallery/plugin-manager'

import {{ className }}PluginFactory from './factory'

export class {{ className }}Plugin extends Plugin {
  name = '{{ pluginName }}'
  version = '1.0'
  // dependencies = []
  async initialize(manager: PluginManager) {
    return new {{ className }}PluginFactory(manager)
  }
}
