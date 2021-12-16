const express = require('express')
const path = require('path')

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '79a33c04477e4d488b357786ddb724d1',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/', (req, res) => {
   try {
      nonExistentFunction();
    } catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    res.status(200).send(nonExistentFunction())
})

rollbar.log('Hello Wolrd')

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4500

app.listen(port, () => console.log(`We're going back to the future ${port}`))