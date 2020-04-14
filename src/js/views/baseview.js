export const difficulty = document.querySelector(".start");
export const cards = document.querySelector(".cards");
export const win = document.querySelector(".win");
export const lose = document.querySelector(".lose");

export function displayDiv(arr) {
  let createDiv = arr.map((divClass) => {
    let node = `<div class="card__content" data-id="${divClass}">
          <div class="card_front">
            <svg class="icon ${divClass}"><use xlink:href="#${divClass}"></use></svg>
          </div>
          <div class="card_back"></div>
        </div>`;
    cards.insertAdjacentHTML("afterbegin", node);
  });
}

export function displayTime(seg) {
  const time = document.querySelector(".seg");
  let minute = Math.floor(seg / 60);
  let seconds = seg % 60;
  let showTime = `${minute < 10 ? "0" : ""}${minute}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
  time.textContent = showTime;
}

export function displayBrain() {
  let imgBrain = `<img class="img-brain" src="./img/brain.png" alt="">`;
  difficulty.insertAdjacentHTML("afterbegin", imgBrain);
}
export function creatDivBrain() {
  for (let i = 1; i <= 6; i++) {
    displayBrain();
    ramdomStyle(i);
  }
}
function ramdomStyle(i) {
  let ram = Math.floor(Math.random() * 6);
  let ramDelay = Math.floor(Math.random() * 3);
  const b = document.querySelector(".img-brain");
  b.style = `left: ${i * 12}%;
  bottom: ${i * ram}%;
  width: ${i * ram}%;
  animation: show 4s linear ${ramDelay}s infinite`;
}

export function viewEasy(option) {
  const textDifficulty = document.querySelector(".difficulty");
  difficulty.style = "opacity: 0; z-index: 0";
  let setDifficulty = `<h3>Difficulty: ${option}</h3>`;
  textDifficulty.innerHTML = setDifficulty;
}
export function viewMedium(option) {
  const textDifficulty = document.querySelector(".difficulty");
  difficulty.style = "opacity: 0; z-index: 0";
  let setDifficulty = `<h3>Difficulty: ${option}</h3>`;
  textDifficulty.innerHTML = setDifficulty;
}
export function viewHard(option) {
  const textDifficulty = document.querySelector(".difficulty");
  difficulty.style = "opacity: 0; z-index: 0";
  let setDifficulty = `<h3>Difficulty: ${option}</h3>`;
  textDifficulty.innerHTML = setDifficulty;
}

export function viewWin(winCount) {
  const winner = document.querySelector(".winner");
  let textWinner = `<h3>Win: ${winCount}`;
  winner.innerHTML = textWinner;
  win.style = "opacity: 1; z-index: 30";
}
export function viewBestTime(time) {
  let min = Math.floor(time / 60);
  let seg = time % 60;
  const bestTime = document.querySelector(".best-time");
  let textBestTime = `<h3>Best time: ${min}:${seg < 10 ? '0' : ''}${seg}`;
  bestTime.innerHTML = textBestTime;
}
export function viewLose(lost) {
  const loser = document.querySelector(".loser");
  let textLose = `<h3>Lose: ${lost}</h3>`;
  loser.innerHTML = textLose;
  lose.style = "opacity: 1; z-index: 40";
}
