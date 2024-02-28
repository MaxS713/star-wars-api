import { useState, useEffect } from "react";

import starwars from "../APIs/starwars";

import Collapsible from "./collapsible";

export default function Ships() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  const [filterParam1, setFilterParam1] = useState(100000);
  const [filterParam2, setFilterParam2] = useState(100);

  const itemsData = [
    {
      propertyName: "Name",
      dataName: "name",
    },
    {
      propertyName: "Model",
      dataName: "model",
    },
    {
      propertyName: "Manufacturer",
      dataName: "manufacturer",
    },
    {
      propertyName: "Starship Class",
      dataName: "starship_class",
    },
    {
      propertyName: "Cost in Credits",
      dataName: "cost_in_credits",
    },
    {
      propertyName: "Length",
      dataName: "length",
      unit: "cm",
    },
    {
      propertyName: "Max Speed",
      dataName: "max_atmosphering_speed",
    },
    {
      propertyName: "Crew",
      dataName: "crew",
    },
    {
      propertyName: "Passengers",
      dataName: "passengers",
    },
    {
      propertyName: "Cargo Capacity",
      dataName: "cargo_capacity",
    },
    {
      propertyName: "Consumables",
      dataName: "consumables",
    },
  ];

  useEffect(() => {
    starwars.getStarships().then(
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

  function search(itemsToFilter) {
    return itemsToFilter.filter((item) => {
      if (+item.cost_in_credits >= +filterParam1 && +filterParam2 === 100) {
        return searchParam.some(
          (newItem) => item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      }
      if (+item.max_atmosphering_speed >= +filterParam2 && +filterParam1 === 100000) {
        return searchParam.some(
          (newItem) => item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      }
      if (+item.cost_in_credits >= +filterParam1 && +item.max_atmosphering_speed >= +filterParam2) {
        return searchParam.some(
          (newItem) => item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      }
      if (+filterParam1 === 100000 && +filterParam2 === 100) {
        return searchParam.some(
          (newItem) => item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      }
      return null;
    });
  }

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
        <div className="slider-container">
          <label>Cost In Credits: </label>
          <input
            type="range"
            min="100000"
            max="60000000"
            step="100000"
            value={filterParam1}
            className="slider"
            onChange={(e) => {
              setFilterParam1(e.target.value);
            }}
          />
          <div className="slider-data">{`More than ${filterParam1} ¢`}</div>
        </div>
        <div className="slider-container">
          <label>Atmospheric Speed: </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={filterParam2}
            className="slider"
            onChange={(e) => {
              setFilterParam2(e.target.value);
            }}
          />
          <div className="slider-data">{`More than ${filterParam2}`}</div>
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
