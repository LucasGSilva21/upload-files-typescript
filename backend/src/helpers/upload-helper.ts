import fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { pipeline } from 'stream'
import { ensureFileSync } from 'fs-extra'
import busboyCons from 'busboy'

export const pipelineAsync = promisify(pipeline)

export class UploadHelper {
  async onFile(file: any, filename: any) {
    const saveTo = join(__dirname, '../../downloads', `${Date.now()+filename.filename}`)

    ensureFileSync(saveTo)

    await pipelineAsync(
      file,
      fs.createWriteStream(saveTo),
    )
  }

  registerEvents(headers: any, onFinish: any) {
    const busboy = busboyCons({ headers });

    busboy.on('file', this.onFile.bind(this));
    busboy.on('finish', onFinish);

    return busboy
  }
}
