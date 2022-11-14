let pos = 0;
let started = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  let randR = Math.floor( Math.random()*2);
  let left = 0; 
  newimg.style.position = 'absolute';
  newimg.src = pacArray[left][ randR ];
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // TODO add new Child image to game
  game.appendChild( newimg );

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    randR,
    left
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.randR = (item.randR + 1) % 2;
    item.newimg.src = pacArray[item.left][ item.randR ];

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function deletePac() {
  const lastPac = pacMen.pop();
  game.removeChild( lastPac.newimg );
}

function checkCollisions(item) {
  let img = item.newimg;
  if( item.position.x + item.velocity.x + img.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0 ) { 
      item.velocity.x *= -1; 
      item.left = (item.left + 1) % 2;
    }
  
  if( item.position.y + item.velocity.y + img.height > window.innerHeight || 
    item.position.y + item.velocity.y < 0 ) item.velocity.y *= -1;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
