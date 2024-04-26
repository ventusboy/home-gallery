import { ExtractorPlugin } from './extractor'
import { DatabaseMapperPlugin } from './database'
import { AstTransformRule } from './search'

export type Plugin = {
  name: string
  version: string
  dependencies?: PluginDependency[]
  init: (manager: PluginMager) => PluginFactory
}

export type PluginDependency = {
  name: string
  version?: string
}

export interface PluginMager {
  getApiVersion(): string
  loadPlugin(file: string): void
  loadPluginDir(dir: string): void
  getPlugin(name: string): Plugin
  getPlugins(): Plugin[]
  getPluginFactory(): PluginFactory
}

export type PluginFactory = {
  getExtractors: () => ExtractorPlugin[]
  getDatabaseMappers: () => DatabaseMapperPlugin[]
  getSearchFactory: () => SearchFactory
  getViewFactory: () => ViewPluginFactory
}

export type ViewPluginFactory = {

}

export type SearchFactory = {
  getAstTransformRules: () => AstTransformRule[]
}
