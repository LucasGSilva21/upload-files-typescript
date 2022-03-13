const fs = require('fs')
const { randomBytes } = require('crypto')

const writeStream = fs.createWriteStream('big.file')

writeStream.write(randomBytes(1e9), 'base64')

writeStream.on('finish', () => {
    console.log('finish')
})

writeStream.end()
