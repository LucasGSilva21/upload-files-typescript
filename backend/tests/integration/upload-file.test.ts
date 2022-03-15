import request from 'supertest'
import fs from 'fs'
import { randomBytes } from 'crypto'
import { ensureFileSync } from 'fs-extra'
import { app } from '../../src/app'

const filePath = `${__dirname}/../files/test.file`

const makeFile = () => {
  ensureFileSync(filePath)
  fs.writeFileSync(filePath, randomBytes(10))
}

describe('Upload route', () => {
  describe('POST /fileupload', () => {
    test('Should return 200 on fileupload', async () => {
      makeFile()
      const { statusCode, text, header } = await request(app)
        .post('/fileupload')
        .attach('selectedFile', filePath)
        .set('Content-type', 'multipart/form-data')

      expect(statusCode).toBe(200)
      expect(text).toBe('Success')
      expect(header.connection).toBe('close')
    })
  })
})
