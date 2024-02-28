import { useState } from "react";
import Results from "./components/results";

import shipRight from "./assets/ship-right.png";
import shipLeft from "./assets/ship-left.png";

import "./App.css";

export default function App() {
  const [category, setCategory] = useState("people");

  return (
    <main>
      <img
        style={{ top: `${Math.floor(Math.random() * (30 - 10 + 1) + 10)}vh` }}
        id="ship-animation-right"
        src={shipRight}
        alt=""
      />
      <img
        style={{ bottom: `${Math.floor(Math.random() * (30 - 10 + 1) + 10)}vh` }}
        id="ship-animation-left"
        src={shipLeft}
        alt=""
      />
      <div id="header">
        <h1>Star Wars API explorer!</h1>
      </div>
      <div id="button-container">
        <button
          type="button"
          className={`${category === "people" ? "selected" : ""}`}
          onClick={() => setCategory("people")}
        >
          People
        </button>
        <button
          type="button"
          className={`${category === "planets" ? "selected" : ""}`}
          onClick={() => setCategory("planets")}
        >
          Planets
        </button>
        <button
          type="button"
          className={`${category === "ships" ? "selected" : ""}`}
          onClick={() => setCategory("ships")}
        >
          Ships
        </button>
      </div>
      <Results categoryToShow={category} />
    </main>
  );
}
