import './Annotation.css';

export default function Annotation({ desc, bbox, confidence }) {
  const [topLeftX, topLeftY, width, height] = bbox;
  const confidencePct = confidence ? `${(confidence * 100).toFixed(2)}%` : '';
  console.log('Annotation:', desc, topLeftX, topLeftY, width, height);
  return (
    <div className="annotation">
      <div style={{ left: topLeftX, top: topLeftY, width, height }}>
        <div className="label">
          {desc} {confidencePct}
        </div>
      </div>
    </div>
  );
}
