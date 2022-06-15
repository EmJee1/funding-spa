import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC65Efxrzlwr1ZUHme0zPXW4sMHXAf73Vc",
  authDomain: "jv-sponsorloop.firebaseapp.com",
  projectId: "jv-sponsorloop",
  storageBucket: "jv-sponsorloop.appspot.com",
  messagingSenderId: "857631066952",
  appId: "1:857631066952:web:479015c0bba1d7f257017d",
}

const app = initializeApp(firebaseConfig)
export const firestore = getFirestore()

export interface Donation {
  amount: number
  forParticipant?: string
  name?: string
  status: string
  paymentId: string
}

export type DonationDocument = Donation & { id: string }
