import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import { useEffect, useRef, useState } from 'react';
import './App.css';
import Annotation from './components/Annotation';
import Dash from './components/Dash';

const imgUrlBase = './src/assets/images/';

const images = [
  { name: 'sleepy-cats.jpg', desc: 'sleepy cats on blanket' },
  { name: 'dog-beside-motorcycle.jpg', desc: 'dog beside motorcycle' },
  { name: 'street-scene.jpg', desc: 'people walking on street with vehicles in background' },
  { name: 'people-walking.jpg', desc: 'people walking' },
  { name: 'moped-gang.jpg', desc: 'gang of people on mopeds' },
  { name: 'boat.jpg', desc: 'boat in venice canal' },
];

const imgIdx = 1;

function App() {
  const imgRef = useRef(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    async function evaluateImage() {
      const img = imgRef.current;
      const model = await cocoSsd.load();

      const detections = await model.detect(img);

      console.log('Predictions', detections);
      setPredictions(detections.map((detected) => ({ ...detected, id: crypto.randomUUID() })));
    }

    evaluateImage();
  }, []);

  return (
    <>
      <Dash />
      <div className="showcase">
        <div className="image-wrap">
          <img ref={imgRef} src={`${imgUrlBase}${images[imgIdx].name}`} alt={images[imgIdx].desc}></img>
          {predictions.map((prediction) => (
            <Annotation key={prediction.id} desc={prediction.class} bbox={prediction.bbox} confidence={prediction.score} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

/* TODO: 

- Refaction into ObjectDetector

- Try Google's object detection (as an alternative to tensorflow)

https://ai.google.dev/edge/mediapipe/solutions/vision/object_detector/web_js
https://ai.google.dev/edge/mediapipe/solutions/setup_web 

- Hook into Pexel's API (for image retrieval)

https://www.pexels.com/api/documentation/#authorization

*/
