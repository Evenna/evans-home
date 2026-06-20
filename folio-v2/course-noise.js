/* course-noise.js — noise canvas background */
(function(){
  const c = document.getElementById('noise-bg');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, particles = [];
  function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  class P {
    constructor(init) {
      this.reset(init);
    }
    reset(random) {
      this.x = Math.random() * w;
      this.y = random ? Math.random() * h : h + 5;
      this.r = Math.random() * 1.1 + 0.2;
      this.vy = -(Math.random() * 0.25 + 0.04);
      this.vx = (Math.random() - 0.5) * 0.06;
      this.op = Math.random() * 0.18 + 0.03;
      const t = Math.random();
      if (t < 0.5)      this.col = `rgba(80,160,130,${this.op})`;
      else if (t < 0.75) this.col = `rgba(200,170,110,${this.op})`;
      else               this.col = `rgba(200,200,195,${this.op*0.5})`;
    }
    step() {
      this.x += this.vx; this.y += this.vy;
      if (this.y < -5) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = this.col;
      ctx.fill();
    }
  }
  for (let i = 0; i < 100; i++) particles.push(new P(true));
  function loop() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.step(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();
