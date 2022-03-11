import { Stream } from 'stream'

export interface FileDetail {
  filename: string
  encoding: string
  mimeType: string
}

export interface Storage {
  save(path: string, file: Stream): void
}
