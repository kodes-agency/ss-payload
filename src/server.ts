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
// Handle POST request to '/order'
app.post('/order', async (req, res) => {
  try {
    // Check if the request is coming from the expected source
    // const source = req.headers['x-wc-webhook-source'];
    // if(source !== 'https://ss.kodes.agency/') return res.status(401).end();

    // Extract the order data from the request body
    console.log("Data received")
    const order = req.body;
  
    // Validate the order data

    if (!order || typeof order !== 'object') {
      throw new Error('Invalid order data');
    }

    // Check if the order already exists in the 'orders' collection
    const existingOrder = await payload.find({
      collection: 'orders',
      where: {
        orderId: {
          equals: order.id
        }
      }
    });

    // If the order already exists, log a message and return a success response
    if (existingOrder.docs.length > 0) {
      console.log('Order already exists');
      return res.status(200).end();
    }

    // Map over the line items of the order and fetch the corresponding products from the 'products' collection
    console.log("Order being created")
    const products = await Promise.all(order.line_items.map(async (product) => {
      const productObj = await payload.find({
        collection: 'products',
        where: {
          productId: {
            equals: product.product_id
          }
        }
      });

      // Return an object containing the product details
      return {
        product: productObj.docs[0].id,
        sku: product.sku,
        quantity: product.quantity,
        price_readOnly: Number(product.price),
        price: Number(product.price),
        total: product.total,
        product_key: product.id
      };
    }));

    // Create a new document in the 'orders' collection with the order details and associated products
    console.log("Order created")
    await payload.create({
      collection: 'orders',
      data: {
        orderId: order.id,
        first_name: order.billing.first_name,
        orderDate: order.date_created,
        last_name: order.billing.last_name,
        email: order.billing.email,
        phone: order.billing.phone,
        address_1: order.billing.address_1,
        company: order.billing.address_2,
        country: order.billing.country,
        postcode: order.billing.postcode,
        city: order.billing.city,
        status: order.status,
        orderTotal: order.total,
        customer_note: order.customer_note,
        products: products
      }
    });

    // Return a success response
    return res.status(200).end();
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).end();
  }
});
