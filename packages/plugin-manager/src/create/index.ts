import fs from 'fs/promises'
import path from 'path'
import Mustache from 'mustache'

import Logger from '@home-gallery/logger'

const log = Logger('plugin.create')

export type CreateOptions = {
  name: string
  outDir: string
}

export interface PluginVars {
  pluginName: string
  withReact: boolean
}

export const createPlugin = async (options: any) => {
  const templateDir = path.resolve(__dirname, '..', 'templates')

  const createOptions: CreateOptions = options.config.plugin
  const vars = {
    name: createOptions.name,
    className: toClassName(createOptions.name),
    onlyWebapp: false,
    modules: {
      extractor: {
        phase: 'entry'
      },
      database: {
        
      },
      query: {

      },
      webapp: {
        
      }
    }
  }

  const templateType = 'typescript'
  const templateConfig = await readJson(path.resolve(templateDir, templateType, 'template.config.json'))
  
  const files = [...templateConfig.files]
  const activeModules = Object.keys(vars.modules || {})
  activeModules.forEach(module => {
    files.push(...templateConfig.modules[module])
  })

  for (let file of files) {
    const template = await fs.readFile(path.resolve(templateDir, templateType, file), 'utf8')
    const rendered = Mustache.render(template, vars)
    
    const target = path.resolve(createOptions.outDir, createOptions.name, file.replace(/\.mustache$/, ''))
    await fs.mkdir(path.dirname(target), {recursive: true})
    await fs.writeFile(target, rendered, 'utf8')
    log.debug(`Wrote ${target}`)
  }
}

const readJson = async (file: string): Promise<any> => {
  const data = await fs.readFile(file, 'utf8')
  return JSON.parse(data)
}

const toClassName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

const readDir = async (dir: string): Promise<string[]> => {
  const files = await fs.readdir(dir)
  const stats = await Promise.all(files.map(file => fs.stat(path.resolve(dir, file))))

  const result: string[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const isDir = stats[i].isDirectory()
    if (isDir) {
      const subFiles = await readDir(path.resolve(dir, file))
      result.push(...subFiles.map(subFile => path.resolve(file, subFile)))
    } else {
      result.push(file)
    }
  }
  return result
}