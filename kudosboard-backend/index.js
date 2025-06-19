const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes/boards')

app.use(cors())
app.use(express.json())
app.use('/boards', routes)
app.get('/', (req, res) => {
  res.send('welcome to root')
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})