import { Suspense, useEffect, useState } from 'react';
import { searchPhotos } from '../services/PexelsAPI';

import Search from '../components/Search';
import Loading from '../components/Loading';

import Carousel from './Carousel';
import ObjectDetector from './ObjectDetector';

const imgUrlBase = '../src/assets/images/';
const defaultImage = { src: { original: `${imgUrlBase}dog-beside-motorcycle.jpg` }, alt: 'dog beside motorcycle' };

export default function Dash() {
  const [query, updateQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  useEffect(() => {
    if (query?.length > 0) {
      searchPhotos(query).then((resp) => {
        // @ts-ignore
        setPhotos(resp.photos ?? []);
    });
    } else {
      setPhotos([]);
    }
    // TODO: catch and display a message if there's an error.
  }, [query]);

  return (
    <>
      <Search query={query} updateQuery={updateQuery} />
      <Suspense fallback={<Loading />}>
        <Carousel photos={photos} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      </Suspense>
      <ObjectDetector image={selectedImage} />
    </>
  );
}
