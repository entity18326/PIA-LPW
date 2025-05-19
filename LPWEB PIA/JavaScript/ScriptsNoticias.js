const container = document.getElementById('container');
const loader = document.getElementById('loader');

let itemCount = 0;
const itemsPerLoad = 10;
let isLoading = false;

function createItem(index) {
  const div = document.createElement('div');
  div.className = 'item';
  div.textContent = `Elemento #${index + 1}`;
  return div;
}

function loadItems() {
  if (isLoading) return;
  isLoading = true;
  loader.style.display = 'block';

  setTimeout(() => {
    for (let i = 0; i < itemsPerLoad; i++) {
      container.appendChild(createItem(itemCount++));
    }
    isLoading = false;
    loader.style.display = 'none';
  }, 1000); // Simula tiempo de carga
}

// Detecta cuando se llega al final de la página
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadItems();
  }
});

// Carga inicial
loadItems();