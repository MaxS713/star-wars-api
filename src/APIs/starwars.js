import axios from "axios";

const starwars = {
  getPeople: async () => {
    let people = [];
    return axios("https://swapi.dev/api/people/")
      .then((response) => {
        people = response.data.results;
        return response.data.count;
      })
      .then((count) => {
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        const promises = [];
        for (let i = 2; i <= numberOfPagesLeft; i++) {
          promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
        }
        return Promise.all(promises);
      })
      .then((response) => {
        people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
        return people;
      })
      .catch((error) => error);
  },

  getPlanets: async () => {
    let planets = [];
    return axios("https://swapi.dev/api/planets/")
      .then((response) => {
        planets = response.data.results;
        return response.data.count;
      })
      .then((count) => {
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        const promises = [];
        for (let i = 2; i <= numberOfPagesLeft; i++) {
          promises.push(axios(`https://swapi.dev/api/planets?page=${i}`));
        }
        return Promise.all(promises);
      })
      .then((response) => {
        planets = response.reduce((acc, data) => [...acc, ...data.data.results], planets);
        return planets;
      })
      .catch((error) => error);
  },

  getStarships: async () => {
    let starships = [];
    return axios("https://swapi.dev/api/starships/")
      .then((response) => {
        starships = response.data.results;
        return response.data.count;
      })
      .then((count) => {
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        const promises = [];
        for (let i = 2; i <= numberOfPagesLeft; i++) {
          promises.push(axios(`https://swapi.dev/api/starships?page=${i}`));
        }
        return Promise.all(promises);
      })
      .then((response) => {
        starships = response.reduce((acc, data) => [...acc, ...data.data.results], starships);
        return starships;
      })
      .catch((error) => error);
  },
};

export default starwars;
