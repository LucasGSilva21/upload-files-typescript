import { Router } from 'express'
import { makeUploadController } from './factories/upload-controller-factory'

const routes = Router()

routes.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
  res.write('<input type="file" name="filetoupload"><br>')
  res.write('<input type="submit">')
  res.write('</form>')
  return res.end()
})
routes.post('/fileupload', (req, res) => {
  makeUploadController().handler(req, res)
})

export { routes }
