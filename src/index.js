import "./styles/main.scss";
import "./img/brain.png";

import {
  displayDiv,
  displayTime,
  viewWin,
  viewLose,
  viewBestTime,
  difficulty,
  cards,
  win,
  lose,
  creatDivBrain,
  reset,
  view,
  viewFinish
} from "./js/views/baseview";

const getEasy = JSON.parse(localStorage.getItem("bestTimeEasy")) || [];
const getMedium = JSON.parse(localStorage.getItem("bestTimeMedium")) || [];
const getHard = JSON.parse(localStorage.getItem("bestTimeHard")) || [];

let element = [];
let nodes = [];
let state = {};
let lostCount = 0;
let winnerCount = 0;

creatDivBrain();

const initEasy = function () {
  let easyOption = 120;
  timer(easyOption);
};
const initMedium = function () {
  let mediumOption = 80;
  timer(mediumOption);
};
const initHard = function () {
  let hardOption = 1;
  timer(hardOption);
};

function gameController(difficultyLevel, level, key) {
  const option = document.querySelector(level);
  view(option.dataset.option);
  ramdomDiv();
  state = {};
  state[key]= new difficultyLevel();
}

function timer(seg) {
  let date = Date.now();
  let now = date + seg * 1000;
  displayTime(seg);
  let interval = setInterval(() => {
    let second = Math.round((now - Date.now()) / 1000);
    if (second < 0) {
      clearInterval(interval);
      return;
    }
    finish(second, interval);
    displayTime(second);
  }, 1000);
}

function ramdomDiv() {
  let array = [
    "icon-flattr",
    "icon-html-five2",
    "icon-git",
    "icon-firefox",
    "icon-file-openoffice",
    "icon-tux",
    "icon-android",
    "icon-reddit",
    "icon-dropbox",
    "icon-npm",
    "icon-wordpress",
    "icon-steam",
    "icon-linkedin",
    "icon-stackoverflow",
    "icon-foursquare",
  ];

  let arrayCopy = [
    "icon-flattr",
    "icon-html-five2",
    "icon-git",
    "icon-firefox",
    "icon-file-openoffice",
    "icon-tux",
    "icon-android",
    "icon-reddit",
    "icon-dropbox",
    "icon-npm",
    "icon-wordpress",
    "icon-steam",
    "icon-linkedin",
    "icon-stackoverflow",
    "icon-foursquare",
  ];

  let ramdomClass = array.map((e) => {
    let ramdom = Math.floor(Math.random() * array.length);
    let idx = array.splice(ramdom, 1);
    let add = idx.forEach((e) => {
      array.push(e);
    });
  });

  let ramdomClassCopy = arrayCopy.map((e) => {
    let ramdom = Math.floor(Math.random() * arrayCopy.length);
    let idx = arrayCopy.splice(ramdom, 1);
    let add = idx.forEach((e) => {
      arrayCopy.push(e);
    });
  });
  let concat = array.concat(arrayCopy);
  displayDiv(concat);
}

function memory(e) {
  let divs = e.target.closest(".card__content");
  let f = divs.firstElementChild;
  divs.classList.toggle("front");
  f.style = "transform: rotate3d(0,1,0,180deg)";

  if (divs.classList[1] === "front") {
    element.push(divs);
  } else {
    element = [];
  }

  if (element.length === 2) {
    let match = element[0].dataset.id === element[1].dataset.id;
    if (match) {
      nodes.push(element);
      setTimeout(() => {
        element[0].style = "opacity: 0";
        element[1].style = "opacity: 0";
        element = [];
      }, 500);
    } else {
      setTimeout(() => {
        element[0].classList.toggle("front");
        element[1].classList.toggle("front");
        element = [];
      }, 500);
    }
  } else if (element.length === 3) {
    element[2].classList.toggle("front");
  }
}

function finish(time, interval) {
  let nodesCount = cards.childElementCount;
  if (nodes.length === nodesCount / 2 && time > 0) {
    winnerCount += 1;
    setStorage(time);
    clearInterval(interval);
    viewFinish(winnerCount, '.win', '.winner', 'Win')
    nodes.splice(0);
    return;
  } else if (nodes.length < nodesCount / 2 && time <= 0) {
    lostCount += 1;
    viewFinish(lostCount, '.lose', '.loser', 'Lose')
    nodes.splice(0);
  }
}

function setStorage(time) {
  if (state.easy) {
    getEasy.push(time);
    localStorage.setItem("bestTimeEasy", JSON.stringify(getEasy));
  }
  if (state.medium) {
    getMedium.push(time);
    localStorage.setItem("bestTimeMedium", JSON.stringify(getMedium));
  }
  if (state.hard) {
    getHard.push(time);
    localStorage.setItem("bestTimeHard", JSON.stringify(getHard));
  }
}

//events

cards.addEventListener("click", memory);

difficulty.addEventListener("click", (e) => {
  const easy = e.target.closest(".easy");
  const medium = e.target.closest(".medium");
  const hard = e.target.closest(".hard");
  if (easy) {
    gameController(initEasy, ".easy", "easy");
    reset();
    if (getEasy[0]) {
      viewBestTime(Math.max(...getEasy));
    }
  }
  if (medium) {
    gameController(initMedium, ".medium", "medium");
    reset();
    if (getMedium[0]) {
      viewBestTime(Math.max(...getMedium));
    }
  }
  if (hard) {
    gameController(initHard, ".hard", "hard");
    reset();
    if (getHard[0]) {
      viewBestTime(Math.max(...getHard));
    }
  }
});

win.addEventListener("click", (e) => {
  const retry = e.target.closest(".retry");
  const main = e.target.closest(".main");
  if (retry) {
    if (state.easy) {
      win.style = "opacity: 0; z-index: 0";
      cards.innerHTML = "";
      if (getEasy[0]) {
        viewBestTime(Math.max(...getEasy));
      }
      gameController(initEasy, ".easy", "easy");
    }
    if (state.medium) {
      win.style = "opacity: 0; z-index: 0";
      cards.innerHTML = "";
      if (getMedium[0]) {
        viewBestTime(Math.max(...getMedium));
      }
      gameController(initMedium, ".medium", "medium");
    }
    if (state.hard) {
      win.style = "opacity: 0; z-index: 0";
      cards.innerHTML = "";
      if (getHard[0]) {
        viewBestTime(Math.max(...getHard));
      }
      gameController(initHard, ".hard", "hard");
    }
  }
  if (main) {
    difficulty.style = "opacity: 1; z-index: 50";
    win.style = "opacity: 0; z-index: 0";
    cards.innerHTML = "";
  }
});

lose.addEventListener("click", (e) => {
  const retry = e.target.closest(".retry");
  const main = e.target.closest(".main");
  if (retry) {
    if (state.easy) {
      lose.style = "opacity: 0; z-index: 0";
      cards.innerHTML = "";
      if (getEasy[0]) {
        viewBestTime(Math.max(...getEasy));
      }
      gameController(initEasy, ".easy", "easy");
    }
    if (state.medium) {
      lose.style = "opacity: 0; z-index: 0";
      cards.innerHTML = "";
      if (getMedium[0]) {
        viewBestTime(Math.max(...getMedium));
      }
      gameController(initMedium, ".medium", "medium");
    }
    if (state.hard) {
      lose.style = "opacity: 0; z-index: 0";
      cards.innerHTML = "";
      if (getHard[0]) {
        viewBestTime(Math.max(...getHard));
      }
      gameController(initHard, ".hard", "hard");
    }
  }
  if (main) {
    lostCount = 0;
    difficulty.style = "opacity: 1; z-index: 50";
    lose.style = "opacity: 0; z-index: 0";
    cards.innerHTML = "";
  }
});
