import './Carousel.css';

export default function Carousel({ photos }) {
  console.log({ photos });

  return (
    <div className="carousel">
      {photos?.map((photo) => (
        <img className="item" src={photo.src.original} alt={photo.alt} key={photo.id} />
      ))}
    </div>
  );
}
