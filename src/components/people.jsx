import { useState, useEffect } from "react";
import starwars from "../APIs/starwars";
import Collapsible from "./collapsible";

export default function People() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  const [filterParam1, setFilterParam1] = useState("All");

  const itemsData = [
    {
      propertyName: "Name",
      dataName: "name",
    },
    {
      propertyName: "Gender",
      dataName: "gender",
    },
    {
      propertyName: "Birth Year",
      dataName: "birth_year",
    },
    {
      propertyName: "Birth Year",
      dataName: "name",
    },
    {
      propertyName: "Height",
      dataName: "height",
      unit: "cm",
    },
    {
      propertyName: "Mass",
      dataName: "mass",
      unit: "kg",
    },
    {
      propertyName: "Hair Color",
      dataName: "hair_color",
    },
    {
      propertyName: "Skin Color",
      dataName: "skin_color",
    },
    {
      propertyName: "Eye Color",
      dataName: "eye_color",
    },
  ];

  useEffect(() => {
    starwars.getPeople().then(
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
      if (item.gender === filterParam1) {
        return searchParam.some(
          (newItem) => item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      }
      if (filterParam1 === "All") {
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
        <div className="radio-filters">
          <div className="radio-filter">
            <label>Gender:</label>
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
                checked={filterParam1 === "male"}
                onChange={() => {
                  setFilterParam1("male");
                }}
              />
              Male
              <input
                type="radio"
                checked={filterParam1 === "female"}
                onChange={() => {
                  setFilterParam1("female");
                }}
              />
              Female
              <input
                type="radio"
                checked={filterParam1 === "n/a"}
                onChange={() => {
                  setFilterParam1("n/a");
                }}
              />
              N/A
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
