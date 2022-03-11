import fs from 'fs'
import { join } from 'path'
import { ensureFileSync } from 'fs-extra'
import { Response } from 'express'
import busboyCons from 'busboy'

export class UploadHelper {
  makeOnFile() {
    return function(fieldname, file, filename, encoding, mimetype) {
      const saveTo = join(__dirname, '../../downloads', `${Date.now()+filename.filename}`)
      ensureFileSync(saveTo)
      file.pipe(fs.createWriteStream(saveTo));
    }
  }

  makeOnFinish(response: Response) {
    const onFinish = () => {
      response.writeHead(200, { 'Connection': 'close' })
      response.end('Success')
    }
    return onFinish
  }

  upload(headers: any, onFile: any, onFinish: any) {
    const busboy = busboyCons({ headers })

    busboy.on('file', onFile)

    busboy.on('finish', onFinish)

    return busboy
  }
}
