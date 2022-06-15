import { useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"

const ThankYouMessage = () => {
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDone(window.location.href.includes("/done"))
  }, [])

  if (!done) {
    return <></>
  }

  return (
    <Row>
      <Col>
        <Alert variant="success">
          <Alert.Heading>Hartelijk bedankt voor uw donatie!</Alert.Heading>
        </Alert>
      </Col>
    </Row>
  )
}

export default ThankYouMessage
