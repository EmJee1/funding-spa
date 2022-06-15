import { Donation } from "../firebase"
import { useMemo } from "react"
import CountUp from "react-countup"

interface TopParticipantsProps {
  donations: Donation[]
}

const TopParticipants = ({ donations }: TopParticipantsProps) => {
  const topParticipants = useMemo(() => {
    const dict: Record<string, number> = {}

    donations.forEach(donation => {
      const { forParticipant, amount } = donation

      if (!forParticipant) {
        return
      }

      dict[forParticipant]
        ? (dict[forParticipant] += amount)
        : (dict[forParticipant] = amount)
    })

    return Object.entries(dict)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([participant, amount]) => ({ participant, amount }))
  }, [donations])

  return (
    <div>
      <h4 className="black mb-3">Top 3</h4>
      <ul className="ul">
        {topParticipants.map(entry => (
          <li key={entry.participant}>
            <strong className="black">{entry.participant}: </strong>
            <CountUp
              className="blue"
              duration={1.2}
              end={entry.amount}
              prefix="&euro;"
              decimals={2}
              decimal=","
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopParticipants
