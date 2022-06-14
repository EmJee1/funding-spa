import { getDocs, where, collection, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import CountUp from "react-countup"
import { firestore } from "../firebase"

const DonationCount = () => {
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const fetchAmount = async () => {
      const collectionRef = collection(firestore, "donations")
      const statusQuery = where("status", "==", "paid")
      const snapshots = await getDocs(query(collectionRef, statusQuery))
      const donated = snapshots.docs.reduce(
        (donationAmount, donationSnapshot) => {
          return donationSnapshot.data().amount + donationAmount
        },
        0
      )
      console.log(donated)
      setAmount(donated)
    }

    void fetchAmount()
  }, [])

  return (
    <div>
      <CountUp
        duration={1.2}
        end={amount}
        prefix="&euro;"
        decimals={2}
        decimal=","
      />
    </div>
  )
}

export default DonationCount
