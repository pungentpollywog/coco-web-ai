import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import { useEffect, useRef, useState } from "react";
import "./App.css";

const imgUrlBase = "./src/assets/images/";

const images = [
  { name: "sleepy-cats.jpg", desc: "sleepy cats on blanket" },
  { name: "dog-beside-motorcycle.jpg", desc: "dog beside motorcycle" },
  { name: "street-scene.jpg", desc: "people walking on street with vehicles in background" },
  { name: "people-walking.jpg", desc: "people walking" },
  { name: "moped-gang.jpg", desc: "gang of people on mopeds" },
  { name: "boat.jpg", desc: "boat in venice canal" },
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

      console.log("Predictions", detections);
      setPredictions(detections.map((detected) => ({ ...detected, id: crypto.randomUUID() })));
    }

    evaluateImage();
  }, []);

  return (
    <div className="showcase">
      <img ref={imgRef} src={`${imgUrlBase}${images[imgIdx].name}`} alt={images[imgIdx].desc}></img>
      <p>Predictions: </p>
      <ul>
        {predictions.map((prediction) => (
          <li key={prediction.id}>
            {prediction.class} <span className="score">{prediction.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

/*
This uses Tensorflow's object detection model.

Objects that tenserflow can detect: 

person, bicycle, car, motorcycle, airplane, bus, train, 
truck, boat, traffic light, fire hydrant, stop sign, 
parking meter, bench, bird, cat, dog, horse, sheep, 
cow, elephant, bear, zebra, giraffe, backpack, umbrella, 
handbag, tie, suitcase, frisbee, skis, snowboard, 
sports ball, kite, baseball bat, baseball glove, 
skateboard, surfboard, tennis racket, bottle, 
wine glass, cup, fork, knife, spoon, bowl, 
banana, apple, sandwich, orange, broccoli, 
carrot, hot dog, pizza, donut, cake, chair, couch, 
potted plant, bed, dining table, toilet, tv, 
laptop, mouse, remote, keyboard, cell phone, 
microwave, oven, toaster, sink, refrigerator, 
book, clock, vase, scissors, teddy bear, hair drier, 
toothbrush

*/

/* TODO: 

1. Render image on the canvas with bounding boxes

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

2. Try Google's object detection (as an alternative to tensorflow)

https://ai.google.dev/edge/mediapipe/solutions/vision/object_detector/web_js
https://ai.google.dev/edge/mediapipe/solutions/setup_web 

3. Hook into Pexel's API (for image retrieval)

https://www.pexels.com/api/documentation/#authorization

*/

