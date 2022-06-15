import backgroundImage from "../assets/background.webp"

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
