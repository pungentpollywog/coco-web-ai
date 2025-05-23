import { Suspense, useEffect, useState } from "react";
import { searchPhotos } from "../services/PexelsAPI";

import Search from "../components/Search";
import Loading from "../components/Loading";

import Carousel from "./Carousel";

export default function Dash() {
  const [query, updateQuery] = useState('dogs');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    searchPhotos(query).then(resp => setPhotos(resp.photos));
    // TODO: catch and display a message if there's an error.
  }, [query]);

  return <>
    <Search query={query} updateQuery={updateQuery} />
    <Suspense fallback={<Loading />}>
        <Carousel photos={photos}/>
    </Suspense>
  </>;
}