import express from 'express'
import { UploadHelper } from './helpers/upload-helper'
import { UploadController } from './controllers/upload-controller'

const uploadHelper = new UploadHelper()
const uploadController = new UploadController(uploadHelper)

const PORT = 3333
const app = express()

app.get('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
})
app.post('/fileupload', (req, res) => {
  uploadController.handler(req, res)
})

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
})
