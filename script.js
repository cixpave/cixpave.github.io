  const canvas = document.getElementById('dotCanvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  const spacing = 40;
  let dots = [];
  let mouse = { x: -1000, y: -1000 };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createDots();
  }

  function createDots() {
    dots = [];
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        dots.push({ x, y, alpha: 0 });
      }
    }
  }

  function drawDots() {
    ctx.clearRect(0, 0, width, height);
    dots.forEach(dot => {
      const dx = mouse.x - dot.x;
      const dy = mouse.y - dot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 100;

      let targetAlpha = dist < maxDist ? 1 - dist / maxDist : 0;
      dot.alpha += (targetAlpha - dot.alpha) * 0.1;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
      ctx.fill();
    });
  }

  function animate() {
    drawDots();
    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();
  animate();

  // Game launching logic
  const play = document.getElementById('play');
  const display = document.getElementById('gamePlayed');

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    return document.cookie.split('; ').reduce((acc, cookie) => {
      const [k, v] = cookie.split('=');
      return k === name ? decodeURIComponent(v) : acc;
    }, null);
  }

  const lastGame = getCookie('lastGame');
  if (lastGame) {
    display.textContent = 'Last Played: ' + lastGame;
  } else {
    play.style.display = 'block';
  }

  play.addEventListener('click', function () {
    window.location.href = '/launch.html';
  });

  const buttons = document.querySelectorAll('.game-button');
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const game = this.getAttribute('data-game');
      setCookie('lastGame', game, 30);
      display.textContent = 'Last Played: ' + game;
      window.location.href = '/launch.html';
    });
  });

  

  // Search feature
  
  

  