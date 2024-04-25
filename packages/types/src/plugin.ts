import { ExtractorPlugin } from './extractor'
import { DatabaseMapperPlugin } from './database'

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

export type PluginMager = {
  getPlugin: (name: string) => Plugin
}

export type PluginFactory = {
  getExtractors: () => ExtractorPlugin[]
  getDatabaseMappers: () => DatabaseMapperPlugin[]
  getSearch: () => void
  getViewFactory: () => ViewPluginFactory
}

export type ViewPluginFactory = {

}
