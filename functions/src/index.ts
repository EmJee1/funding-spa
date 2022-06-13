import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'
import { Donation } from './types'
import mollieClient from './mollie'
import { PaymentStatus } from '@mollie/api-client'

admin.initializeApp()
const app = express()

app.use(cors({ origin: true }))

app.post('/create', async (req, res) => {
  const { amount, forParticipant } = req.body

  const parsedAmount = Number(amount)

  if (isNaN(parsedAmount)) {
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
    webhookUrl:
      'https://2de7-87-208-123-92.ngrok.io/jv-sponsorloop/us-central1/payments/webhook',
  })

  const donationRecord: Donation = {
    amount: parsedAmount,
    status: PaymentStatus.open,
    paymentId: payment.id,
    forParticipant,
  }

  await admin.firestore().collection('donations').add(donationRecord)

  return res.json({
    checkout: payment._links.checkout?.href,
  })
})

app.post('/webhook', async (req, res) => {
  const id = req.body.id

  const payment = await mollieClient.payments.get(id)

  if (payment.status !== PaymentStatus.paid) {
    return res.sendStatus(200)
  }

  const snapshot = await admin
    .firestore()
    .collection('donations')
    .where('paymentId', '==', id)
    .limit(1)
    .get()
  const [doc] = snapshot.docs

  if (!doc?.exists) {
    return res.sendStatus(400)
  }

  await doc.ref.update({ status: payment.status })

  return res.sendStatus(200)
})

exports.payments = functions.https.onRequest(app)
