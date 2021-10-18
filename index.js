/* eslint-disable operator-linebreak */
// w2-game-of-life__moises-rodriguez
import {
  generateTable,
  paintTable,
  lookAround,
  generateRandom,
} from './helpers.js';

import library from './library.js';

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
  const button = document.querySelector('.controls__play');
  button.classList.toggle('controls__play--active');
  if (button.innerHTML === `Pause <i class="far fa-pause-circle"></i>`) {
    button.innerHTML = `Play <i class="far fa-play-circle"></i>`;
  } else {
    button.innerHTML = `Pause <i class="far fa-pause-circle"></i>`;
  }
});

document
  .querySelector('.controls__size-button')
  .addEventListener('click', () => {
    life = generateTable(size);
    paintTable(life);
  });

document
  .querySelector('.controls__speed-input--range--simple')
  .addEventListener('change', (evt) => {
    size = evt.target.value;
    life = generateTable(size);
    paintTable(life);
  });

document
  .querySelector('.controls__speed-input')
  .addEventListener('change', (evt) => {
    const value = evt.target.value;
    speed = value;
    if (interval) {
      clearInterval(interval);
      interval = null;
      playPause();
    }
  });

document.querySelector('.controls__random').addEventListener('click', () => {
  life = generateRandom(size);
  paintTable(life);
});

document.querySelector('.fa-question-circle').addEventListener('click', () => {
  document.querySelector('.info').style.visibility = 'visible';
});

document.querySelector('.info__close').addEventListener('click', () => {
  document.querySelector('.info').style.visibility = 'hidden';
});

document.querySelector('.fa-book').addEventListener('click', () => {
  document.querySelector('.library').style.visibility = 'visible';
});

document.querySelector('.library__close').addEventListener('click', () => {
  document.querySelector('.library').style.visibility = 'hidden';
});

for (const element in library) {
  const container = document.createElement('div');
  container.classList.add('library__gallery-item');
  const title = document.createElement('h1');
  title.classList.add('library__gallery-title');
  title.innerText = library[element].name;
  const description = document.createElement('p');
  description.classList.add('library__gallery-description');
  description.innerText = library[element].description;
  const image = document.createElement('img');
  image.src = library[element].url;
  image.alt = `Game of life ${element}`;
  image.classList.add('library__gallery-image');
  image.id = element;
  container.appendChild(title);
  container.appendChild(image);
  container.appendChild(description);
  document.querySelector('.library__gallery').appendChild(container);
}

const images = document.querySelectorAll('.library__gallery-item');

images.forEach((e) => {
  e.addEventListener('click', (evt) => {
    life = library[evt.target.id].pattern;
    paintTable(life);
    document.querySelector('.library').style.visibility = 'hidden';
  });
});
