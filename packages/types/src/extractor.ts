import { Storage, StorageEntry } from './storage'

export type ExtractorPlugin = {
  name: string
  phase: ExtratorPhase
  after?: string[]
  priority?: number
  init?: (context: ExtractorContext, config: any, done: (err: Error | null) => void) => void
  test?: (entry: ExtractorEntry | ExtractorEntry[]) => boolean
  task: (entry: ExtractorEntry | ExtractorEntry[], done: (err: Error | null) => void) => void
  end?: () => void
}

/**
 * file: Is called on each single file. Eg. IMG_1234.jpg and IMG_1234.jpg.xmp
 *
 * entry: Is called on main file merged with sidecars.
 * Files are grouped by common basename. E.g. IMG_1234.jpg, IMG_1234.jpg.xmp and IMG_1234.json share the basename IMG_1234 and are grouped together
 * The main file is the largest file while the others are the side car files
 *
 * directory: Is called on directories with all entries
 */
export type ExtratorPhase = 'file' | 'entry' | 'directory'

export type ExtractorContext = {
  storage: Storage
}

export type ExtractorEntry = StorageEntry & {
  src: string
}
