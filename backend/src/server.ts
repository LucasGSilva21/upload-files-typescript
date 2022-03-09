import express from 'express'

const PORT = 3333
const app = express()

app.get('/', (req, res) =>  res.send('Welcome!'))

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
})
