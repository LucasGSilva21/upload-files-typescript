import { Request, Response } from 'express'
import { UploadHelper } from '../helpers/upload-helper'

export class UploadController {
  constructor (
    private readonly uploadHelper: UploadHelper
  ) {}

  async handler(request: Request, response: Response) {
    const { headers } = request

    const onFile = this.uploadHelper.makeOnFile()
    const onFinish = this.uploadHelper.makeOnFinish(response)

    const busboy = this.uploadHelper.upload(
      headers,
      onFile,
      onFinish
    )

    return request.pipe(busboy)
  }
}
