const player = document.getElementById("player");
const squares = document.querySelectorAll("#squares div");

let playerX = 97;
let playerY = 110;
let fov = 90; 
let lines = 200;


let playerRotation = 0;
const rotationStep = 5;

player.style.left = playerX + "px";
player.style.top = playerY + "px";

updatePlayerRotation();

function updatePlayerRotation() {
    player.style.transform = `translate(-50%, -50%) rotate(${playerRotation}deg)`;
}

function createCheckingLine(fovangle,colorHex,i) {
  const line = document.createElement("div");
  line.className = "checking-line";
  line.style.width = window.innerWidth/lines+"px"; 
  line.style.height = window.innerHeight*(1-i/100) + "px"; 
  line.style.backgroundColor = "black"; 
  line.style.position = "absolute";
  line.style.left = (window.innerWidth / (fov))*fovangle + "px"; 
  line.style.top = 0; 
  line.style.backgroundColor = colorHex;
  document.body.insertBefore(line, document.body.firstChild); 
  return line;
}

function findColor(fovangle) {
  let angle = fovangle-(fov/2)+playerRotation;
  const step = 5;
  const radians = ((angle - 90) * Math.PI) / 180; 

  

  let currentX = playerX; 
  let currentY = playerY;

  for (let i = 0; i < 50; i++) {
    for (const square of squares) {
      const squareRect = square.getBoundingClientRect();

      if (
        currentX >= squareRect.left &&
        currentX <= squareRect.right &&
        currentY >= squareRect.top &&
        currentY <= squareRect.bottom
      ) {
        const colorHex = getComputedStyle(square).backgroundColor;
        // console.log(`Hex color of the square in ${angle} degrees from the player:`, colorHex);
        createCheckingLine(fovangle,colorHex,i);
        
        return;
      }
    }

    currentX += Math.cos(radians) * step;
    currentY += Math.sin(radians) * step;
  }
  let colorHex = "#000000";
  createCheckingLine(fovangle,colorHex);
}


function draw() {
  document.querySelectorAll(".checking-line").forEach(line => {
    line.remove();
  });
  // const numRays = 1000;
  // for (let i = 0; i < numRays; i++) {
  //   const fovAngle = i * (fov / numRays);
  //   findColor(fovAngle);
  // }
  for (let i = 0; i < fov; i+=(fov/lines)) {
    console.log(i);
    findColor(i);
  }
}

draw();

const target = document.getElementById('player');
let posX = 0;
let posY = 0;
const step = 5;

window.addEventListener('keydown', (event) => {
    let RadianAngle = playerRotation * (Math.PI / 180); 
    let sircleAngle = playerRotation + 90;
    console.log(playerRotation);
    switch (event.key) {
        case 'w':
            playerY -= Math.cos(RadianAngle)*step;
            playerX += Math.sin(RadianAngle)*step;
            break;
        case 'a':
          playerY -= Math.cos(RadianAngle-Math.PI/2)*step;
          playerX += Math.sin(RadianAngle-Math.PI/2)*step;
            break;
        case 's':
          playerY -= Math.cos(RadianAngle+Math.PI)*step;
          playerX += Math.sin(RadianAngle+Math.PI)*step;
            break;
        case 'd':
          playerY -= Math.cos(RadianAngle+Math.PI/2)*step;
          playerX += Math.sin(RadianAngle+Math.PI/2)*step;
            break;
        case 'ArrowLeft':
            playerRotation -= rotationStep;
            break;
        case 'ArrowRight':
            playerRotation += rotationStep;
            break;
    }

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
    // updatePlayerRotation();
    // draw();
});

setInterval(() => {
  updatePlayerRotation();
  draw();
}, 1000/60);