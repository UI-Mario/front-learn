"use strict";
let w, h;
let as = ["a", "A"];
let xoff = 0;
var particles = [];
var attractor;
var angle = 0;

class Particle {
  constructor(txt, x, y) {
    this.txt = txt;
    this.pos = createVector(x, y);
    this.vel = createVector(0.5, 0);
    this.acc = createVector(0, 0);
    this.mass = random(1,2);
  }
  show() {
    noStroke();
    fill(0);
    textSize(12);
    text(this.txt, this.pos.x, this.pos.y);
  }; 
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };
  applyForce(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  };
}

class Attractor {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.G = 1;
    this.angle = 0;
  }
  show() {
    noStroke();
    fill(0);
    textSize(50);
    text("A", this.pos.x, this.pos.y);
  }
  update() {
    // this.mass *= 1;
  }
  calculateAttraction(p) {
    var force = p5.Vector.sub(this.pos, p.pos);
    var distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    var strength = (this.G * this.mass * p.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }
}

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);
  angleMode(DEGREES);
  for (let i=0; i<width/3; i++) {
    particles.push(new Particle(as[floor(random(2))], noise(xoff+10*i)*w, noise(xoff+2*i)*100))
  };
  attractor = new Attractor(w/2, h/2, 15);
}

function draw() {
  background(255, 200);
  attractor.show();
  attractor.update();  
  for (let i=0; i<particles.length; i++) {
    var force = attractor.calculateAttraction(particles[i]);
    particles[i].applyForce(force);
    particles[i].update();
    particles[i].show();
  }
}
