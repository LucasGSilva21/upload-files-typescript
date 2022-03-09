import { Request, Response } from 'express'
import { UploadHelper, pipelineAsync } from '../helpers/upload-helper'

export class UploadController {
  constructor (
    private readonly uploadHelper: UploadHelper
  ) {}

  async handler(request: Request, response: Response) {
    const { headers } = request

    const busboyInstance = this.uploadHelper.registerEvents(
      headers,
      response.end()
    )

    await pipelineAsync(
      request,
      busboyInstance
    )

    console.log('Request finished with success!!');
  }
}
