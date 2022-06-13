import { ChangeEvent, Dispatch, SetStateAction } from "react"
import Form from "react-bootstrap/Form"

interface ParticipantSelectorProps {
  participant: Participant
  setParticipant: Dispatch<SetStateAction<Participant>>
}

const participants = [
  "Anne-Ruth",
  "Bettina",
  "Chilian",
  "Christiaan",
  "Jordy",
  "Marilyn",
  "Mart-Jan",
  "Maurijn",
  "Petra",
  "Richard",
  "Roeljanne",
  "Thijs",
] as const

export type Participant = typeof participants[number] | undefined

const ParticipantSelector = ({
  participant,
  setParticipant,
}: ParticipantSelectorProps) => {
  const onParticipantChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setParticipant(value === "-" ? undefined : (value as Participant))
  }

  return (
    <>
      <Form.Label>Voor wie wilt u doneren?</Form.Label>
      <Form.Select value={participant} onChange={onParticipantChange}>
        <option value="-">Algemene donatie</option>
        {participants.map(p => (
          <option value={p}>{p}</option>
        ))}
      </Form.Select>
    </>
  )
}

export default ParticipantSelector
