import { Stream } from 'stream'
import { Response } from 'express'
import busboyCons from 'busboy'
import { FileDetail, Storage } from '../interfaces/upload-interface'

export class UploadHelper {
  constructor (
    private readonly storage: Storage
  ) {}

  makeOnFile() {
    return (fieldName: string, file: Stream, fileDetail: FileDetail, encoding, mimetype) => {
      this.storage.save(fileDetail.filename, file)
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
