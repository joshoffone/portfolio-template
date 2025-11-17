// foodFactFree.js

// Open Trivia DB endpoint with category=Food & Drink (category id = 18) :contentReference[oaicite:1]{index=1}
const TRIVIA_URL = 'https://opentdb.com/api.php?amount=1&category=18&type=multiple';

async function fetchFoodFact() {
  try {
    const response = await fetch(TRIVIA_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.response_code !== 0 || !data.results.length) {
      return { question: "No fact found", answer: "" };
    }
    const result = data.results[0];
    // Trivia API returns HTML encoded characters, so decode them
    const question = decodeHtml(result.question);
    const correct = decodeHtml(result.correct_answer);
    const incorrect = result.incorrect_answers.map(ans => decodeHtml(ans));

    // We can optionally show all answers or just the correct one
    return { question, answer: correct, incorrect };
  } catch (err) {
    console.error('Error fetching food fact:', err);
    return { question: "Error fetching fact", answer: "" };
  }
}

// Utility to decode HTML entities from API
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Example usage: hook into page
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('foodFactBtn');
  const questionElem = document.getElementById('foodFactQuestion');
  const answerElem = document.getElementById('foodFactAnswer');

  if (!btn || !questionElem || !answerElem) {
    console.warn("Could not find UI elements for food fact.");
    return;
  }

  btn.addEventListener('click', async () => {
    questionElem.textContent = 'Loading...';
    answerElem.textContent = '';
    const fact = await fetchFoodFact();
    questionElem.textContent = fact.question;
    answerElem.textContent = `Answer: ${fact.answer}`;
  });
});
Example HTML to Use With It
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Random Food Trivia</title>
</head>
<body>
  <h1>Random Food Trivia</h1>
  <p id="foodFactQuestion">Click the button for a food question!</p>
  <p id="foodFactAnswer"></p>
  <button id="foodFactBtn">Get Food Trivia</button>

  <script src="foodFactFree.js"></script>
</body>
</html>
