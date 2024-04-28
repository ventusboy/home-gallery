import { AbstractPluginFactory } from '@home-gallery/types'
import { PluginManager } from '@home-gallery/plugin-manager'

{{#module.extractor}}
import {{ className }}Extractor from './extractor'
{{/module.extractor}}
{{#module.database}}
import {{ className }}DatabaseMapper from './database'
{{/module.database}}
{{#module.query}}
import {{ className }}QueryFactory from './query'
{{/module.query}}
{{#module.webapp}}
import {{ className }}WebAppFactory from './webapp'
{{/module.webapp}}

export class {{ className }}PluginFactory extends AbstractPluginFactory {
  manager: PluginManager

  constructor(manager: PluginManager) {
    this.manager = manager
  }
  {{#module.extractor}}

  getExtractors() {
    return [
      new {{ className }}Extractor()
    ]
  }
  {{/module.extractor}}
  {{#module.database}}

  getDatabaseMappers() {
    return [
      new {{ className }}DatabaseMapper()
    ]
  }
  {{/module.database}}
  {{#module.query}}

  getQueryFactory() {
    return [
      new {{ className }}QueryFactory()
    ]
  }
  {{/query}}
  {{#module.webapp}}

  getWebAppFactory() {
    return [
      new {{ className }}WebAppFactory()
    ]
  }
  {{/module.webapp}}
}
