/* eslint-disable no-param-reassign */
export const generateTable = (num) => {
  const resultArr = [];
  for (let i = 0; i < num; i += 1) {
    resultArr.push([]);
  }
  for (let i = 0; i < num; i += 1) {
    for (let j = 0; j < num; j += 1) {
      resultArr[i][j] = 0;
    }
  }
  return resultArr;
};

export const generateRandom = (num) => {
  const resultArr = [];
  for (let i = 0; i < num; i += 1) {
    resultArr.push([]);
  }
  for (let i = 0; i < num; i += 1) {
    for (let j = 0; j < num; j += 1) {
      if (Math.random() < 0.3) {
        resultArr[i][j] = 1;
      } else {
        resultArr[i][j] = 0;
      }
    }
  }
  return resultArr;
};

export const makePaintable = (life) => {
  const elements = document.querySelectorAll('.gameTable__el');
  elements.forEach((e) => {
    e.addEventListener('click', (evt) => {
      const coords = evt.target.id.split(' ');

      if (life[coords[0]][coords[1]] === 1) {
        life[coords[0]][coords[1]] = 0;
      } else {
        life[coords[0]][coords[1]] = 1;
      }

      evt.target.classList.toggle('gameTable__el--alive');
      console.log(life);
    });
  });
};

export const paintTable = (table) => {
  const container = document.querySelector('.gameTable');
  if (container.firstChild) {
    container.innerHTML = "<div class='.gameTable'></div>";
  }
  for (let i = 0; i < table.length; i += 1) {
    const row = document.createElement('div');
    row.className = 'gameTable__row';
    container.appendChild(row);
    for (let j = 0; j < table.length; j += 1) {
      const element = document.createElement('div');
      element.className = 'gameTable__el';
      element.id = `${i} ${j}`;
      if (table[i][j] === 1) {
        element.classList.add('gameTable__el--alive');
      }
      row.appendChild(element);
    }
  }

  makePaintable(table);
};

export const lookAround = (table, row, rowIndex, colIndex) => {
  let liveNeighbor = 0;
  if (
    table[rowIndex - 1] &&
    table[rowIndex - 1][colIndex - 1] &&
    table[rowIndex - 1][colIndex - 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    table[rowIndex - 1] &&
    table[rowIndex - 1][colIndex - 1] === undefined &&
    table[rowIndex - 1][row.length - 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    !table[rowIndex - 1] &&
    table[table.length - 1][colIndex - 1] &&
    table[table.length - 1][colIndex - 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    !table[rowIndex - 1] &&
    table[table.length - 1][colIndex - 1] === undefined &&
    table[table.length - 1][row.length - 1] === 1
  ) {
    liveNeighbor += 1;
  }

  // 2 table[rowIndex - 1][colIndex] Up
  if (
    table[rowIndex - 1] &&
    table[rowIndex - 1][colIndex] &&
    table[rowIndex - 1][colIndex] === 1
  ) {
    liveNeighbor += 1;
  } else if (!table[rowIndex - 1] && table[table.length - 1][colIndex] === 1) {
    liveNeighbor += 1;
  }

  // 3 table[rowIndex - 1][colIndex + 1] Up Right
  if (
    table[rowIndex - 1] &&
    table[rowIndex - 1][colIndex + 1] &&
    table[rowIndex - 1][colIndex + 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    table[rowIndex - 1] &&
    table[rowIndex - 1][colIndex + 1] === undefined &&
    table[rowIndex - 1][0] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    !table[rowIndex - 1] &&
    table[table.length - 1][colIndex + 1] &&
    table[table.length - 1][colIndex + 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    !table[rowIndex - 1] &&
    table[table.length - 1][colIndex + 1] === undefined &&
    table[table.length - 1][0] === 1
  ) {
    liveNeighbor += 1;
  }

  // 4 table[rowIndex][colIndex - 1] Left
  if (table[rowIndex][colIndex - 1] && table[rowIndex][colIndex - 1] === 1) {
    liveNeighbor += 1;
  } else if (
    table[rowIndex][colIndex - 1] === undefined &&
    table[rowIndex][row.length - 1] === 1
  ) {
    liveNeighbor += 1;
  }

  // 5 table[rowIndex][colIndex + 1] Right
  if (table[rowIndex][colIndex + 1] && table[rowIndex][colIndex + 1] === 1) {
    liveNeighbor += 1;
  } else if (
    table[rowIndex][colIndex + 1] === undefined &&
    table[rowIndex][0] === 1
  ) {
    liveNeighbor += 1;
  }

  // 6 table[rowIndex + 1][colIndex - 1] Down Left
  if (
    table[rowIndex + 1] &&
    table[rowIndex + 1][colIndex - 1] &&
    table[rowIndex + 1][colIndex - 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    table[rowIndex + 1] &&
    table[rowIndex + 1][colIndex - 1] === undefined &&
    table[rowIndex + 1][row.length - 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    !table[rowIndex + 1] &&
    table[0][colIndex - 1] &&
    table[0][colIndex - 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    !table[rowIndex + 1] &&
    table[0][colIndex - 1] === undefined &&
    table[0][row.length - 1] === 1
  ) {
    liveNeighbor += 1;
  }

  // 7 table[rowIndex + 1][colIndex] Down
  if (
    table[rowIndex + 1] &&
    table[rowIndex + 1][colIndex] &&
    table[rowIndex + 1][colIndex] === 1
  ) {
    liveNeighbor += 1;
  } else if (!table[rowIndex + 1] && table[0][colIndex] === 1) {
    liveNeighbor += 1;
  }

  // 8 table[rowIndex + 1][colIndex + 1] Down Right
  if (
    table[rowIndex + 1] &&
    table[rowIndex + 1][colIndex + 1] &&
    table[rowIndex + 1][colIndex + 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    table[rowIndex + 1] &&
    table[rowIndex + 1][colIndex + 1] === undefined &&
    table[rowIndex + 1][0] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    !table[rowIndex + 1] &&
    table[0][colIndex + 1] &&
    table[0][colIndex + 1] === 1
  ) {
    liveNeighbor += 1;
  } else if (
    !table[rowIndex + 1] &&
    table[0][colIndex + 1] === undefined &&
    table[0][0] === 1
  ) {
    liveNeighbor += 1;
  }

  return liveNeighbor;
};
