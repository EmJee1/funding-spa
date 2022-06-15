import { useMemo } from "react"
import CountUp from "react-countup"
import { Donation } from "../firebase"

interface DonationCountProps {
  donations: Donation[]
}

const DonationCount = ({ donations }: DonationCountProps) => {
  const amount = useMemo(
    () => donations.reduce((acc, donation) => acc + donation.amount, 0),
    [donations]
  )

  return (
    <div>
      <h3>
        We hebben al
        <CountUp
          className="blue"
          duration={1.2}
          end={amount}
          prefix=" &euro;"
          suffix=" "
          decimals={2}
          decimal=","
        />
        opgehaald
      </h3>
    </div>
  )
}

export default DonationCount
