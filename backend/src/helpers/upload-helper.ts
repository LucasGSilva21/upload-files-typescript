import fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { pipeline } from 'stream'
import { ensureFileSync } from 'fs-extra'
import busboyCons from 'busboy'

export const pipelineAsync = promisify(pipeline)

export class UploadHelper {
  upload(headers: any, onFinish: any) {
    const busboy = busboyCons({ headers })

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      const saveTo = join(__dirname, '../../downloads', `${Date.now()+filename.filename}`)
      ensureFileSync(saveTo)
      file.pipe(fs.createWriteStream(saveTo));
    });
 
    busboy.on('finish', onFinish);

    return busboy
  }
}
