(function(){
  var CONFIG = {
    place: "The Grand Ballroom, Cairo",
    date: "2026-11-11T19:00:00"
  };
  var $ = function(id){return document.getElementById(id)};
  var hero=$("hero"), vid=$("vid"), still=$("still"), seal=$("seal");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var videoBad=false, started=false, done=false, revealed=false;

  /* always start from the top, even after reload */
  if("scrollRestoration" in history) history.scrollRestoration="manual";
  window.scrollTo(0,0);

  vid.addEventListener("error", function(){ videoBad=true; });

  /* ---------- Petals: hero only, few, paused when off screen ---------- */
  var cv=$("petals"), ctx=cv.getContext&&cv.getContext("2d"), petals=[], raf=0, petalsOn=false, visible=true, W=0, H=0;
  var cols=["#e8d3f7","#c9a3e0","#f4c9de","#ffffff","#b58bd6","#d9bb7a"];
  function sizeCv(){ var d=Math.min(window.devicePixelRatio||1,1.5); W=cv.clientWidth; H=cv.clientHeight; cv.width=W*d; cv.height=H*d; ctx.setTransform(d,0,0,d,0,0); }
  function mk(initial){
    return {x:Math.random()*W,y:initial?Math.random()*-H:-20,s:7+Math.random()*9,vy:.5+Math.random()*.8,
      sw:.6+Math.random()*1.2,ph:Math.random()*6.28,r:Math.random()*6.28,vr:(Math.random()-.5)*.03,
      c:cols[(Math.random()*cols.length)|0],a:.55+Math.random()*.35};
  }
  function drawPetal(p,t){
    var fl=Math.cos(t*.002*p.sw+p.ph), s=p.s;
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.scale(.45+.55*Math.abs(fl),1);
    ctx.globalAlpha=p.a; ctx.fillStyle=p.c;
    ctx.beginPath(); ctx.moveTo(0,-s); ctx.bezierCurveTo(s*.95,-s*.45,s*.7,s*.75,0,s); ctx.bezierCurveTo(-s*.7,s*.75,-s*.95,-s*.45,0,-s); ctx.fill();
    ctx.restore();
  }
  function loop(t){
    if(!petalsOn||!visible||document.hidden){ raf=0; return; }
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<petals.length;i++){
      var p=petals[i]; p.y+=p.vy; p.x+=Math.sin(t*.0012*p.sw+p.ph)*.7; p.r+=p.vr;
      if(p.y>H+20||p.x<-30||p.x>W+30){ petals[i]=mk(false); }
      drawPetal(petals[i],t);
    }
    raf=requestAnimationFrame(loop);
  }
  function kick(){ if(!raf&&petalsOn&&visible&&!document.hidden) raf=requestAnimationFrame(loop); }
  function startPetals(){
    if(!ctx||reduce||petalsOn) return; petalsOn=true; sizeCv();
    var n=W<480?12:16; petals=[]; for(var i=0;i<n;i++) petals.push(mk(true));
    kick();
  }
    if("IntersectionObserver" in window){
    new IntersectionObserver(function(es){ visible=es[0].isIntersecting; kick(); },{threshold:0}).observe(hero);
  }
  document.addEventListener("visibilitychange", kick);
  window.addEventListener("resize", function(){ if(petalsOn) sizeCv(); });

  /* ---------- Opening ---------- */
  function reveal(){ if(revealed) return; revealed=true; hero.classList.add("revealed"); startPetals(); }
  function finish(){ if(done) return; done=true; reveal(); document.body.classList.remove("locked"); }
  function fallback(){ still.style.opacity=1; setTimeout(reveal,900); setTimeout(finish,1400); }
  function open(){
    if(started) return; started=true;
    hero.classList.add("opened");
    if(reduce){ try{ vid.currentTime=3.2; }catch(e){} still.style.opacity=1; reveal(); setTimeout(finish,300); return; }
    if(videoBad){ fallback(); return; }
    var p; try{ p=vid.play(); }catch(e){ fallback(); return; }
    if(p&&p.catch) p.catch(function(){ fallback(); });
    setTimeout(reveal,2300);
    vid.addEventListener("ended", finish, {once:true});
    setTimeout(finish,3900);
  }
  seal.addEventListener("click", open);

  /* ---------- Timeline dots (no scroll listener) ---------- */
  var evs=[].slice.call(document.querySelectorAll(".ev"));
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ e.target.classList.toggle("on", e.isIntersecting); }); },{rootMargin:"0px 0px -28% 0px"});
    evs.forEach(function(el){ io.observe(el); });
  } else evs.forEach(function(el){ el.classList.add("on"); });

  /* ---------- Countdown ---------- */
  var target=new Date(CONFIG.date).getTime(), els={d:$("d"),h:$("h"),m:$("m"),s:$("s")};
  function pad(n){return n<10?"0"+n:""+n}
  function tick(){
    var diff=target-Date.now();
    if(diff<=0){ $("count").style.display="none"; $("done").style.display="block"; return; }
    var s=Math.floor(diff/1000);
    els.d.textContent=Math.floor(s/86400); els.h.textContent=pad(Math.floor(s%86400/3600));
    els.m.textContent=pad(Math.floor(s%3600/60)); els.s.textContent=pad(s%60);
  }
  tick(); setInterval(tick,1000);

  $("maps").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(CONFIG.place);
})();
