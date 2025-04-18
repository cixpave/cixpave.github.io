let currentIndex = 0;
const tiles = document.querySelectorAll('.game-tile');

function updateSelection(index) {
  tiles.forEach(tile => tile.classList.remove('selected'));
  tiles[index].classList.add('selected');
  tiles[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

function gamepadLoop() {
  const gamepads = navigator.getGamepads();
  if (gamepads[0]) {
    const gp = gamepads[0];
    if (gp.axes[0] > 0.5 && currentIndex < tiles.length - 1) {
      currentIndex++;
      updateSelection(currentIndex);
    } else if (gp.axes[0] < -0.5 && currentIndex > 0) {
      currentIndex--;
      updateSelection(currentIndex);
    }
  }
  requestAnimationFrame(gamepadLoop);
}

window.addEventListener("gamepadconnected", () => {
  console.log("Gamepad connected");
  gamepadLoop();
});

// Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();