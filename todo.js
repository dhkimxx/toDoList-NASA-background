const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoPending = document.querySelector(".js-toDoPending"),
  toDoFinished = document.querySelector(".js-toDoFinished");

const TODOSPENDING = "PENDING",
  TODOSFINISHED = "FINISHED",
  BTN_CN = "btn";

let toDos = [],
  finishedToDos = [];

function saveFinishedToDos() {
  localStorage.setItem(TODOSFINISHED, JSON.stringify(finishedToDos));
}

function saveToDos() {
  localStorage.setItem(TODOSPENDING, JSON.stringify(toDos));
}

function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoPending.removeChild(li);
  paintFinishedToDo(toDos[li.id - 1].text);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  for (let i = 0; i < toDos.length; i++) {
    toDoPending.children[i].id = i + 1;
    toDos[i].id = i + 1;
  }
  saveToDos();
}

function reloadToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoFinished.removeChild(li);
  paintToDo(finishedToDos[li.id - 1].text);
  const cleanFinishedToDos = finishedToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedToDos = cleanFinishedToDos;
  for (let i = 0; i < finishedToDos.length; i++) {
    toDoFinished.children[i].id = i + 1;
    finishedToDos[i].id = i + 1;
  }
  saveFinishedToDos();
}

function deleteFinishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoFinished.removeChild(li);
  const cleanFinishedToDos = finishedToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedToDos = cleanFinishedToDos;
  for (let i = 0; i < finishedToDos.length; i++) {
    toDoFinished.children[i].id = i + 1;
    finishedToDos[i].id = i + 1;
  }
  saveFinishedToDos();
}

function paintFinishedToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const reloadBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finishedToDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteFinishedToDo);
  delBtn.classList.add(BTN_CN);
  reloadBtn.innerText = "⏪";
  reloadBtn.addEventListener("click", reloadToDo);
  reloadBtn.classList.add(BTN_CN);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(reloadBtn);
  li.id = newId;
  toDoFinished.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  finishedToDos.push(toDoObj);
  saveFinishedToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoPending.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  for (let i = 0; i < toDos.length; i++) {
    toDoPending.children[i].id = i + 1;
    toDos[i].id = i + 1;
  }
  saveToDos();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  delBtn.classList.add(BTN_CN);
  finishBtn.innerText = "⏩";
  finishBtn.addEventListener("click", finishToDo);
  finishBtn.classList.add(BTN_CN);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finishBtn);
  li.id = newId;
  toDoPending.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDosPending = localStorage.getItem(TODOSPENDING);
  const loadedToDosFinished = localStorage.getItem(TODOSFINISHED);
  if (loadedToDosPending !== null) {
    const parsedToDosPending = JSON.parse(loadedToDosPending);
    parsedToDosPending.forEach(function (todo) {
      paintToDo(todo.text);
    });
  }
  if (loadedToDosFinished !== null) {
    const parsedToDosFinished = JSON.parse(loadedToDosFinished);
    parsedToDosFinished.forEach(function (todo) {
      paintFinishedToDo(todo.text);
    });
  }
}

function inputEnter(){
  toDoInput.classList.add("fadeInBox");
  toDoInput.classList.remove("fadeOutBox");
}

function inputOut(){
  toDoInput.classList.add("fadeOutBox");
  toDoInput.classList.remove("fadeInBox");
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  toDoInput.addEventListener("mouseenter", inputEnter );
  toDoInput.addEventListener("mouseleave", inputOut);
}
init();
