
// Simple API fetch demo (AJAX)
const url = 'https://labs.bible.org/api/?passage=random&type=json';

async function fetchRandomVerse() {
  const res = await fetch(url);
  const data = await res.json();
  const verse = data[0]; // first element
  console.log(`${verse.bookname} ${verse.chapter}:${verse.verse} - ${verse.text}`);
}

fetchRandomVerse();
