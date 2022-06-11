import functions from "firebase-functions"
import admin from "firebase-admin"
import express from "express"
import cors from "cors"
import mollieClient from "./mollie"

admin.initializeApp(functions.config().firebase)

const app = express()

app.use(cors({ origin: true }))

app.post("/create", async (req, res) => {
  const { amount, forParticipant } = req.body

  await mollieClient.payments.create({
    amount: {
      value: amount,
      currency: "EUR",
    },
    description: "Donation JV sponsor run 2022",
    metadata: {
      forParticipant,
    },
    redirectUrl: "https://jv-sponsorloop.web.app/done",
  })
})

exports.app = functions.https.onRequest(app)
