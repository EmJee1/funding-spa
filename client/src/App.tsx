import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import Donate from "./components/Donate"
import DonationCount from "./components/DonationCount"
import BackgroundImage from "./components/BackgroundImage"

const App = () => {
  return (
    <>
      <BackgroundImage />
      <Container>
        <Row className="mb-5">
          <Col>
            <h1>JV Sponsorloop</h1>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <DonationCount />
          </Col>
        </Row>
        <Row>
          <Col>
            <Donate />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Image />
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
    </>
  )
}

export default App
