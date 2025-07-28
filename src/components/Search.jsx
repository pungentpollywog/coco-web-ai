import { useEffect, useState } from 'react';
import './Search.css';

const knownObjects = [
  'person',
  'bicycle',
  'car',
  'motorcycle',
  'airplane',
  'bus',
  'train',
  'truck',
  'boat',
  'traffic light',
  'fire hydrant',
  'stop sign',
  'parking meter',
  'bench',
  'bird',
  'cat',
  'dog',
  'horse',
  'sheep',
  'cow',
  'elephant',
  'bear',
  'zebra',
  'giraffe',
  'backpack',
  'umbrella',
  'handbag',
  'tie',
  'suitcase',
  'frisbee',
  'skis',
  'snowboard',
  'sports ball',
  'kite',
  'baseball bat',
  'baseball glove',
  'skateboard',
  'surfboard',
  'tennis racket',
  'bottle',
  'wine glass',
  'cup',
  'fork',
  'knife',
  'spoon',
  'bowl',
  'banana',
  'apple',
  'sandwich',
  'orange',
  'broccoli',
  'carrot',
  'hot dog',
  'pizza',
  'donut',
  'cake',
  'chair',
  'couch',
  'potted plant',
  'bed',
  'dining table',
  'toilet',
  'tv',
  'laptop',
  'mouse',
  'remote',
  'keyboard',
  'cell phone',
  'microwave',
  'oven',
  'toaster',
  'sink',
  'refrigerator',
  'book',
  'clock',
  'vase',
  'scissors',
  'teddy bear',
  'hair drier',
  'toothbrush',
];

export default function Search({ query, updateQuery }) {
  const defaultIdx = Math.floor(Math.random() * (knownObjects.length - 1));
  const [knownObjIdx, setKnownObjIdx] = useState(defaultIdx);

  function bumpKnownObject() {
    if (knownObjIdx < knownObjects.length - 1) {
      setKnownObjIdx((curr) => curr + 1);
    } else {
      setKnownObjIdx(0);
    }
  }

  useEffect(() => {
    const timerId = setInterval(bumpKnownObject, 2000);
    return () => clearInterval(timerId);
  }, []);

  // TODO: debounce typing
  function update(ev) {
    updateQuery(ev.target.value);
  }

  return (
    <div className="search">
      <input
        type="text"
        id="search"
        name="search"
        value={query}
        onChange={update}
        placeholder={`Search object(s) e.g. '${
          knownObjects[knownObjIdx % knownObjects.length]
        }'`}
      />
    </div>
  );
}
