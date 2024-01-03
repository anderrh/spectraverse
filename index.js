const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width,canvas.height);


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
    x: -925, y: -500
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
  context.drawImage(playerImage, 0, 0, playerImage.width/4, playerImage.height, canvas.width / 2 - playerImage.width / 2 / 4, canvas.height / 2 - playerImage.height / 2, playerImage.width/4, playerImage.height );

  if (keys.w.pressed) {
    background.position.y = background.position.y + 5
  }
  if (keys.a.pressed) {
    background.position.x = background.position.x + 5
  }
  if (keys.s.pressed) {
    background.position.y = background.position.y - 5
  }
  if (keys.d.pressed) {
    background.position.x = background.position.x - 5
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