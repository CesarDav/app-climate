require("dotenv").config();
const {
  inquirerMenu,
  pause,
  readInput,
  listOfLocations,
} = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async () => {
  let opt;
  const search = new Search();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const location = await readInput("Buscar lugar: ");

        const locations = await search.locations(location);

        const idLocations = await listOfLocations(locations);

        const selectLocation = locations.find((l) => l.id === idLocations);
        const { name, lng, lat } = selectLocation;

        search.addHistory(name);
        search.saveData();

        const climateLocation = await search.climateLocation(lat, lng);
        const { description, temp, min, max } = climateLocation;

        console.log("\n Informacion de la cuidad".blue);
        console.log("Cuidad:", name);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Temperatura:", temp);
        console.log("Minima:", min);
        console.log("Maxima:", max);
        console.log("Estado actual:", description.green);
        break;

      case 2:
        search.history.forEach((location, index) => {
          const indeColor = `${index + 1}`.blue;

          const capitalizeLocation =
            location.charAt(0).toUpperCase() + location.slice(1);

          console.log(indeColor, capitalizeLocation.green);
        });
        break;
    }

    if (opt !== 0) {
      await pause();
    }
  } while (opt !== 0);
};

main();
