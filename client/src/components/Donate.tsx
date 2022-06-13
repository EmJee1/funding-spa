import { FormEvent, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import CurrencyInput from "react-currency-input-field"
import ParticipantSelector, { Participant } from "./ParticipantSelector"

const Donate = () => {
  const [participant, setParticipant] = useState<Participant>()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState("10,00")

  const makeDonation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
  }

  return (
    <Form onSubmit={makeDonation}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Hoeveel wilt u doneren?</Form.Label>
            <CurrencyInput
              class="form-control"
              value={amount}
              onValueChange={(value: string) => setAmount(value)}
              intlConfig={{ locale: "nl-NL", currency: "EUR" }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <p>{participant}</p>
            <ParticipantSelector
              participant={participant}
              setParticipant={setParticipant}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Button disabled={loading} type="submit">
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
              )}
              Doneren
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

export default Donate
