const stage = document.querySelector('#wall');
const layer = document.querySelector('#pillows');
const reset = document.querySelector('#reset');
// Page 1 lives one folder below the shared asset library.
const source = '../assets/heart-pillow-satin-web.png';
const kinds = ['red','blue','green','orange','purple','yellow','pink','red','blue','green','purple','yellow'];
// Keep every pillow generously sized, with a few oversized statement hearts.
const sizeSteps = [1.48, 1.14, 1.3, 1.08, 1.42, 1.18, 1.02, 1.34, 1.12, 1.55, 1.2, 1.28];
let bodies = [], active = null, last = null, frame;
const dropGravity = .46, bounce = .7, air = .997;
let launchedAt = 0, floating = false;

function dimensions() { return { w:stage.clientWidth, h:stage.clientHeight }; }
function makePillows() {
  bodies.forEach(b => b.el.remove()); bodies = [];
  const {w,h} = dimensions();
  launchedAt = performance.now(); floating = false;
  kinds.forEach((kind, i) => {
    const base = Math.max(112, Math.min(176, w * .125));
    const size = Math.round(base * sizeSteps[i]);
    const el = document.createElement('div');
    el.className = 'pillow'; el.dataset.kind = kind; el.style.setProperty('--size', size + 'px');
    el.innerHTML = `<img src="${source}" alt="${kind} heart pillow" draggable="false">`;
    layer.appendChild(el);
    const r=size*.39;
    const body = { el, r, x:Math.max(r+8, Math.min(w-r-8, (i%4+.5)*w/4)), y:-size*(1+i*.28), vx:(i%2?1:-1)*(.35+i*.035), vy:0, a:(i%5-2)*.08, va:0, float:i*1.73, held:false };
    bodies.push(body); paint(body);
  });
}
function paint(b) { b.el.style.transform = `translate3d(${b.x-b.r*1.28}px,${b.y-b.r*1.12}px,0) rotate(${b.a}rad)`; }
function collide(a,b) {
  const dx=b.x-a.x, dy=b.y-a.y, d=Math.hypot(dx,dy)||.01, min=a.r+b.r;
  if(d>=min) return;
  const nx=dx/d, ny=dy/d, overlap=min-d;
  if(!a.held){ a.x-=nx*overlap*.5; a.y-=ny*overlap*.5; } if(!b.held){ b.x+=nx*overlap*.5; b.y+=ny*overlap*.5; }
  const relative=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
  if(relative<0){ const push=-(1+bounce)*relative*.5; if(!a.held){a.vx-=push*nx;a.vy-=push*ny;} if(!b.held){b.vx+=push*nx;b.vy+=push*ny;} }
}
function avoidTitle(b, w, h) {
  // A padded invisible rectangle protects the central message during float mode.
  const titleW = Math.min(w*.62, 700), titleH = w < 640 ? 210 : Math.min(h*.34, 310);
  const left = (w-titleW)/2, right = left+titleW, top = h*.46-titleH/2, bottom = top+titleH;
  if (b.x < left-b.r || b.x > right+b.r || b.y < top-b.r || b.y > bottom+b.r) return;
  const exits = [
    { d:Math.abs(b.x-(left-b.r)), x:left-b.r, y:b.y, axis:'x' },
    { d:Math.abs(b.x-(right+b.r)), x:right+b.r, y:b.y, axis:'x' },
    { d:Math.abs(b.y-(top-b.r)), x:b.x, y:top-b.r, axis:'y' },
    { d:Math.abs(b.y-(bottom+b.r)), x:b.x, y:bottom+b.r, axis:'y' }
  ];
  const exit = exits.reduce((closest, option) => option.d < closest.d ? option : closest);
  b.x = exit.x; b.y = exit.y;
  if (exit.axis === 'x') b.vx *= -bounce; else b.vy *= -bounce;
}
function tick(now = performance.now()) {
  const {w,h}=dimensions();
  if (!floating && now - launchedAt > 2800) {
    floating = true;
    bodies.forEach(b => { b.vx = (Math.sin(b.float)*.5); b.vy = -Math.abs(Math.cos(b.float)*.45); });
  }
  bodies.forEach(b=>{
    if(!b.held){
      // First they fall and collect at the base; then each pillow gets a buoyant drift.
      if (floating) {
        b.vx += Math.cos(now*.00048+b.float)*.004;
        b.vy += Math.sin(now*.00062+b.float)*.004;
      } else b.vy += dropGravity;
      b.vx*=air; b.vy*=air; b.x+=b.vx; b.y+=b.vy; b.a+=b.va; b.va*=.86; b.a=Math.max(-.16,Math.min(.16,b.a));
      if(b.x-b.r<0){b.x=b.r;b.vx=Math.abs(b.vx)*bounce;} if(b.x+b.r>w){b.x=w-b.r;b.vx=-Math.abs(b.vx)*bounce;}
      if(b.y-b.r<0){b.y=b.r;b.vy=Math.abs(b.vy)*(floating?bounce:.35);} if(b.y+b.r>h){b.y=h-b.r;b.vy=-Math.abs(b.vy)*(floating?bounce:.28);b.va+=b.vx*.00015;}
    }
  });
  for(let i=0;i<bodies.length;i++) for(let j=i+1;j<bodies.length;j++) collide(bodies[i],bodies[j]);
  if (floating) bodies.forEach(b => { if (!b.held) avoidTitle(b, w, h); });
  bodies.forEach(paint); frame=requestAnimationFrame(tick);
}
function locate(x,y){ return [...bodies].reverse().find(b=>Math.hypot(b.x-x,b.y-y)<b.r); }
stage.addEventListener('pointerdown', e=>{ const b=locate(e.clientX,e.clientY); if(!b)return; active=b; last={x:e.clientX,y:e.clientY,t:performance.now()}; b.held=true;b.el.style.zIndex=99;stage.setPointerCapture(e.pointerId); });
function moveActive(e) {
  if (!active) return;
  const now = performance.now(), dt = Math.max(6, now-last.t);
  const nextVX = (e.clientX-last.x)/dt*15, nextVY = (e.clientY-last.y)/dt*15;
  // Blend velocity samples: instant pointer response, but a stable throw on release.
  active.vx = active.vx*.45 + nextVX*.55; active.vy = active.vy*.45 + nextVY*.55;
  active.x=e.clientX; active.y=e.clientY;
  active.a=Math.max(-.16,Math.min(.16,active.a+active.vx*.0015));
  paint(active); // do not wait for the next animation frame while the user is holding it
  last={x:e.clientX,y:e.clientY,t:now};
}
stage.addEventListener('pointermove', e=>{
  const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  moveActive(events[events.length-1]);
});
function release(){if(!active)return;active.held=false;active.el.style.zIndex='';active=null;} stage.addEventListener('pointerup',release);stage.addEventListener('pointercancel',release);
reset.addEventListener('click',makePillows); window.addEventListener('resize',()=>{const {w,h}=dimensions();bodies.forEach(b=>{b.x=Math.min(w-b.r,Math.max(b.r,b.x));b.y=Math.min(h-b.r,Math.max(b.r,b.y));});});
makePillows(); tick(performance.now());
