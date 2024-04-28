import { ExtractorContext, ExtractorEntry } from '@home-gallery/types'
import Logger from '@home-gallery/logger'

const log = Logger('{{ name }}.extractor')

export class {{ className }}Extractor {
  name = '{{ name }}'
  phase = '{{ module.extractor.phase }}'
  // after = []
  // priority = 100
  
  init(context: ExtractorContext, config: any, done: (err: Error | null) => void) => {
    done()
  }
  
  test(entry: ExtractorEntry | ExtractorEntry[]) {
    return true
  }
  
  task(entry: ExtractorEntry | ExtractorEntry[], done: (err: Error | null) => void) {
    log.info(`Process ${entry}`)
    return done()
  }

  end(done: () => void) {
    done()
  }
}
