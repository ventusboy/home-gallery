import fs from 'fs/promises'
import path from 'path'

import Mustache from 'mustache'

export type CreateOptions = {
  outDir: string
}

export interface PluginVars {
  pluginName: string
  withReact: boolean
}

export const create = async (options: CreateOptions) => {
  const templateDir = path.resolve(__dirname, '..', 'templates')
  const vars = {
    pluginName: 'foo',
    extractor: {
      phase: 'entry'
    },
    database: {
      
    },
    webapp: {
      
    }
  }

  const templateConfig = await fs.readFile(path.resolve(templateDir, 'template.config.json'))
  
  const files = await readDir(templateDir)

  for (let file in files) {
    const template = await fs.readFile(path.resolve(templateDir, file), 'utf8')
    const rendered = Mustache.render(template, vars)
    
    const target = path.resolve(options.outDir, file)
    await fs.mkdir(path.dirname(target), {recursive: true})
    await fs.writeFile(target, rendered, 'utf8')
  }
}

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