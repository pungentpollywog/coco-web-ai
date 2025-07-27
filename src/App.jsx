
import './App.css';

import Dash from './components/Dash';
import ObjectDetector from './components/ObjectDetector';

const imgUrlBase = '../src/assets/images/';

// const images = [
//   { name: 'sleepy-cats.jpg', desc: 'sleepy cats on blanket' },
//   { name: 'dog-beside-motorcycle.jpg', desc: 'dog beside motorcycle' },
//   { name: 'street-scene.jpg', desc: 'people walking on street with vehicles in background' },
//   { name: 'people-walking.jpg', desc: 'people walking' },
//   { name: 'moped-gang.jpg', desc: 'gang of people on mopeds' },
//   { name: 'boat.jpg', desc: 'boat in venice canal' },
// ];

const defaultImage = {src: {original: `${imgUrlBase}dog-beside-motorcycle.jpg`}, alt: 'dog beside motorcycle'}

// const imgIdx = 1;

function App() {
 
  return (
    <>
      <Dash />
      <ObjectDetector image={defaultImage} />
    </>
  );
}

export default App;

/* TODO: 

- Try Google's object detection (as an alternative to tensorflow)

https://ai.google.dev/edge/mediapipe/solutions/vision/object_detector/web_js
https://ai.google.dev/edge/mediapipe/solutions/setup_web 

- Hook into Pexel's API (for image retrieval)

https://www.pexels.com/api/documentation/#authorization

*/
