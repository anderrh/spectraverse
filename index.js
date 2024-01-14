// We decided to pull out the collisions from the js object here so they are available below.
function findCollisionLayer(map) {
  const layers = map["layers"];
  for (let i = 0; i < layers.length; i+=1) {
    if (layers[i]["name"] == "Collisions") {
      return layers[i];
    } 
  }
  return null;
}
const collisionsObject = findCollisionLayer(pokemonStyleGameMap)
const collisions = collisionsObject["data"];
const levelWidth = collisionsObject["width"];
const levelHight = collisionsObject["height"]
const zoomLevel = 4;
const tileWidth = pokemonStyleGameMap["tilewidth"] * zoomLevel;
const tileHeight = pokemonStyleGameMap["tileheight"] * zoomLevel;
// done with prelude

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let collisionsMap = []; 
for (let i = 0; i < collisions.length; i+=levelWidth) {
  collisionsMap.push(collisions.slice(i,levelWidth + i))
}  
const offset = {
  x: -925, y: -500
};

class Boundary {
  constructor({position}) {
    this.position = {
      x: position.x * tileWidth + offset.x,
      y: position.y * tileHeight + offset.y
    };
    this.width = tileWidth;
    this.height = tileHeight;
  }
  draw() {
    context.fillStyle = '#ff0000'
    context.fillRect(this.position.x,this.position.y,this.width,this.height)
  }
}

let boundaries = [];
//todo make boundaries move when you move
for (let i = 0; i < collisions.length; i+=1) {
  if (collisions[i] === 1025) {
    boundaries.push(new Boundary(
      {
        position:{
          x: i % levelWidth ,
          y: Math.floor(i/levelWidth)
        }
      }))
  }
}

const image = new Image();
image.src = 'img/Pokemon Style Game Map.png';

const playerImage = new Image()
playerImage.src = './img/playerDown.png';

class Sprite {
  constructor({ position, velocity, image}) {
    this.position = position
    this.image = image
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}
const background = new Sprite({
  position: {
    x: offset.x, y: offset.y
  },
  image: image
})

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw()
  boundaries.forEach(boundary=>boundary.draw())
  context.drawImage(playerImage, 0, 0, playerImage.width/4, playerImage.height, canvas.width / 2 - playerImage.width / 2 / 4, canvas.height / 2 - playerImage.height / 2, playerImage.width/4, playerImage.height );

  if (keys.w.pressed) {
    background.position.y += 5
  }
  if (keys.a.pressed) {
    background.position.x += 5
  }
  if (keys.s.pressed) {
    background.position.y -= 5
  }
  if (keys.d.pressed) {
    background.position.x -= 5
  }
}

animate();
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      console.log('pressed w key');
      break;
    case 'a':
      keys.a.pressed = true
      console.log('pressed a key');
      break;
    case 's':
      keys.s.pressed = true
      console.log('pressed s key');
      break;
    case 'd':
      keys.d.pressed = true
      console.log('pressed d key');
      break;
  }
  console.log(keys)
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      console.log('pressed w key');
      break;
    case 'a':
      keys.a.pressed = false
      console.log('pressed a key');
      break;
    case 's':
      keys.s.pressed = false
      console.log('pressed s key');
      break;
    case 'd':
      keys.d.pressed = false
      console.log('pressed d key');
      break;
  }
  console.log(keys)
});