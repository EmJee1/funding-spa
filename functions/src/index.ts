import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import mollieClient from './mollie'

const app = express()

app.use(cors({ origin: true }))

app.post('/create', async (req, res) => {
  const { amount, forParticipant } = req.body

  if (!amount) {
    return res.status(400).json({
      error: 'No amount',
    })
  }

  const payment = await mollieClient.payments.create({
    amount: {
      value: amount,
      currency: 'EUR',
    },
    description: 'Donation JV sponsor run 2022',
    metadata: {
      forParticipant,
    },
    redirectUrl: 'https://jv-sponsorloop.web.app/done',
  })

  return res.json({
    checkout: payment._links.checkout?.href,
  })
})

exports.payments = functions.https.onRequest(app)
