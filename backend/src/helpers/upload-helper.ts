import fs from 'fs'
import { join } from 'path'
import { ensureFileSync } from 'fs-extra'
import { Stream } from 'stream'
import { Response } from 'express'
import busboyCons from 'busboy'

interface FileDetail {
  filename: string
  encoding: string
  mimeType: string
}

export class UploadHelper {
  makeOnFile() {
    return function(fieldName: string, file: Stream, fileDetail: FileDetail, encoding, mimetype) {
      const saveTo = join(__dirname, '../../downloads', `${Date.now()+fileDetail.filename}`)
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
