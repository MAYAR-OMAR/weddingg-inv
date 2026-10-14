/* ===== Edit your invitation details here ===== */
var CFG={
  date:'2026-11-30T19:00:00+02:00',
  timeText:'7:00 PM',
  venueName:'Venue name',
  venueMaps:'',
  whatsapp:''
};
var $=function(s){return document.querySelector(s)};
var pad=function(n){return String(n).padStart(2,'0')};
var T=new Date(CFG.date);
var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var dline=days[T.getDay()]+', 30 November 2026';
$('#dateLine').textContent=dline; $('#whenLine').textContent=dline;
$('#timeTxt').textContent=CFG.timeText; $('#venueTxt').textContent=CFG.venueName;

function tick(){
  var d=T-new Date();
  if(d<=0){
    $('#cdWrap').innerHTML='<p class="cd-msg">'+(d>-864e5?'Today is our day':'Thank you for celebrating with us')+'</p>';
    clearInterval(iv); return;
  }
  var s=Math.floor(d/1000);
  $('#cdD').textContent=pad(Math.floor(s/86400));
  $('#cdH').textContent=pad(Math.floor(s%86400/3600));
  $('#cdM').textContent=pad(Math.floor(s%3600/60));
  $('#cdS').textContent=pad(s%60);
}
var iv=setInterval(tick,1000); tick();

(function(){
  var h='';
  ['S','M','T','W','T','F','S'].forEach(function(l){h+='<i>'+l+'</i>'});
  var off=new Date(2026,10,1).getDay();
  for(var i=0;i<off;i++)h+='<em></em>';
  for(var n=1;n<=30;n++)h+='<em'+(n===30?' class="me" aria-label="Wedding day"':'')+'>'+n+'</em>';
  $('#grid').innerHTML=h;
})();

$('#mapBtn').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(CFG.venueMaps||CFG.venueName);
$('#calBtn').href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Eyad & Fatma Wedding')+'&dates=20261130T170000Z/20261130T210000Z&location='+encodeURIComponent(CFG.venueMaps||CFG.venueName);
function wa(m){return 'https://wa.me/'+CFG.whatsapp+'?text='+encodeURIComponent(m)}
$('#yesBtn').href=wa("I'll be at Eyad & Fatma's wedding, can't wait! \u{1F90D}");
$('#noBtn').href=wa("Congratulations Eyad & Fatma! \u{1F90D} Sadly I won't be able to make it.");

var gate=$('#gate'),vid=$('#vid'),opened=false;
function reveal(){
  if(opened)return; opened=true;
  gate.classList.add('done');
  document.documentElement.classList.remove('lock');
  document.documentElement.classList.add('live');
  setTimeout(function(){gate.remove()},1300);
}
$('#openBtn').addEventListener('click',function(){
  this.classList.add('hide'); $('#skip').classList.add('show');
  var p=vid.play(); if(p&&p.catch)p.catch(reveal);
});
$('#skip').addEventListener('click',reveal);
vid.addEventListener('timeupdate',function(){if(vid.duration&&vid.currentTime>vid.duration-0.9)reveal()});
vid.addEventListener('ended',reveal);
vid.addEventListener('error',reveal);

var dots=[].slice.call(document.querySelectorAll('#dots a'));
var ids=['p1','p2','p3','p4','p5','p6'];
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting){var i=ids.indexOf(e.target.id);dots.forEach(function(d,k){d.classList.toggle('on',k===i)})}});
},{threshold:.5});
document.querySelectorAll('section').forEach(function(s){io.observe(s)});

/* photos -> lightbox */
var lb=$('#lb');
document.querySelectorAll('.slot.has').forEach(function(s){
  s.addEventListener('click',function(){lb.querySelector('img').src=s.querySelector('img').src;lb.classList.add('on')});
});
lb.addEventListener('click',function(){lb.classList.remove('on')});
