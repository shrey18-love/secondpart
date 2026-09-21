const ring = document.querySelector('#ring');
const uploadedPhotos = [
  '2026-08-27 14.17.08.jpg',
  '2026-08-27 14.17.10.jpg',
  '2026-08-27 14.17.13.jpg',
  '2026-08-27 14.17.16.jpg',
  '2026-08-27 14.17.21.jpg',
  '2026-08-27 14.15.50.jpg',
  '2026-08-27 14.16.31.jpg',
  '2026-08-27 14.16.38.jpg',
  '2026-08-27 14.16.41.jpg',
  '2026-08-27 14.16.45.jpg',
  '2026-08-27 14.16.48.jpg',
  '2026-08-27 14.16.51.jpg',
  '2026-08-27 14.16.54.jpg',
  '2026-08-27 14.16.57.jpg',
  '2026-08-27 14.17.00.jpg',
  '2026-08-27 14.17.02.jpg'
];

const memoryTitles = [
  'MEMORY 1 - She Said Yes',
  'MEMORY 2 - First Hug',
  'MEMORY 3 - Kiss',
  'MEMORY 4 - Things She Likes',
  'MEMORY 5 - Uttarayan',
  'MEMORY 6 - Nandi\'s Birthday',
  'MEMORY 7 - My Birthday',
  'MEMORY 8 - Our Date Photos',
  'MEMORY 9 - Emotional Versions',
  'MEMORY 10 - Chats',
  'MEMORY 11 - Puzzle Game',
  'MEMORY 12 - Colour Game',
  'MEMORY 13 - Laser Beam',
  'MEMORY 14 - Heartbeam Speed',
  'MEMORY 15 - Camera Game',
  'MEMORY 16 - Water Ripple Effect'
];

const memoryLinks = [
  '../p1/index.html',
  '../p2/index.html',
  '../p3/index.html',
  '../p4/index.html',
  '../p5/index.html',
  '../p6/index.html',
  '../p7/index.html',
  '../p8/index.html',
  '../p9/index.html',
  '../p10/index.html',
  '../p11/index.html',
  '../p12/index.html',
  '../p13/index.html',
  '../p14/index.html',
  '../p15/index.html',
  '../p16/index.html'
];

const cards = [...ring.querySelectorAll('.card')];
const total = cards.length;
let scrollAngle = 0;
let autoAngle = 0;
let displayedAngle = 0;
let last = performance.now();

cards.forEach((card, index) => {
  const image = card.querySelector('.front img');
  if (image) {
    image.src = `16pic/${uploadedPhotos[index]}`;
    card.style.setProperty('--photo', `url("${image.src}")`);
  }
  const quote = card.querySelector('.rear p');
  if (quote) quote.textContent = memoryTitles[index];
  const link = card.querySelector('.rear a');
  if (link) link.href = memoryLinks[index];

  const inner = document.createElement('div');
  inner.className = 'card-inner';
  while (card.firstChild) inner.appendChild(card.firstChild);
  card.appendChild(inner);
  card.addEventListener('click', (event) => {
    if (!event.target.closest('.rear a')) card.classList.toggle('flipped');
  });
  card.dataset.baseAngle = String((index / total) * 360);
});

function draw(now) {
  const elapsed = Math.min(45, now - last);
  last = now;
  autoAngle += elapsed * .0045;
  displayedAngle += (scrollAngle + autoAngle - displayedAngle) * .07;
  const radius = innerWidth < 700 ? 210 : 450;

  cards.forEach((card, index) => {
    const base = (index / total) * 360;
    const photoAngle = base + displayedAngle;
    const localAngle = photoAngle * Math.PI / 180;
    const depth = (Math.cos(localAngle) + 1) / 2;
    card.style.opacity = String(.27 + depth * .73);
    card.style.filter = `blur(${(1 - depth) * .45}px)`;
    card.style.transform = `rotateY(${photoAngle}deg) translateZ(${radius}px)`;
  });

  ring.style.top = '58%';
  ring.style.transform = 'translate(-50%, -50%) rotateX(-8deg)';
  requestAnimationFrame(draw);
}

addEventListener('wheel', (event) => {
  event.preventDefault();
  scrollAngle += event.deltaY * .12;
}, { passive: false });
requestAnimationFrame(draw);
