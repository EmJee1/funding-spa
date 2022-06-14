import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import Donate from "./components/Donate"
import DonationCount from "./components/DonationCount"
import BackgroundImage from "./components/BackgroundImage"
import wellImage from "./assets/well.webp"

const App = () => {
  return (
    <>
      <BackgroundImage />
      <Container>
        <Row className="my-5">
          <Col>
            <h1>JV Sponsorloop</h1>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <DonationCount />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <Donate />
          </Col>
        </Row>
        <Row className="info-block">
          <Col className="info-block-image-container" md={6}>
            <Image
              className="info-block-image"
              src={wellImage}
              alt="kind aan een waterpomp"
            />
          </Col>
          <Col className="info-block-text" md={6}>
            <h4>Lorem ipsum dolor sit amet.</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              architecto beatae, ea quasi quibusdam temporibus ut vel
              voluptatibus? Ipsam porro quidem quisquam vero? Aspernatur
              cupiditate doloremque quidem reprehenderit sequi! Amet architecto
              beatae deserunt, doloribus ducimus enim facere id nesciunt officia
              officiis quaerat quibusdam quod quos, suscipit temporibus totam
              ullam, vitae. A ad animi hic in inventore modi mollitia nemo non,
              reprehenderit sapiente suscipit ut veniam, voluptate voluptatem
              voluptates.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
