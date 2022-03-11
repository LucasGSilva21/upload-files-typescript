import fs from 'fs'
import { join } from 'path'
import { ensureFileSync } from 'fs-extra'
import busboyCons from 'busboy'

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
