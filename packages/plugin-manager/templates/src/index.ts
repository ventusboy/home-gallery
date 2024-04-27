import { Plugin, AbstractPluginFactory } from '@home-gallery/types'
import { PluginManager } from '@home-gallery/plugin-manager'
{{#extractor}}
import {{ pluginName }}Extractor from './extractor'
{{/extractor}}
{{#database}}
import {{ pluginName }}DatabaseMapper from './database'
{{/database}}
{{#query}}
import {{ pluginName }}QueryFactory from './query'
{{/query}}
{{#webapp}}
import {{ pluginName }}WebAppFactory from './webapp'
{{/webapp}}

class {{ pluginName }}PluginFactory extends AbstractPluginFactory {
  manager: PluginManager

  constructor(manager: PluginManager) {
    this.manager = manager
  }
  {{#extractor}}

  getExtractors() {
    return [
      new {{ pluginName }}Extractor()
    ]
  }
  {{/extractor}}
  {{#database}}

  getDatabaseMappers() {
    return [
      new {{ pluginName }}DatabaseMapper()
    ]
  }
  {{/database}}
  {{#query}}

  getQueryFactory() {
    return [
      new {{ pluginName }}QueryFactory()
    ]
  }
  {{/query}}
  {{#webapp}}

  getWebAppFactory() {
    return [
      new {{ pluginName }}WebAppFactory()
    ]
  }
  {{/webapp}}
}

export class {{ pluginName }}Plugin extends Plugin {
  name: '{{ pluginName }}'
  version: '1.0'
  dependencies: []
  async initialize(manager: PluginManager) {
    return new {{ pluginName }}PluginFactory(manager)
  }
}
