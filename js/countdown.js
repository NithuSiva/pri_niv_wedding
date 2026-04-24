const hinduWeddingDate = new Date('2026-07-02T13:00:00');
const receptionDate = new Date('2026-07-04T18:00:00');

function updateHinduCountdown() {
  const now = new Date();
  const diff = hinduWeddingDate - now;
  
  if (diff <= 0) {
      document.getElementById('countdown-hindu-days').textContent = '00';
      document.getElementById('countdown-hindu-hours').textContent = '00';
      document.getElementById('countdown-hindu-mins').textContent = '00';
      document.getElementById('countdown-hindu-secs').textContent = '00';
      return;
  }
  
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  
  document.getElementById('countdown-hindu-days').textContent = String(days).padStart(2, '0');
  document.getElementById('countdown-hindu-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('countdown-hindu-mins').textContent = String(minutes).padStart(2, '0');
  document.getElementById('countdown-hindu-secs').textContent = String(seconds).padStart(2, '0');
}

function updateReceptionCountdown() {
  const now = new Date();
  const diff = receptionDate - now;
  
  if (diff <= 0) {
      document.getElementById('countdown-rcp-days').textContent = '00';
      document.getElementById('countdown-rcp-hours').textContent = '00';
      document.getElementById('countdown-rcp-mins').textContent = '00';
      document.getElementById('countdown-rcp-secs').textContent = '00';
      return;
  }
  
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  
  document.getElementById('countdown-rcp-days').textContent = String(days).padStart(2, '0');
  document.getElementById('countdown-rcp-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('countdown-rcp-mins').textContent = String(minutes).padStart(2, '0');
  document.getElementById('countdown-rcp-secs').textContent = String(seconds).padStart(2, '0');
}

updateHinduCountdown();
updateReceptionCountdown();
setInterval(updateHinduCountdown, 1000);
setInterval(updateReceptionCountdown, 1000);

window.updateHinduCountdown = updateHinduCountdown;
window.updateReceptionCountdown = updateReceptionCountdown;