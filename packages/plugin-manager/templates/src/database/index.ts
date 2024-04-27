import { AbstractDatabaseMapperPlugin } from '@home-gallery/types'
import Logger from '@home-gallery/logger'

const log = Logger('{{ pluginName }}.database')

export class {{ pluginName }}DatabaseMapper extends AbstractDatabaseMapperPlugin {
  name = '{{ pluginName }}'
  after: string[] = []
  priority = 100
  
  mapEntry(entry: StorageEntry, databaseEntry: any) {
    log.info(`Map database entry: ${entry}`)
  }
  
  mapDirectory(entries: StorageEntry[], databaseEntries: any[]) {
    log.info(`Map directory with ${databaseEntries.length} entries`)
    return databaseEntries
  }
  
  mapDatabase(databaseEntries: any[]) {
    log.info(`Map database with ${databaseEntries.length} entries`)
    return databaseEntries;
  }
}
