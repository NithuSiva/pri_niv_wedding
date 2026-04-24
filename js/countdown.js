const religieux = new Date('2026-07-02T13:00:00');

function tickReligieux() {
  const diff = religieux - new Date();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('ct-h1-days').textContent  = String(d).padStart(2,'0');
  document.getElementById('ct-h1-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('ct-h1-mins').textContent  = String(m).padStart(2,'0');
  document.getElementById('ct-h1-secs').textContent  = String(s).padStart(2,'0');
}

tickReligieux();
setInterval(tickReligieux, 1000);  


const reception = new Date('2026-07-04T13:00:00');

function tickReception() {
  const diff = reception - new Date();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('ct-rcp-h1-days').textContent  = String(d).padStart(2,'0');
  document.getElementById('ct-rcp-h1-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('ct-rcp-h1-mins').textContent  = String(m).padStart(2,'0');
  document.getElementById('ct-rcp-h1-secs').textContent  = String(s).padStart(2,'0');
}

tickReception();
setInterval(tickReception, 1000);  