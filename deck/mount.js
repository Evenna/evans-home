// mount.js — render slides + interactivity

(function(){
  const deck = document.getElementById('deck');
  const nav  = document.getElementById('nav');
  const ctr  = document.getElementById('ctr');
  const prog = document.getElementById('progress');
  const N    = SLIDES.length;

  // inject slides
  SLIDES.forEach(html => { deck.insertAdjacentHTML('beforeend', html); });

  // nav dots
  SLIDES.forEach((_,i) => {
    const d = document.createElement('div');
    d.className = 'dot';
    d.addEventListener('click', () => deck.children[i].scrollIntoView({behavior:'smooth'}));
    nav.appendChild(d);
  });

  // update active state
  function setActive(i){
    document.querySelectorAll('.dot').forEach((d,j) => d.classList.toggle('active', j===i));
    ctr.textContent = String(i+1).padStart(2,'0') + ' / ' + String(N).padStart(2,'0');
    prog.style.width = ((i+1)/N*100) + '%';
  }

  // intersection observer
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const idx = Array.from(deck.children).indexOf(e.target);
        setActive(idx);
      }
    });
  }, {threshold: 0.5});
  Array.from(deck.children).forEach(s => io.observe(s));
  setActive(0);

  // keyboard navigation
  document.addEventListener('keydown', e => {
    const ss = Array.from(deck.children);
    const cur = ss.findIndex(s => {
      const r = s.getBoundingClientRect();
      return r.top > -50 && r.top < window.innerHeight * 0.5;
    });
    if((e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') && cur < ss.length-1){
      e.preventDefault(); ss[cur+1].scrollIntoView({behavior:'smooth'});
    }
    if((e.key === 'ArrowUp' || e.key === 'PageUp') && cur > 0){
      e.preventDefault(); ss[cur-1].scrollIntoView({behavior:'smooth'});
    }
    if(e.key === 'Home'){ ss[0].scrollIntoView({behavior:'smooth'}); }
    if(e.key === 'End')  { ss[ss.length-1].scrollIntoView({behavior:'smooth'}); }
  });
})();
