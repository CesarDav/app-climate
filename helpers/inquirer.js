require("colors");
const inquirer = require("inquirer");

const inquirerMenu = async () => {
  console.clear();
  console.log("********************".blue);
  console.log(" Select an Option ".white);
  console.log("********************\n".blue);

  const questions = [
    {
      type: "list",
      name: "option",
      message: "¿Que desea Hacer?",
      choices: [
        {
          value: 1,
          name: `${"1".blue}. Buscar lugar`,
        },
        {
          value: 2,
          name: `${"2".blue}. Historial`,
        },
        {
          value: 0,
          name: `${"0".blue}. Salir`,
        },
      ],
      loop: false,
    },
  ];
  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "pause",
      message: `Press ${"ENTER".blue} to continue `,
    },
  ];

  const enter = await inquirer.prompt(question);

  return enter;
};

const readInput = async (msg) => {
  const question = [
    {
      type: "input",
      name: "des",
      message: msg,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];

  const { des } = await inquirer.prompt(question);

  return des;
};

const listOfLocations = async (locations = []) => {
  const choices = locations.map((location, index) => {
    const indexColor = `${index + 1}.`.blue;
    return {
      value: location.id,
      name: `${indexColor} ${location.name}`,
    };
  });

  const question = [
    {
      type: "list",
      name: "id",
      message: "Seleccione el lugar:",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);

  return id;
};

const confirmDelete = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);

  return ok;
};

const completeTasks = async (tasks = []) => {
  if (tasks.length === 0) {
    console.log("Currently has no tasks ");
    return null;
  }
  const choices = tasks.map((task, index) => {
    const indexColor = `${index + 1}.`.blue;
    return {
      value: task.id,
      name: `${indexColor} ${task.description}`,
      checked: task.completed ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select the task(s) to be completed",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);

  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listOfLocations,
  confirmDelete,
  completeTasks,
};
