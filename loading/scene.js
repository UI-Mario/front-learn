let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const fps = 30;
let theme = "black"

let time = {
  prev: (new Date()).getTime(),
  curr: 0,
  delta: 0,
  update: () => {
    time.curr = (new Date()).getTime();
    time.delta = (time.curr - time.prev) / 1000;
  }
};

class A {
  constructor({x, y, dx, dy, size, life = 100}) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.life = life;
  }
  
  getFontColor() {
    return theme === 'black' ? 'white' : 'black';
  }
  
  draw () {
    ctx.font = this.size + 'px Arial';
    ctx.fillStyle = this.getFontColor();
    ctx.globalAlpha = Math.sin(Math.PI * this.life / 100);
    ctx.fillText("A", this.x, this.y);
  }
  
  update () {
    this.x += this.dx;
    this.y += this.dy;
    this.life -= 0.25;
  }
}

let a_arr = [];

function resizeWindow () {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function update () {
  time.update();
  
  a_arr.forEach((a, index) => {
    a.update();
    
    if (a.life <= 0) {
      a_arr.splice(index, 1);
    }
  });
  
  if (Math.floor(Math.random() * Math.floor(100)) < 5) {
    a_arr.push(new A({
      x: (Math.random() * ctx.canvas.width),
      y: Math.random() * ctx.canvas.height,
      dx: 1.25 - Math.random() * 2.5,
      dy: 1.25 - Math.random() * 2.5,
      size: 30 + (Math.random() * 75)
    }));
  }
}

function draw () {
  a_arr.forEach((a) => {a.draw();});
}

function render () {
  window.requestAnimationFrame(render);
  resizeWindow();
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  update();
  draw();
  
  time.prev = time.curr;
}


render();

let toggleTheme = () => {
  if (theme === 'black') {
    document.getElementById('theme-toggle').style.backgroundColor = 'black';
    document.getElementById('canvas').style.backgroundColor = 'white';
    theme = 'white';
  } else {
    document.getElementById('theme-toggle').style.backgroundColor = 'white';
    document.getElementById('canvas').style.backgroundColor = 'black';
    theme = 'black';
  }
}