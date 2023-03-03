export function getViewBoxForPolygon(polygon, { padding = 0 } = {}) {
  const boundingBox = getPolygonBoundingBox(polygon);
  let {
    min: [minX, minY],
    max: [maxX, maxY],
  } = boundingBox;
  const width = maxX - minX;
  const height = maxY - minY;

  // Keep the viewBox square by expanding the smaller dimension
  const maxSize = Math.max(width, height);
  minX -= (maxSize - width) / 2;
  minY -= (maxSize - height) / 2;

  return {
    left: minX - padding,
    top: minY - padding,
    width: maxSize + padding * 2,
    height: maxSize + padding * 2,
  };
}

function getPolygonBoundingBox(polygon) {
  const points = polygon.polylines.flatMap((polyline) => polyline.points);
  return getPointsBoundingBox(points);
}

function getPointsBoundingBox(points) {
  if (points.length === 0) {
    return { min: [0, 0], max: [0, 0] };
  }

  const min = [Infinity, Infinity];
  const max = [-Infinity, -Infinity];

  for (const [x, y] of points) {
    min[0] = Math.min(min[0], x);
    min[1] = Math.min(min[1], y);
    max[0] = Math.max(max[0], x);
    max[1] = Math.max(max[1], y);
  }

  return { min, max };
}
