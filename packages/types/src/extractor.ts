export type ExtractorPlugin = {
  name: string
  phase: 'file' | 'entry' | 'directory'
  after?: string[]
  priority?: number
  init?: (context: ExtractorContext, config: any) => void
  test?: (entry: ExtractorEntry) => boolean
  task: (entry: ExtractorEntry, done: (err: Error | null) => void) => void
  end?: () => void
}

export type ExtractorContext = {
  storage: Storage
}

export type Storage = {
  hasEntryFile: (entry: ExtractorEntry, suffix: string) => boolean
  getEntryDirname: (entry: ExtractorEntry) => string
  getEntryBasename: (entry: ExtractorEntry, suffix: string) => string
  getEntryFilename: (entry: ExtractorEntry, suffix: string) => string
  addEntryFilename: (entry: ExtractorEntry, suffix: string) => void
  addEntryBasename: (entry: ExtractorEntry, basename: string) => void
  /**
   * Reads a file from the storage.
   * 
   * If the suffix ends on `.json` the data is automatically added to the meta key
   * 
   * @param entry 
   * @param suffix 
   * @param cb 
   * @returns 
   */
  readEntryFile: (entry: ExtractorEntry, suffix: string, cb: (err: any, data: any) => void) => void
  /**
   * Write a extracted data to the storage.
   * 
   * If the suffix ends on `.json` the data is
   * serialized and added to the meta of the entry. Otherwise the file is added to the file[]
   * 
   * @param entry Entry of data
   * @param suffix Extractor suffix, eg `-exif.json`
   * @param data Data to write. If suffix ends with `.json` the data is serialized
   * @param cb Callback after write
   */
  writeEntryFile: (entry: ExtractorEntry, suffix: string, data: any, cb: (err: any) => void) => void
}

export type ExtractorEntry = {
  indexName: string
  url: string
  src: string
  filename: string
  type: string
  size: number
  date: Date
  sha1sum: string
  meta: any
  files: any[]
  sidecars: ExtractorEntry[]
}
