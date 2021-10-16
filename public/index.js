/* eslint-disable operator-linebreak */
// w2-game-of-life__moises-rodriguez
import {
  generateTable,
  paintTable,
  lookAround,
  generateRandom,
} from './helpers.js';

let speed = 100;
let size = 10;
// 0: dead | 1:live //
let life = generateTable(size);

paintTable(life);

const oneStepOfLife = (table) => {
  const newLife = table.map((arr) => arr.slice());

  table.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      let liveNeighbor = lookAround(table, row, rowIndex, colIndex);

      // Check lookAround
      if (table[rowIndex][colIndex] === 1 && liveNeighbor < 2) {
        newLife[rowIndex][colIndex] = 0;
      } else if (table[rowIndex][colIndex] === 1 && liveNeighbor === 2) {
        newLife[rowIndex][colIndex] = 1;
      } else if (table[rowIndex][colIndex] === 1 && liveNeighbor === 3) {
        newLife[rowIndex][colIndex] = 1;
      } else if (table[rowIndex][colIndex] === 1 && liveNeighbor > 3) {
        newLife[rowIndex][colIndex] = 0;
      } else if (table[rowIndex][colIndex] === 0 && liveNeighbor === 3) {
        newLife[rowIndex][colIndex] = 1;
      }
    });
  });

  life = newLife;
};

let interval;
const playPause = () => {
  if (!interval) {
    interval = setInterval(() => {
      oneStepOfLife(life);
      paintTable(life);
    }, speed);
  } else {
    clearInterval(interval);
    interval = null;
  }
};

document.querySelector('.controls__play').addEventListener('click', (evt) => {
  playPause();
  evt.target.classList.toggle('controls__play--active');
});

document
  .querySelector('.controls__size-button')
  .addEventListener('click', () => {
    size = document.querySelector('.controls__size-input').value;
    life = generateTable(size);
    paintTable(life);
  });

document
  .querySelector('.controls__speed-input')
  .addEventListener('change', (evt) => {
    const value = evt.target.value;
    speed = value;
  });

document.querySelector('.controls__random').addEventListener('click', () => {
  life = generateRandom(size);
  paintTable(life);
});
