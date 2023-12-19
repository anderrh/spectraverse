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

let backgroundImageX = -925;

let backgroundImageY = -500;

function animate() {
  window.requestAnimationFrame(animate);
  context.drawImage(image, backgroundImageX, backgroundImageY);
  context.drawImage(playerImage, 0, 0, playerImage.width/4, playerImage.height, canvas.width / 2 - playerImage.width / 2 / 4, canvas.height / 2 - playerImage.height / 2, playerImage.width/4, playerImage.height );
}
animate();
// get correct change x, y
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      backgroundImageY = backgroundImageY + 1
      console.log('pressed w key');
      break;
    case 'a':
      backgroundImageX = backgroundImageX + 1
      console.log('pressed a key');
      break;
    case 's':
      backgroundImageY = backgroundImageY - 1
      console.log('pressed s key');
      break;
    case 'd':
      backgroundImageX = backgroundImageX - 1
      console.log('pressed d key');
      break;
  }
});

