"use strict";

let DB = getTodosInStorage();
render();
initCardListeners($("#todo-list"));

$("#add-todo").addEventListener("click", function () {
  if (isLimitTodos()) {
    getToastActive();
    clearInput(input);
  } else {
    createCard($("#input").value);
    setTodosInStorage($("#input").value);
    clearInput($("#input"));
    initCardListeners($("#todo-list"));
    printStorageLength();
  }
});

function initCardListeners(list) {
  list.childNodes.forEach(function (el, index) {
    el.addEventListener("click", function (e) {
      if (e.target.className === "btn-close") {
        DB.splice(index, 1);
        updateLocalStorage();
        render();
      } else if (e.target.classList.contains("check-input")) {
        toggle($(".card-body", index), "text-decoration-line-through");
      }
    });
  });
}

function $(selector, number = 0) {
  return document.querySelectorAll(selector)[number];
}

function createElement(tag, classNames, text = "", type = "") {
  let element = document.createElement(tag);
  element.className = classNames;
  element.innerText = text;
  element.type = type;
  return element;
}

function createCard(text) {
  let card = createElement("div", "card flex-row px-5");
  let cardText = createElement(
    "div",
    "card-body d-flex justify-content-between",
    text
  );
  let btnClose = createElement("button", "btn-close");
  let checkbox = createElement(
    "input",
    "check-input d-flex align-self-center",
    "",
    "checkbox"
  );
  card.append(checkbox);
  cardText.append(btnClose);
  card.append(cardText);

  $("#todo-list").append(card);
}

function clearInput(input) {
  input.value = "";
}

function getTodosInStorage() {
  let data = JSON.parse(localStorage.getItem("todos")) || [];
  return data;
}

function setTodosInStorage(todoValue) {
  DB.push(todoValue);
  localStorage.setItem("todos", JSON.stringify(DB));
}

function render() {
  DB.forEach((todo) => {
    createCard(todo);
  });
  printStorageLength();
}

function printStorageLength() {
  $(".badge").innerText = DB.length;
}

function isLimitTodos() {
  return DB.length > 5;
}

function getToastActive() {
  $(".toast").classList.add("show");
}

function deleteTodoFromStorage(id) {
  let deleteElement = 0;
  deleteElement = DB.filter(function (e) {
    return e != id;
  });
  return deleteElement;
}

function toggle(el, active) {
  el.classList.toggle(active);
}
