(function(){
  const deck = document.getElementById('deck');
  const nav  = document.getElementById('nav');
  const prog = document.getElementById('progress');
  const ctr  = document.getElementById('counter');

  // Build slides
  SLIDES.forEach(function(s){
    const el = document.createElement('div');
    el.className = 'slide';
    el.id = 'slide-' + s.id;
    deck.appendChild(el);
    s.render(el);
  });

  const total = SLIDES.length;

  // Nav dots
  SLIDES.forEach(function(_, i){
    const d = document.createElement('div');
    d.className = 'dot';
    d.addEventListener('click', function(){ goTo(i); });
    nav.appendChild(d);
  });

  function updateUI(i){
    document.querySelectorAll('#nav .dot').forEach(function(d,j){ d.classList.toggle('active', j===i); });
    prog.style.width = ((i+1)/total*100) + '%';
    ctr.textContent = String(i+1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
  }

  function goTo(i){
    const slides = document.querySelectorAll('.slide');
    if(slides[i]) slides[i].scrollIntoView({behavior:'smooth', block:'start'});
  }

  // Keyboard
  let cur = 0;
  document.addEventListener('keydown', function(e){
    if(e.key==='ArrowDown'||e.key===' '||e.key==='PageDown'){
      e.preventDefault();
      if(cur < total-1){ cur++; goTo(cur); }
    } else if(e.key==='ArrowUp'||e.key==='PageUp'){
      e.preventDefault();
      if(cur > 0){ cur--; goTo(cur); }
    }
  });

  // IntersectionObserver
  const obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.intersectionRatio >= 0.5){
        const idx = Array.from(document.querySelectorAll('.slide')).indexOf(entry.target);
        if(idx >= 0){ cur = idx; updateUI(cur); }
      }
    });
  },{threshold:[0,0.5,1]});
  document.querySelectorAll('.slide').forEach(function(el){ obs.observe(el); });

  // Touch swipe
  let ty0 = null;
  document.addEventListener('touchstart', function(e){ ty0 = e.changedTouches[0].clientY; },{passive:true});
  document.addEventListener('touchend', function(e){
    if(ty0 === null) return;
    const dy = ty0 - e.changedTouches[0].clientY;
    if(Math.abs(dy) > 50){
      if(dy > 0 && cur < total-1){ cur++; goTo(cur); }
      else if(dy < 0 && cur > 0){ cur--; goTo(cur); }
    }
    ty0 = null;
  },{passive:true});

  updateUI(0);
})();
