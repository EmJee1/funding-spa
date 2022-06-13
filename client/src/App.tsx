import { Col, Container, Row } from "react-bootstrap"
import Donate from "./components/Donate"

const App = () => {
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <h1>JV Sponsorloop</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Donate />
        </Col>
      </Row>
    </Container>
  )
}

export default App
