import fs from 'fs'
import { ensureFileSync } from 'fs-extra'
import { Stream } from 'stream'
import { join } from 'path'
import { Storage } from '../interfaces/upload-interface'

export class LocalStorage implements Storage {
  save(fileName: string, file: Stream): void {
    const path = join(__dirname, '../../downloads', `${Date.now()+fileName}`)
    ensureFileSync(path)
    file.pipe(fs.createWriteStream(path))
  }
}
