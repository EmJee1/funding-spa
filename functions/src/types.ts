import { PaymentStatus } from '@mollie/api-client'

export interface Donation {
  amount: number
  forParticipant?: string
  status: PaymentStatus
  paymentId: string
}

export type DonationDocument = Donation & { id: string }
