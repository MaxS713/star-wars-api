import People from "./people";
import Planets from "./planets";
import Ships from "./ships";

import "./results.css";

export default function Results({ categoryToShow }) {
  if (categoryToShow === "people") return <People />;
  if (categoryToShow === "planets") return <Planets />;
  if (categoryToShow === "ships") return <Ships />;
}
