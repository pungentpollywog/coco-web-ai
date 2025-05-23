import { createClient } from 'pexels';

const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);

// const protocol = 'https';
// const host = 'api.pexels.com';
// const version = 'v1';
// const baseUrl = `${protocol}://${host}/${version}`;

// https://api.pexels.com/v1/search?query=nature&per_page=1

export async function searchPhotos(query='nature', perPage=15) {
  // let searchUrl = `${baseUrl}/search`;
  console.log('searching', query);
  try {
  return client.photos.search({per_page: perPage, query: query, orientation: 'square'});
  } catch(err) {
    console.log(err);
  }
}