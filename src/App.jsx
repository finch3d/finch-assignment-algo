import { Floorplan } from "./Floorplan.jsx";
import { polygons } from "./polygons.js";
import "./App.css";

export function App() {
  return (
    <div className="App">
      {polygons.map((polygon, index) => (
        <Floorplan
          key={index}
          polygon={polygon}
          label={`Apartment ${index + 1}`}
        />
      ))}
    </div>
  );
}
