const env=document.getElementById('env'),seal=document.getElementById('seal');
function openEnv(){
  if(env.classList.contains('open'))return;
  env.classList.add('open');
  setTimeout(()=>{document.body.classList.remove('lock');window.scrollTo(0,0);petals()},1400);
  setTimeout(()=>env.remove(),2900);
}
seal.addEventListener('click',openEnv);
env.addEventListener('click',openEnv);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i<3?i*.4+1.3:0)+'s';io.observe(el)});
function petals(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  for(let i=0;i<14;i++){const p=document.createElement('i');p.className='petal';
    p.style.left=Math.random()*100+'vw';p.style.animationDuration=9+Math.random()*9+'s';
    p.style.animationDelay=Math.random()*8+'s';p.style.opacity=.35+Math.random()*.4;
    p.style.transform='scale('+(.6+Math.random()*.8)+')';document.body.appendChild(p)}
}
const target=new Date('2026-12-18T19:00:00+02:00'),box=document.getElementById('count');
function tick(){
  let d=Math.max(0,target-Date.now()),s=Math.floor(d/1000);
  const v=[['Days',Math.floor(s/86400)],['Hours',Math.floor(s/3600)%24],['Minutes',Math.floor(s/60)%60],['Seconds',s%60]];
  box.innerHTML=v.map(x=>'<div><b>'+String(x[1]).padStart(2,'0')+'</b><span>'+x[0]+'</span></div>').join('');
}
tick();setInterval(tick,1000);
