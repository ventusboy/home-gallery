import { StorageEntry } from './storage'

export type DatabaseMapperPlugin = {
  name: string
  after?: string[]
  priority?: number
  mapEntry?: (entry: StorageEntry, databaseEntry: any) => void
  mapDirectory?: (entries: StorageEntry[], databaseEntries: any[]) => any[]
  mapDatabase?: (databaseEntries: any[]) => any[]
}
