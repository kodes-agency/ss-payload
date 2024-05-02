import express from 'express'
import payload from 'payload'
import bodyParser from 'body-parser'

require('dotenv').config()
const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3001)
}

start()

app.use(bodyParser.json());
app.post('/order', (req, res) => {
  const order = req.body;
  // Process the order here
  console.log(order);
  if(req.headers.host === 'localhost:3001' || req.headers.host === 'ss.kodes.agency') {
    console.log(req);
    console.log("Right host")
  } else {
    console.log('Wrong host')
  }
  res.status(200).end();
});
