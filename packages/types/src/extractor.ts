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
 * file: Is called on each single file
 * entry: Is called on file merged with sidecars
 * directory: Is called on directories with all entries
 */
export type ExtratorPhase = 'file' | 'entry' | 'directory'

export type ExtractorContext = {
  storage: Storage
}

export type ExtractorEntry = StorageEntry & {
  src: string
}
