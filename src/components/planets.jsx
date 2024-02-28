import { useState, useEffect } from "react";

import starwars from "../APIs/starwars";

import Collapsible from "./collapsible";

export default function Planets() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  const [filterParam1, setFilterParam1] = useState("All");
  const [filterParam2, setFilterParam2] = useState("All");

  const itemsData = [
    {
      propertyName: "Name",
      dataName: "name",
    },
    {
      propertyName: "Population",
      dataName: "population",
    },
    {
      propertyName: "Birth Year",
      dataName: "birth_year",
    },
    {
      propertyName: "Terrain",
      dataName: "terrain",
    },
    {
      propertyName: "Diameter",
      dataName: "diameter",
      unit: "km",
    },
    {
      propertyName: "Climate",
      dataName: "climate",
    },
    {
      propertyName: "Gravity",
      dataName: "gravity",
    },
    {
      propertyName: "Mass",
      dataName: "mass",
      unit: "kg",
    },
    {
      propertyName: "Rotation Period",
      dataName: "rotation_period",
      unit: "hours",
    },
    {
      propertyName: "Orbital Period",
      dataName: "orbital_period",
      unit: "days",
    },
  ];

  useEffect(() => {
    starwars.getPlanets().then(
      (response) => {
        setIsLoaded(true);
        setItems(response);
      },
      (e) => {
        setIsLoaded(true);
        setError(e);
      }
    );
  }, []);

  const data = Object.values(items);

  const search = (itemsToFilter) =>
    itemsToFilter.filter((item) => {
      if (item.climate === filterParam1 && filterParam2 === "All") {
        return searchParam.some(
          (newItem) => item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      }
      if (item.terrain.includes(filterParam2) && filterParam1 === "All") {
        return searchParam.some(
          (newItem) => item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      }
      if (item.climate === filterParam1 && item.terrain.includes(filterParam2)) {
        return searchParam.some(
          (newItem) => item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      }
      if (filterParam1 === "All" && filterParam2 === "All") {
        return searchParam.some(
          (newItem) => item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      }
      return null;
    });

  return (
    <div className="wrapper">
      <div className="search-and-filters">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            className="search-input"
            placeholder="Search by name..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <div className="radio-filters">
          <div className="radio-filter">
            <label>Climate:</label>
            <div>
              <input
                type="radio"
                checked={filterParam1 === "All"}
                onChange={() => {
                  setFilterParam1("All");
                }}
              />
              All
              <input
                type="radio"
                checked={filterParam1 === "arid"}
                onChange={() => {
                  setFilterParam1("arid");
                }}
              />
              Arid
              <input
                type="radio"
                checked={filterParam1 === "temperate"}
                onChange={() => {
                  setFilterParam1("temperate");
                }}
              />
              Temperate
              <input
                type="radio"
                checked={filterParam1 === "frozen"}
                onChange={() => {
                  setFilterParam1("frozen");
                }}
              />
              Frozen
            </div>
          </div>
          <div className="radio-filter">
            <label>Terrain:</label>
            <div>
              <input
                type="radio"
                checked={filterParam2 === "All"}
                onChange={() => {
                  setFilterParam2("All");
                }}
              />
              All
              <input
                type="radio"
                checked={filterParam2 === "desert"}
                onChange={() => {
                  setFilterParam2("desert");
                }}
              />
              Desert
              <input
                type="radio"
                checked={filterParam2 === "mountains"}
                onChange={() => {
                  setFilterParam2("mountains");
                }}
              />
              Mountains
              <input
                type="radio"
                checked={filterParam2 === "jungle"}
                onChange={() => {
                  setFilterParam2("jungle");
                }}
              />
              Jungle
              <input
                type="radio"
                checked={filterParam2 === "ocean"}
                onChange={() => {
                  setFilterParam2("ocean");
                }}
              />
              Ocean
            </div>
          </div>
        </div>
      </div>
      <div className="results">
        {error ? (
          <p className="notification">Something went wrong with the API... reload the page?</p>
        ) : null}
        {!isLoaded ? <p className="notification">Loading results...</p> : null}
        {!search(data).length && isLoaded ? (
          <p className="notification"> No Results...</p>
        ) : (
          search(data).map((item) => (
            <ul key={item.name}>
              <div className="search-list">
                <Collapsible currentName={item.name}>
                  <ul>
                    {itemsData.map((itemData) => (
                      <li key={itemData.dataName}>
                        <span className="info-type">
                          {`${itemData.propertyName}: ${item[itemData.dataName]}` +
                            `${itemData.unit ? ` ${itemData.unit}` : ""}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Collapsible>
              </div>
            </ul>
          ))
        )}
      </div>
    </div>
  );
}
