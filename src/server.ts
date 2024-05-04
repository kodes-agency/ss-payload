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
app.post('/order', async (req, res) => {
  console.log(req)

  const order = await req.body;

  let existingOrder = await payload.find({
    collection: 'orders',
    where: {
      orderId: {
        equals: order.id
      }
    }
  })

  console.log(existingOrder)

  if(existingOrder.docs.length > 0) return

  const products = order.line_items.map(async (product) => {
    const productIds = await payload.find({
      collection: 'products',
      where: {
        id: {
          equals: product.id
        }
      }
    })

    return {
      product: productIds.docs[0].id,
      quantity: product.quantity,
      price: product.price,
      total: product.total,
      product_key: product.id
    }
  })
  
  await payload.create({
    collection: 'orders',
    data: {
      orderId: order.id,
      first_name: order.billing.first_name,
      last_name: order.billing.last_name,
      email: order.billing.email,
      phone: order.billing.phone,
      address_1: order.billing.address_1,
      country: order.billing.country,
      city: order.billing.city,
      products: await Promise.all(products),
      status: order.status,
      orderTotal: order.total,
      customer_note: order.customer_note
    }
  })

  res.status(200).end();
});
