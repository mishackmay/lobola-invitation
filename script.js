const envelope = document.getElementById('envelope');
const hint = document.getElementById('hint');
const song = document.getElementById('song');

envelope.addEventListener('click', () => {
  if (envelope.classList.contains('open')) return;
  envelope.classList.add('open');
  hint.style.opacity = 0;
  setTimeout(() => {
    hint.textContent = 'Scroll down ↓';
    hint.style.opacity = 1;
  }, 2500);
  song.play().catch(() => {});
});

const target = new Date('2026-12-22T10:00:00+02:00');
function tick() {
  let diff = Math.max(0, target - new Date());
  if (diff === 0) {
  document.querySelector('.countdown h2').textContent = 'Today is the day';
  document.querySelector('.timer').style.display = 'none';
  return;
}
  const s = Math.floor(diff / 1000);
  document.getElementById('weeks').textContent = Math.floor(s / 604800);
  document.getElementById('days').textContent = Math.floor((s % 604800) / 86400);
  document.getElementById('hours').textContent = Math.floor((s % 86400) / 3600);
  document.getElementById('minutes').textContent = Math.floor((s % 3600) / 60);
  document.getElementById('seconds').textContent = s % 60;
}
tick();
setInterval(tick, 1000);
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.countdown, .couple, .details, .dress, .contacts, .rsvp')
  .forEach((el) => { el.classList.add('reveal'); io.observe(el); });