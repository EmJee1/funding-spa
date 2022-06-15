import { PaymentStatus } from '@mollie/api-client'

export interface Donation {
  amount: number
  forParticipant?: string
  name?: string
  status: PaymentStatus
  paymentId: string
}

export type DonationDocument = Donation & { id: string }
