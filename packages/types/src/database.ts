import { ExtractorEntry } from "./extractor"

export type DatabaseMapperPlugin = {
  name: string
  after?: string[]
  priority?: number
  mapEntry?: (entry: ExtractorEntry, databaseEntry: any) => void
  mapDirectory?: (entries: ExtractorEntry[], databaseEntries: any[]) => any[]
  mapDatabase?: (databaseEntries: any[]) => any[]
}

