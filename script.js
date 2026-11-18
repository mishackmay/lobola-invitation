/* ---------- Elements ---------- */
const envelope = document.getElementById('envelope');
const hint = document.getElementById('hint');
const song = document.getElementById('song');
const musicToggle = document.getElementById('musicToggle');

/* ---------- Envelope open ---------- */
envelope.addEventListener('click', () => {
  if (envelope.classList.contains('open')) return;
  envelope.classList.add('open');

  hint.style.opacity = 0;
  setTimeout(() => {
    hint.textContent = 'Scroll down \u2193';
    hint.style.opacity = 1;
  }, 2500);

  // Start the song; if the browser blocks it, show the "muted" icon
  song.play().catch(() => {
    musicToggle.classList.add('muted');
    musicToggle.setAttribute('aria-label', 'Play music');
  });
  musicToggle.hidden = false;
});

/* ---------- Music toggle ---------- */
musicToggle.addEventListener('click', () => {
  if (song.paused) {
    song.play().catch(() => {});
    musicToggle.classList.remove('muted');
    musicToggle.setAttribute('aria-label', 'Mute music');
  } else {
    song.pause();
    musicToggle.classList.add('muted');
    musicToggle.setAttribute('aria-label', 'Play music');
  }
});

/* ---------- Countdown (22 December 2026, 10:00 SAST) ---------- */
const target = new Date('2026-12-22T10:00:00+02:00');
let timerId;

function tick() {
  const diff = Math.max(0, target - new Date());

  if (diff === 0) {
    document.querySelector('.countdown h2').textContent = 'Today is the day';
    document.querySelector('.timer').style.display = 'none';
    clearInterval(timerId);
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
timerId = setInterval(tick, 1000);

/* ---------- Fade-up on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document
  .querySelectorAll('.countdown, .couple, .verse, .details, .dress, .contacts, .rsvp')
  .forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
  