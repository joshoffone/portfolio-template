// foodFact.js
const TRIVIA_URL = 'https://opentdb.com/api.php?amount=1&category=18&type=multiple';

async function fetchFoodFact() {
  try {
    const response = await fetch(TRIVIA_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (data.response_code !== 0 || !data.results.length) {
      return { question: "No fact found", answer: "" };
    }

    const result = data.results[0];

    const question = decodeHtml(result.question);
    const correct = decodeHtml(result.correct_answer);

    return { question, answer: correct };
  } catch (err) {
    console.error('Error fetching food fact:', err);
    return { question: "Error fetching fact", answer: "" };
  }
}

// Decode HTML entities
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Hook into page
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('foodFactBtn');
  const questionElem = document.getElementById('foodFactQuestion');
  const answerElem = document.getElementById('foodFactAnswer');

  async function loadFact() {
    questionElem.textContent = 'Loading...';
    answerElem.textContent = '';
    const fact = await fetchFoodFact();
    questionElem.textContent = fact.question;
    answerElem.textContent = `Answer: ${fact.answer}`;
  }

  // Load a fact on page load
  loadFact();

  // Load a new fact on button click
  btn.addEventListener('click', loadFact);
});

