import { AbstractDatabaseMapperPlugin } from '@home-gallery/types'
import Logger from '@home-gallery/logger'

const log = Logger('{{ name }}.database')

export class {{ className }}DatabaseMapper extends AbstractDatabaseMapperPlugin {
  name = '{{ name }}'
  // after: string[] = []
  // priority = 100
  
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
