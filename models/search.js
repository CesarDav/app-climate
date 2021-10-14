const fs = require("fs");
const axios = require("axios");

const { MAPBOX_KEY, OPEN_WEATHER_KEY } = process.env;

class Search {
  history = [];
  filepPath = "./db/data.json";
  constructor() {
    this.readDataDb();
  }

  get paramsMapBox() {
    return {
      access_token: MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  async locations(location = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
        params: this.paramsMapBox,
      });

      const resp = await instance.get();

      return resp.data.features.map((city) => ({
        id: city.id,
        name: city.place_name,
        lng: city.center[0],
        lat: city.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climateLocation(lat, lon) {
    const params = {
      lat: lat,
      lon: lon,
      appid: OPEN_WEATHER_KEY,
      lang: "es",
      units: "metric",
    };
    try {
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: params,
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        description: weather[0].description,
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max,
      };
    } catch (error) {
      console.log("error from function ", error);
    }
  }

  addHistory(location = "") {
    if (this.history.includes(location.toLocaleLowerCase())) {
      return;
    }
    if (this.history.length === 5) {
      this.history.pop();
    }
    this.history.unshift(location.toLocaleLowerCase());
  }

  saveData() {
    const payLoad = {
      historial: this.history,
    };
    fs.writeFileSync(this.filepPath, JSON.stringify(payLoad));
  }

  readDataDb() {
    if (!fs.existsSync(this.filepPath)) return null;

    const info = fs.readFileSync(this.filepPath, { encoding: "utf-8" });
    if (!info) return;

    const data = JSON.parse(info);
    this.history = data.historial;
  }
}

module.exports = Search;
