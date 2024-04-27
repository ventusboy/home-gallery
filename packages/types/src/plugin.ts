import { ExtractorPlugin } from './extractor'
import { DatabaseMapperPlugin } from './database'
import { AstTransformRule, AstOrderRule } from './search'

export type Plugin = {
  name: string
  version: string
  dependencies?: PluginDependency[]
  initialize: (manager: PluginMager) => Promise<PluginFactory>
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
  getQueryFactory: () => QueryFactory | null
  getWebAppFactory: () => WebAppFactory | null
}

export abstract class AbstractPluginFactory implements PluginFactory {
  getExtractors() {
    return []
  }

  getDatabaseMappers() {
    return []
  }

  getQueryFactory() {
    return null
  }

  getWebAppFactory() {
    return null
  }
}

export type WebAppFactory = {
  getComponents: () => WebAppComponents[]
}

export type WebAppComponents = {
  name: string
  type: 'detail' | 'nav' | 'viewer'
  priority: number
}

export type QueryFactory = {
  getAstTransformRules: () => AstTransformRule[]
  getAstOrderRules: () => AstOrderRule[]
  stringify: (entry: any) => string
  expression: (ast: any, options: any) => any
}

export abstract class AbstractQueryFactory implements QueryFactory {
  getAstTransformRules() {
    return []
  }

  getAstOrderRules() {
    return []
  }

  stringify(entry: any) {
    return ''
  }

  expression(ast: any, options: any) {
    return ast
  }
}
