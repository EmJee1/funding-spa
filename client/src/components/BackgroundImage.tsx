import backgroundImage from "../assets/background.jpeg"

const BackgroundImage = () => {
  return (
    <div className="background">
      <div
        className="background-image"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="background-filter"></div>
    </div>
  )
}

export default BackgroundImage
