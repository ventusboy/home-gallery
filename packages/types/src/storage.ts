export interface Storage {
  hasFile(entry: StorageEntry, suffix: string): boolean
  getDirname(entry: StorageEntry): string
  getBasename(entry: StorageEntry, suffix: string): string
  getFilename(entry: StorageEntry, suffix: string): string
  addFilename(entry: StorageEntry, suffix: string): void
  addBasename(entry: StorageEntry, basename: string): void
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
  readFile(entry: StorageEntry, suffix: string, cb: (err: any, data: any) => void): void
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
  writeFile(entry: StorageEntry, suffix: string, data: any, cb: (err: any) => void): void
}

export type StorageEntry = {
  indexName: string
  filename: string
  type: string
  size: number
  date: Date
  sha1sum: string
  meta: any
  files: any[]
  sidecars: StorageEntry[]
}
