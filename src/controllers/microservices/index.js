const { simulate } = require("./simulate_microservices");

const tasks = [];
let counterId = 0;

const getTasks = async (req, res) => {
  return res.json(
    tasks.map((task) => {
      return {
        id: task.id,
        intervalms: task.intervalms,
        nrows: task.nrows,
        enable: task.enable,
        op: task.op,
      };
    })
  );
};

const createTask = async (req, res, next) => {
  try {
    const { intervalms, nrows, op } = req.body;
    if (!intervalms) throw new Error("No intervalms on body");
    if (!nrows) throw new Error("No nrows on body");

    const taskParams = {
      id: counterId,
      intervalms: intervalms,
      nrows: nrows,
      enable: true,
      op: op,
    };

    const task = {
      ...taskParams,
      task: setInterval(simulate, intervalms, taskParams),
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
    task.enable = false;

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
