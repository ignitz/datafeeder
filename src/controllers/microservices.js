const { getChoice } = require("../utils/choice");
const { fillArray } = require("../utils/array");

const tasks = [];
let counterId = 0;

const getTasks = async (req, res) => {
  return res.json(tasks.map((task) => task.id));
};

const createTask = async (req, res, next) => {
  try {
    const { intervalms, nrows } = req.body;
    if (!intervalms) throw new Error("No intervalms on body");
    if (!nrows) throw new Error("No nrows on body");

    const task = {
      id: counterId,
      task: setInterval(function () {
        console.log("Inserted rows");
      }, intervalms),
    };

    tasks.push(task);

    counterId++;
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = tasks.find((task) => id == task.id);

    if (!task) throw new Error("Not found task by ID");

    clearInterval(task.task);

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
};
