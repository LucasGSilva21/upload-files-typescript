import { UploadHelper } from '../helpers/upload-helper'
import { UploadController } from '../controllers/upload-controller'
import { LocalStorage } from '../adapters/local-storage-adapter'

export const makeUploadController = (): UploadController => {
  const localStorage = new LocalStorage()
  const uploadHelper = new UploadHelper(localStorage)
  return new UploadController(uploadHelper)
}
