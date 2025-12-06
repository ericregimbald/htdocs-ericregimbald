let films = [];

async function loadFilms() {
  try {
    const response = await fetch('/assets/data/films.json');
    if (!response.ok) {
      throw new Error('Failed to load films.json: ' + response.status);
    }
    films = await response.json();
    renderFilms(films);
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFilms();

  const sortSelect = document.getElementById('sortSelect');
  sortSelect.addEventListener('change', handleSortChange);
});

function renderFilms(list) {
  const container = document.getElementById('filmsContainer');
  container.innerHTML = '';

  list.forEach(film => {
    const article = document.createElement('article');
    article.className = 'film-entry';

    article.innerHTML = `
      <img src="${film.cover}" alt="${film.title} cover" class="film-cover">

      <div class="film-content">
        <h2 class="film-title">
          <a href="${film.imdbUrl}" target="_blank" rel="noopener noreferrer">
            ${film.title} - by ${film.director}
          </a>
        </h2>

        <p class="film-meta">
          Date watched: ${film.dateRead}. 
          How strongly I recommend it: ${film.rating}/5
        </p>

        <p class="film-notes">
          ${film.notes && film.notes.trim().length > 0
            ? film.notes
            : "No notes yet."}
        </p>

        <p class="film-links">
          <a href="${film.letterboxdUrl}"
             class="notes-link"
             target="_blank"
             rel="noopener noreferrer">
            Read my notes
          </a>,
          or go to the
          <a href="${film.imdbUrl}"
             target="_blank"
             rel="noopener noreferrer">
            IMDB page
          </a>
          for details and reviews.
        </p>
      </div>
    `;

    container.appendChild(article);
  });
}

function handleSortChange(e) {
  const value = e.target.value;

  // copy so we don't mutate the original array
  const sorted = [...films];

  if (value === 'title') {
    // A → Z by title
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (value === 'newest') {
    // YYYY-MM-DD strings can be compared directly; larger = newer
    sorted.sort((a, b) => {
      if (a.dateRead < b.dateRead) return 1;
      if (a.dateRead > b.dateRead) return -1;
      return 0;
    });
  }

  if (value === 'rating') {
    // Highest recommendation first (5 → 1)
    sorted.sort((a, b) => b.rating - a.rating);
  }

  renderFilms(sorted);
}

function updatefilmCount() {
  const countEl = document.getElementById('filmCount');
  if (!countEl) return;

  // You can tweak this if you ever want to exclude some films
  const total = films.length;
  countEl.textContent = total;
}

async function loadFilms() {
  try {
    const response = await fetch('/assets/data/films.json');
    if (!response.ok) {
      throw new Error('Failed to load films.json: ' + response.status);
    }
    films = await response.json();
    updatefilmCount();   // 🔹 new line
    renderFilms(films);
  } catch (err) {
    console.error(err);
  }
}
