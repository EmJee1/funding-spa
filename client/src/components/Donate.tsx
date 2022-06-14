import axios from "axios"
import { FormEvent, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import CurrencyInput from "react-currency-input-field"
import ParticipantSelector, { Participant } from "./ParticipantSelector"

const Donate = () => {
  const [forParticipant, setForParticipant] = useState<Participant>()
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState("10,00")

  const makeDonation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const parsedAmount = amount
      .replaceAll(",", "X")
      .replaceAll(".", ",")
      .replaceAll("X", ".")
    const { data } = await axios.post(
      "https://us-central1-jv-sponsorloop.cloudfunctions.net/payments/create",
      { amount: parsedAmount, forParticipant }
    )
    window.open(data.checkout, "_self")
    setLoading(false)
  }

  return (
    <Form className="donate-form" onSubmit={makeDonation}>
      <Row>
        <Col sm={4}>
          <Form.Group className="mb-3 mb-md-0">
            <Form.Label>Hoeveel wilt u doneren?</Form.Label>
            <CurrencyInput
              className="form-control"
              step={1}
              value={amount}
              fixedDecimalLength={2}
              allowNegativeValue={false}
              onValueChange={(value: string) => setAmount(value)}
              intlConfig={{ locale: "nl-NL", currency: "EUR" }}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group className="mb-3 mb-md-0">
            <ParticipantSelector
              participant={forParticipant}
              setParticipant={setForParticipant}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group className="mb-3 mb-md-0">
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
