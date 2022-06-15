import { useEffect, useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import Donate from "./components/Donate"
import DonationCount from "./components/DonationCount"
import BackgroundImage from "./components/BackgroundImage"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { Donation, firestore } from "./firebase"

const App = () => {
  const [donations, setDonations] = useState<Donation[]>([])

  useEffect(() => {
    const fetchDonations = async () => {
      const collectionRef = collection(firestore, "donations")
      const statusQuery = where("status", "==", "paid")
      onSnapshot(query(collectionRef, statusQuery), snapshot => {
        setDonations(
          snapshot.docs.map(donation => ({
            id: donation.id,
            ...donation.data(),
          })) as unknown as Donation[]
        )
      })
    }

    void fetchDonations()
  }, [])

  const wellImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/jv-sponsorloop.appspot.com/o/well.jpg?alt=media"

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
            <DonationCount donations={donations} />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <Donate donations={donations} />
          </Col>
        </Row>
        <Row className="info-block">
          <Col className="info-block-image-container" xl={6}>
            <Image
              className="info-block-image"
              src={wellImageUrl}
              alt="kind aan een waterpomp"
            />
          </Col>
          <Col className="info-block-text" xl={6}>
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
