/* mount.js */
(function(){
  const RENDER_FN={play:'play',what:'what',tools:'tools',looks:'looks',car:'car',map:'map',start:'start',ai:'ai',traps:'traps'};
  const tabs=document.getElementById('tabs');
  const prog=document.getElementById('prog-bar');
  const scroll=document.getElementById('scroll');
  const bp=document.getElementById('bp');
  const bn=document.getElementById('bn');
  const chnum=document.getElementById('ch-num');
  const tip=document.getElementById('demo-tip');
  const eyebrow=()=>document.createElement('div');
  let cur=0;

  // build tabs
  window.CHAPTERS.forEach((ch,i)=>{
    const t=document.createElement('div');
    t.className='tab'+(i===0?' on':'');
    t.textContent=ch.tab;
    t.onclick=()=>goTo(i);
    tabs.appendChild(t);
  });

  function goTo(i){
    if(i<0||i>=window.CHAPTERS.length)return;
    cur=i;
    const ch=window.CHAPTERS[i];
    // tabs
    tabs.querySelectorAll('.tab').forEach((t,j)=>t.classList.toggle('on',j===i));
    // progress
    prog.style.width=((i+1)/window.CHAPTERS.length*100)+'%';
    // buttons
    bp.disabled=i===0;
    bn.disabled=i===window.CHAPTERS.length-1;
    chnum.textContent=(i+1)+' / '+window.CHAPTERS.length;
    // tip
    if(ch.tip){tip.textContent=ch.tip;tip.classList.add('show');}
    else{tip.classList.remove('show');}
    // render
    scroll.innerHTML=`
      <div class="eyebrow">${String(i+1).padStart(2,'0')} / ${String(window.CHAPTERS.length).padStart(2,'0')}</div>
      <h1 class="ch-title" style="margin-top:4px">${ch.title}<em> ${ch.titleEm}</em></h1>
      <p class="ch-lead">${ch.lead}</p>
      <div id="ch-body"></div>`;
    const fn=window.R[RENDER_FN[ch.id]];
    if(fn)fn(document.getElementById('ch-body'));
    scroll.scrollTo(0,0);
  }

  bp.onclick=()=>goTo(cur-1);
  bn.onclick=()=>goTo(cur+1);
  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key==='ArrowDown')goTo(cur+1);
    if(e.key==='ArrowLeft'||e.key==='ArrowUp')goTo(cur-1);
  });

  goTo(0);
})();
