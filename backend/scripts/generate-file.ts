import fs from 'fs'
import { randomBytes } from 'crypto'

const writeStream = fs.createWriteStream('big.file')

writeStream.write(randomBytes(1e9), 'base64')

writeStream.on('finish', () => {
    console.log('wrote all data to file')
})

writeStream.end()
