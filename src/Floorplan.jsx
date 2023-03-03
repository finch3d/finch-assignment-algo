import './Floorplan.css';
import { getViewBoxForPolygon } from './getViewBoxForPolygon.js';

export function Floorplan({ polygon, label }) {
  const viewBox = getViewBoxForPolygon(polygon, { padding: 1000 });

  // Right now, we're just placing the label at the world origin (0, 0). This
  // doesn't look very good, so replace this with your own logic to figure out
  // an optimal position for it within the floorplan.
  const labelPosition = [0, 0];

  return (
    <div className="Floorplan">
      <Image viewBox={viewBox} polygon={polygon} />
      <Label viewBox={viewBox} position={labelPosition}>
        {label}
      </Label>
    </div>
  );
}

function Image({ viewBox: { left, top, width, height }, polygon }) {
  return (
    <svg
      width={400}
      height={400}
      viewBox={`${left} ${top} ${width} ${height}`}
      className="Floorplan__image"
    >
      <path
        fillRule="evenodd"
        fill="white"
        stroke="#777"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        d={polygon.polylines.map(
          ({ points: [firstPoint, ...restPoints] }) =>
            `M ${firstPoint[0]} ${firstPoint[1]} ${restPoints
              .map(([x, y]) => `L ${Math.round(x)},${Math.round(y)}`)
              .join(' ')}`
        )}
      />
    </svg>
  );
}

function Label({ viewBox: { left, top, width, height }, position, children }) {
  return (
    <div
      className="Floorplan__label"
      style={{
        // Negate the vertical position to have the Y axis point up
        top: `${(1 - (position[1] - top) / height) * 100}%`,
        left: `${((position[0] - left) / width) * 100}%`,
      }}
    >
      {children}
    </div>
  );
}
