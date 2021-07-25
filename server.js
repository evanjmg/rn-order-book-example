const path = require('path')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()

const staticPath = path.join(__dirname, '/web-build')
app.use(express.static(staticPath))

app.listen(port, function () {
  console.log(`listening to port: ${port}`)
})
