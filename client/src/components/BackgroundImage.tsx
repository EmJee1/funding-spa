const BackgroundImage = () => {
  const bgImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/jv-sponsorloop.appspot.com/o/background.webp?alt=media"

  return (
    <div className="background">
      <div
        className="background-image"
        style={{ backgroundImage: `url('${bgImageUrl}')` }}
      />
      <div className="background-filter"></div>
    </div>
  )
}

export default BackgroundImage
