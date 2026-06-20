/* noise.js */
(function(){
  const c=document.getElementById('noise-bg');
  if(!c)return;
  const ctx=c.getContext('2d');
  let w,h,ps=[];
  function resize(){w=c.width=window.innerWidth;h=c.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  class P{
    constructor(r){this.reset(r);}
    reset(r){
      this.x=Math.random()*w;this.y=r?Math.random()*h:h+5;
      this.rad=Math.random()*1.1+0.2;this.vy=-(Math.random()*0.22+0.04);
      this.vx=(Math.random()-.5)*0.06;this.op=Math.random()*0.16+0.03;
      const t=Math.random();
      this.col=t<.5?`rgba(80,160,130,${this.op})`:t<.75?`rgba(200,170,110,${this.op})`:`rgba(200,200,195,${this.op*.5})`;
    }
    tick(){this.x+=this.vx;this.y+=this.vy;if(this.y<-5)this.reset(false);}
    draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.rad,0,Math.PI*2);ctx.fillStyle=this.col;ctx.fill();}
  }
  for(let i=0;i<90;i++)ps.push(new P(true));
  (function loop(){ctx.clearRect(0,0,w,h);ps.forEach(p=>{p.tick();p.draw();});requestAnimationFrame(loop);})();
})();
