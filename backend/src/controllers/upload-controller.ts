import { Request, Response } from 'express'
import { UploadHelper } from '../helpers/upload-helper'

export class UploadController {
  constructor (
    private readonly uploadHelper: UploadHelper
  ) {}

  async handler(request: Request, response: Response) {
    const { headers } = request

    const onFinish = () => {
      response.writeHead(200, { 'Connection': 'close' })
      response.end('Success')
    }

    const busboy = this.uploadHelper.upload(
      headers,
      onFinish
    )

    return request.pipe(busboy)
  }
}
