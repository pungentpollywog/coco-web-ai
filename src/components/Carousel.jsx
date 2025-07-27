import './Carousel.css';

export default function Carousel({ photos, selectedImage, setSelectedImage }) {
  console.log({ photos });

  function select(photo) {
    if (photo.id !== selectedImage.id) {
      setSelectedImage({...photo});
    }
  }

  return (
    <div className="carousel">
      {photos?.map((photo) => (
        <img
          className="item"
          src={photo.src.tiny}
          alt={photo.alt}
          key={photo.id}
          onClick={() => select(photo)}
        />
      ))}
      {photos.length || <p>Enter some search terms. 👆</p>}
    </div>
  );
}
