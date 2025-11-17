const quoteEl = document.getElementById('quote');
const url = 'https://labs.bible.org/api/?passage=random&type=json';

async function fetchVerse() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const verse = data[0];
    quoteEl.textContent = `${verse.bookname} ${verse.chapter}:${verse.verse} - ${verse.text}`;
  } catch (err) {
    console.error(err);
    quoteEl.textContent = "Could not fetch verse.";
  }
}

// Fetch verse on page load
fetchVerse();
