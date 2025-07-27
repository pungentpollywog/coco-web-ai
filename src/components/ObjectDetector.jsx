import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import { useEffect, useRef, useState } from 'react';
import './ObjectDetector.css';
import Annotation from './Annotation';
import { useThrottle } from '../hooks/useThrottle';

export default function ObjectDetector({ image }) {
  const imgRef = useRef(null);
  const [predictions, setPredictions] = useState([]);

  console.log({ image });

  const throttledResize = useThrottle(handleResize, 2000);

  function handleResize() {
    setPredictions([]);
    evaluateImage();
  }

  async function evaluateImage() {
    const img = imgRef.current;
    const model = await cocoSsd.load();
    img.crossOrigin = 'anonymous';
    const detections = await model.detect(img);
    console.log('Predictions', detections);
    setPredictions(detections.map((detected) => ({ ...detected, id: crypto.randomUUID() })));
  }

  useEffect(() => {
    setPredictions([]);
  }, [image]);

  useEffect(() => {
    window.addEventListener('resize', throttledResize);
    return () => window.removeEventListener('resize', throttledResize);
  }, []);

  return (
    <div className="showcase">
      <div className="image-wrap">
        <img ref={imgRef} src={image.src?.original} alt={image.alt} onLoad={evaluateImage}></img>
        {predictions.map((prediction) => (
          <Annotation
            key={prediction.id}
            desc={prediction.class}
            bbox={prediction.bbox}
            confidence={prediction.score}
          />
        ))}
      </div>
    </div>
  );
}
