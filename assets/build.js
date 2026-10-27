/* Stackly architect-studio theme: scroll beam, reveals, service rows, timeline */
(function(){
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar = document.createElement('div'); bar.id = 'bdProg'; document.body.appendChild(bar);
  function prog(){ var h = document.documentElement, m = h.scrollHeight - h.clientHeight; bar.style.width = (m > 0 ? Math.min(100, h.scrollTop / m * 100) : 0) + '%'; }
  addEventListener('scroll', prog, {passive:true}); addEventListener('resize', prog); prog();

  /* services: hover / focus / tap opens a row */
  var svc = document.getElementById('arSvc');
  if(svc){
    var rows = [].slice.call(svc.querySelectorAll('.ar-row'));
    rows.forEach(function(r){
      function open(){ rows.forEach(function(x){ x.classList.toggle('is-open', x === r); }); }
      r.addEventListener('mouseenter', open); r.addEventListener('focus', open);
    });
  }
  if(!('IntersectionObserver' in window) || reduce){
    var t = document.getElementById('arTime'); if(t) t.classList.add('go'); return;
  }
  /* timeline fills when scrolled into view */
  var tl = document.getElementById('arTime');
  if(tl){ new IntersectionObserver(function(e,o){ if(e[0].isIntersecting){ tl.classList.add('go'); o.disconnect(); } },{threshold:.35}).observe(tl); }

  /* reveal on scroll */
  var sel = '.ar-feat,.ar-m,.ar-tm,.ar-q,.ar-l,.ar-head,.ar-step,.ar-band-in>div,.ar-row,.prog-card,.feature-card,.value-card,.team-card,.blog-card,.plan-card,.price-card,.step-card,.dcx-card,.contact-card';
  var style = document.createElement('style');
  style.textContent = '.rv:not(.in){opacity:0}.rv.in{animation:rvIn .8s cubic-bezier(.22,.8,.2,1) backwards}@keyframes rvIn{from{opacity:0;transform:translateY(34px)}}';
  document.head.appendChild(style);
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ var el = e.target, sib = el.parentElement ? [].slice.call(el.parentElement.children) : [el]; el.style.animationDelay = Math.min(sib.indexOf(el), 5) * 90 + 'ms'; el.classList.add('in'); io.unobserve(el); } });
  },{threshold:.1, rootMargin:'0px 0px -5% 0px'});
  [].slice.call(document.querySelectorAll(sel)).forEach(function(el){
    var r = el.getBoundingClientRect(); if(r.top < innerHeight && r.bottom > 0) return;
    el.classList.add('rv'); io.observe(el);
  });
  setTimeout(function(){ document.querySelectorAll('.rv:not(.in)').forEach(function(el){ if(el.getBoundingClientRect().top < innerHeight*1.2) el.classList.add('in'); }); }, 2500);
})();
