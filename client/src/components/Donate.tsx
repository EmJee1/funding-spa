import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import CurrencyInput from "react-currency-input-field"
import ParticipantSelector, { Participant } from "./ParticipantSelector"
import ThankYouMessage from "./ThankYouMessage"
import TopParticipants from "./TopParticipants"
import { Donation } from "../firebase"

interface DonateProps {
  donations: Donation[]
}

const Donate = ({ donations }: DonateProps) => {
  const [forParticipant, setForParticipant] = useState<Participant>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [amount, setAmount] = useState("10,00")
  const [isDone, setIsDone] = useState(false)

  const makeDonation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(false)
    const parsedAmount = amount
      .replaceAll(",", "X")
      .replaceAll(".", ",")
      .replaceAll("X", ".")
    try {
      const { data } = await axios.post(
        "https://us-central1-jv-sponsorloop.cloudfunctions.net/payments/create",
        { amount: parsedAmount, forParticipant }
      )
      window.open(data.checkout, "_self")
    } catch (err) {
      setError(true)
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => setIsDone(window.location.href.includes("/done")), [])

  return (
    <Form className="donate-form" onSubmit={makeDonation}>
      {error && (
        <Row>
          <Col>
            <Alert variant="danger">
              <Alert.Heading>Er is iets fout gegaan</Alert.Heading>
              Als dit blijft gebeuren, neem dan contact op met{" "}
              <Alert.Link href="mailto:mart-janroeleveld@outlook.com">
                mart-janroeleveld@outlook.com
              </Alert.Link>
            </Alert>
          </Col>
        </Row>
      )}
      <ThankYouMessage />
      <Row>
        <Col xs={12} xl={6}>
          <Form.Group className="mb-3">
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
          <Form.Group className="mb-3">
            <ParticipantSelector
              participant={forParticipant}
              setParticipant={setForParticipant}
            />
          </Form.Group>
          <Form.Group className="mb-3 mb-xl-0">
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
        <Col className="top-participants" xs={12} xl={6}>
          <TopParticipants donations={donations} />
        </Col>
      </Row>
    </Form>
  )
}

export default Donate
