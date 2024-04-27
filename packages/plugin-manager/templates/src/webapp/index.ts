import { WebAppFactory } from '@home-gallery/types'
import Logger from '@home-gallery/logger'

const log = Logger('{{ pluginName }}.query')

export class {{ pluginName }}WebAppFactory implements WebAppFactory {
  getComponents() {
    return []
  }
}
