import { WebAppFactory } from '@home-gallery/types'
import Logger from '@home-gallery/logger'

const log = Logger('{{ pluginName }}.query')

export class {{ className }}WebAppFactory implements WebAppFactory {
  getComponents() {
    return []
  }
}
