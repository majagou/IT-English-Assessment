//Examples for tests
//let article = "This is the first part ChatGPT. This is the second part Machine Learning. This is the third part Tech. This is the fourth part Chatbot. This is the fifth part AI. This is the sixth part.";
//let keyWords = ["ChatGPT", "Machine", "Tech", "Chatbot", "AI"];

const articles = Array.from(document.getElementsByClassName("article"));
const scoreText = document.getElementById("score");
const audioDiv = document.getElementById("listen-audio");

let article = "";
let keyWords =[];
let currentQuestion = {};
let score = 0;
let availableQuestions = [];

//Fetch the file and prepare the question list
fetch("listen.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    setupFillInTheBlanks();
  })
  .catch((err) => {
    console.error(err);
  });

//Main function to start and set up avialable questions
setupFillInTheBlanks = () => {
  availableQuestions = [...questions];

  getNewQuestion();
};

//Ramdonly choose a article and set up the blanks and answers
getNewQuestion = () => {
  let audioHTML = "";

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  article = currentQuestion.article;
  keyWords = currentQuestion.keyWords;
  const radio = currentQuestion.audio;
  audioHTML += `<audio controls><source src="audio/${radio}.mp3" type="audio/mpeg"></audio>`;
  audioDiv.innerHTML = audioHTML;

  const segments = cutArticleWithKeywords(article, keyWords);

  articles.forEach((article) => {
    const number = article.dataset["number"];
    article.innerText = segments[number - 1];
  });
}

// Convert the article to lowercase to make the search case-insensitive
// Iterate through the article to find occurrences of keywords
// If the keyword is found, slice the article from the start position to the keyword position
// and update the start position for the next iteration
function cutArticleWithKeywords(article, keywords) {

  const articleLower = article.toLowerCase();
  const cutSegments = [];

  let startPos = 0;

  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase();
    const keywordPos = articleLower.indexOf(keywordLower, startPos);

    if (keywordPos !== -1) {
      cutSegments.push(article.substring(startPos, keywordPos).trim());
      // Update start position to exclude the keyword
      startPos = keywordPos + keyword.length; 
    }
  }

  cutSegments.push(article.substring(startPos).trim());

  return cutSegments;
}

//Jump to to next test page and pass the score
function goToNextPage() {
  window.location.href = `match.html?score=${score}`;
}

//Check if each answer is correct
//Ruturn all the rusults and insert the rusult HTML
//Disappear the submit button and show the next page button to continue the test
function checkAnswers() {
  const blanks = document.querySelectorAll(".blank");
  const resultsDiv = document.getElementById("results");

  let resultsHTML = "";

  blanks.forEach((blank) => {
    const userAnswer = blank.value.trim().toLowerCase();
    const blankNumber = blank.dataset.number;
    const correctAnswer = keyWords[blankNumber - 1];

    if (userAnswer === correctAnswer.toLowerCase()) {
      score += 10;
      resultsHTML += `<h4 class="correct">Question ${blankNumber}: Correct!</h4>`;
    } else {
      resultsHTML += `<h4 class="incorrect">Question ${blankNumber}: Incorrect. The correct answer is "${correctAnswer}".</h4>`;
    }
    window.localStorage.setItem("listnings",score);
  });

  resultsHTML = `${resultsHTML}`;
  scoreText.innerText = score;
  resultsDiv.innerHTML = resultsHTML;

  const submitButton = document.getElementById("submitButton");
  const nextPageButton = document.getElementById("nextPageButton");
  submitButton.style.display = "none";
  nextPageButton.style.display = "block";
}
