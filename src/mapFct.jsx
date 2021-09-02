import React from "react";

class MapFct extends React.Component {
  render() {
    const planets = [
      { label: "Mercury" },
      { label: "Venus" },
      { label: "Earth" },
      { label: "Mars" },
      { label: "Jupiter" },
      { label: "Saturn" },
      { label: "Neptune" },
      { label: "Uranus" },
    ];

    return (
      <ul>
        {planets.map((planet) => (
          <li> {planet.label} </li>
        ))}
      </ul>
    );
  }
}

export default MapFct;
