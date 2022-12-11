function idGenerator(adder = 0) {
  id = parseInt((Date.now() + adder).toString().substring(9, 13));
  return id;
}

const render = () => {
  total.innerHTML = taskArray.length;
  done.innerHTML = taskArray.filter((task) => task.done).length;
  let html;
  taskArray.forEach((task) => {
    if (task.done) {
      html += `<tr class="done" id="greenColor${task.id}">
      <td class="center-options">${task.id}</td>
      <td class="padding-task">${task.description}</td>
      <td class="center-options"><input type="checkbox" onclick="doneTask(${task.id})" id="taskDoneSwitch${task.id}" checked></input>
      <i class="fa-solid fa-trash" onclick="deleteTask(${task.id})"></i></td>
      </tr>`;
    } else {
      html += `<tr id="greenColor${task.id}">
      <td class="center-options">${task.id}</td>
      <td class="padding-task">${task.description}</td>
      <td class="center-options"><input type="checkbox" onclick="doneTask(${task.id})" id="taskDoneSwitch${task.id}"></input>
      <i class="fa-solid fa-trash" onclick="deleteTask(${task.id})"></i></td>
      </tr>`;
    }
  });
  taskList.innerHTML = html;
};

const doneTask = (id) => {
  const greenColor = document.querySelector(`#greenColor${id}`);
  const taskDoneSwitch = document.querySelector(`#taskDoneSwitch${id}`);
  const index = taskArray.findIndex((task) => task.id === id);
  if (taskDoneSwitch.checked) {
    taskArray[index].done = true;
    greenColor.style.color = "#82CD47";
  } else {
    taskArray[index].done = false;
    greenColor.style.color = "#FFE7CC";
  }
  done.innerHTML = taskArray.filter((task) => task.done).length;
};

const deleteTask = (id) => {
  const index = taskArray.findIndex((task) => task.id === id);
  taskArray.splice(index, 1);
  render();
};

const newTask = document.querySelector("#newTask");
const form = document.querySelector("#form");
const total = document.querySelector("#total");
const done = document.querySelector("#done");
const taskList = document.querySelector("#taskList");

let taskArray = [
  {
    id: idGenerator(1),
    description: "Estudiar métodos de array",
    done: false,
  },
  {
    id: idGenerator(2),
    description: "Pasear al perro",
    done: false,
  },
  {
    id: idGenerator(3),
    description: "Coordinar reunión para mañana a las 10AM",
    done: false,
  },
];

render();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  taskArray.push({
    id: idGenerator(),
    description: newTask.value,
    done: false,
  });
  newTask.value = "";
  render();
});
