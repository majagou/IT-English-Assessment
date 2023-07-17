let article = "This is the first part ChatGPT. This is the second part Machine Learning. This is the third part Tech. This is the fourth part Chatbot. This is the fifth part AI. This is the sixth part.";
let keyWords = ["ChatGPT", "Machine", "Tech", "Chatbot", "AI"];

//let article = "";
//let keyWords =["artificial", "development", "Guardian", "information", "conversational"];

function loadFileContent() {
    fetch('article/BEN52-ChatGPT.txt')
        .then(response => response.text())
        .then(data => {
            // Update the article variable with the file content
            article = data;
            // Call the setupFillInTheBlanks function to update the article content in the HTML
            setupFillInTheBlanks();
        })
        .catch(error => {
            console.error('Error reading the file:', error);
        });
}
console.log(article);

function cutArticleWithKeywords(article, keywords) {
  // Convert the article to lowercase to make the search case-insensitive
  const articleLower = article.toLowerCase();

  // Initialize an array to store the cut segments
  const cutSegments = [];

  // Start position for slicing the article
  let startPos = 0;

  // Iterate through the article to find occurrences of keywords
  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase();
    const keywordPos = articleLower.indexOf(keywordLower, startPos);

    // If the keyword is found, slice the article from the start position to the keyword position
    // and update the start position for the next iteration
    if (keywordPos !== -1) {
      cutSegments.push(article.substring(startPos, keywordPos).trim());
      startPos = keywordPos + keyword.length; // Update start position to exclude the keyword
    }
  }

  // After processing all keywords, add the remaining part of the article as the last segment
  cutSegments.push(article.substring(startPos).trim());

  return cutSegments;
}

const segments = cutArticleWithKeywords(article, keyWords);
const articles = Array.from(document.getElementsByClassName("article"));

setupFillInTheBlanks = () => {
    articles.forEach((article) => {
        const number = article.dataset["number"];
        article.innerText = segments[number - 1];
      })
};

function goToNextPage() {
    window.location.href = "match.html";
}

//check if the answers are right
function checkAnswers() {
    const blanks = document.querySelectorAll(".blank");
    const resultsDiv = document.getElementById("results");
    let score = 0;
    let resultsHTML = "";

    blanks.forEach((blank) => {
        const userAnswer = blank.value.trim().toLowerCase();
        const blankNumber = blank.dataset.number;
        const correctAnswer = keyWords[blankNumber - 1];

        if (userAnswer === correctAnswer.toLowerCase()) {
            score += 10;
            resultsHTML += `<p class="correct">Question ${blankNumber}: Correct!</p>`;
        } else {
            resultsHTML += `<p class="incorrect">Question ${blankNumber}: Incorrect. The correct answer is "${correctAnswer}".</p>`;
        }
    });

    resultsHTML = `<h3>Results</h3>${resultsHTML}<p>Your score: ${score} out of ${blanks.length * 10}</p>`;
    resultsDiv.innerHTML = resultsHTML;
    
    const submitButton = document.getElementById("submitButton");
    const nextPageButton = document.getElementById("nextPageButton");
    submitButton.style.display = "none";
    nextPageButton.style.display = "block";
}

setupFillInTheBlanks();