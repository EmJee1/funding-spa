import { Col, Container, Row } from "react-bootstrap"
import Donate from "./components/Donate"

const App = () => {
  return (
    <Container>
      <Row>
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
