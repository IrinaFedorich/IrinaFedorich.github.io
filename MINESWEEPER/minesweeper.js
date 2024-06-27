let r = 12, // rows
    c = 12, // cols
    s = 60, // size of boxes
    boxes,  
    field, 
    flag, 
    fail, 
    reveal,
    canvas = document.getElementById('canvas'), 
    replayButton = document.getElementById('replay');

// make the key.
function Put(row, col) {
  return row + '/' + col;
}

// read the key.
function Get(key) {
  return key.split('/').map(Number);
}

// add/delete flag.
function changeState(key) {
  if (flag.has(key)) 
    flag.delete(key);
  else 
    flag.add(key);
}

// open box
function openBox(key) {
  if (field.get(key) === 'b') 
    fail = key;
  else 
    revealMore(key, new Set());
}

// open empty boxes
function revealMore(key, visited) {
  reveal.add(key);
  visited.add(key);

  let isEmpty = !field.has(key);
  if (isEmpty) 
    for (let neighborKey of getNeighbors(key)) 
      if (!visited.has(neighborKey)) 
        revealMore(neighborKey, visited);
}

// checking whether a box is in the field
function inField([row, col]) {
  if (row < 0 || col < 0) 
    return false;
  if (row >= r || col >= c)
    return false;
  return true;
}

// checking neighbors
function getNeighbors(key) {
  let [x, y] = Get(key),
    neighbors = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    ];
  return neighbors.filter(inField).map(([r, c]) => Put(r, c));
}

// creating bombs
function createBombs() {
  let count = Math.round(Math.sqrt(r * c * 3)), s,
    allKeys = [], coinFlip;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) 
      allKeys.push(Put(i, j));
  }
  allKeys.sort(() => {
    coinFlip = Math.random() > 0.5;
    return coinFlip ? 1 : -1;
  })
  return allKeys.slice(0, count);
}

// creatimg fields
function createField(numOfB) {
  let field = new Map(), key;
  for (key of numOfB) {
    field.set(key, 'b');
    for (let neighborKey of getNeighbors(key)) 
      numofB(neighborKey, field);
  }
  return field;
}

// counting bombs around the box
function numofB(neighborKey, field) {
  let old;
  if (!field.has(neighborKey)) 
      field.set(neighborKey, 1);
  else {
    old = field.get(neighborKey);
    if (old !== 'b') 
      field.set(neighborKey, old + 1);
  }
}

// creating buttons for boxes and replay button
function createButtons() {
  let i, j, box;

  for (i = 0; i < r; i++) {
    for (j = 0; j < c; j++) {
      box = document.createElement('button');
      box.style.float = 'left';
      box.style.width = s + 'px';
      box.style.height = s + 'px';
      box.style.backgroundColor = 'Lavender';
      box.oncontextmenu = (e) => {
        if (fail !== null) 
          return;
        e.preventDefault();
        changeState(key);
        update();
      }
      box.onclick = (e) => {
        if (fail !== null) 
          return;
        if (flag.has(key)) 
          return;
        openBox(key);
        update();
      }
      canvas.appendChild(box);
      let key = Put(i, j);
      boxes.set(key, box);
    }
  }

  canvas.style.width = r * s + 'px';
  canvas.style.height = c * s + 'px';

  replayButton.onclick = localStorage.clear();
  replayButton.onclick = start;
}

// start game
function start() {
    fail = null;
    reveal = new Set();
    flag = new Set();
    field = createField(createBombs());
    if (boxes) 
      update();
    else {
      boxes = new Map();
      createButtons();
    }
}

// updating of game state
function update() {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let key = Put(i, j),
        box = boxes.get(key),
        val = field.get(key);

      box.style.backgroundColor = 'Lavender';
      box.style.color = 'black';
      box.textContent = '';
      box.disabled = false;

        if (fail !== null && val === 'b') {
          box.disabled = true;
          box.style.backgroundColor = 'Thistle';
          box.textContent = '🍓';
         if (key === fail) {
           box.style.backgroundColor = 'Pink';
         }
      } else if (reveal.has(key)) {
            box.disabled = true;
            if (val === undefined) 
              box.textContent = ' ';
            else if (val === 1) {
              box.textContent = '1';
              box.style.color = 'MediumPurple';
            } else if (val === 2) {
              box.textContent = '2';
              box.style.color = 'BlueViolet';
            } else if (val >= 3) {
              box.textContent = val;
              box.style.color = 'Indigo';
            }
      } else if (flag.has(key)) 
          box.textContent = '🎀';
    }
  }
  if (fail !== null) {
    canvas.style.pointerEvents = 'none';
    replayButton.style.display = 'block';
  } else 
    canvas.style.pointerEvents = '';
}

start();
