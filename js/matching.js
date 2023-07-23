// Get the elements of all pictures and words
const images = Array.from(document.querySelectorAll(".image"));
const words = Array.from(document.querySelectorAll(".word"));

// Get the score from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const scoreFromPreviousPage = parseInt(urlParams.get("score"));

// Create an array to store the indices of selected pairs
const selectedIndices = [];

// Randomly select four pairs of indices
while (selectedIndices.length < 4) {
  const randomIndex = Math.floor(Math.random() * images.length);
  if (!selectedIndices.includes(randomIndex)) {
    selectedIndices.push(randomIndex);
  }
}

// Get the selected images and words using the selected indices
const selectedImages = selectedIndices.map((index) => images[index]);
const selectedWords = selectedIndices.map((index) => words[index]);

// Record the currently selected picture and word
let selectedImage = null;
let selectedWord = null;

// Add click event handlers for each image and word
selectedImages.forEach((image) => {
  image.addEventListener("click", handleImageClick);
});

selectedWords.forEach((word) => {
  word.addEventListener("click", handleWordClick);
});

let matchedCount = 0; // record the number of matched pairs
let errorShown = false; // Record whether the error message has been displayed

let score = 0;

// Update the score display with the score from the previous page
const scoreElement = document.getElementById("score");
scoreElement.textContent = scoreFromPreviousPage;

// Accumulate the score from the previous page
score += scoreFromPreviousPage;

// handle image click event and disappear,update score and check matching
function handleImageClick() {
  if (
    selectedWord &&
    this.getAttribute("data-word") === selectedWord.getAttribute("data-word")
  ) {
    this.style.display = "none";
    selectedWord.style.display = "none";
    selectedImage = null;
    selectedWord = null;
    matchedCount++;
    score += 10;

    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;

    if (matchedCount === selectedImages.length) {
      setItemMatchings();
      window.location.href = `singleSelection.html?score=${score}`;
    }
  } else {
    selectedImage = this;
    if (selectedWord) {
      showError("Incorrect match!");
    } else {
      clearError();
    }
  }
}

// handle word click event and disappear,update score and check matching
function handleWordClick() {
  if (
    selectedImage &&
    this.getAttribute("data-word") === selectedImage.getAttribute("data-word")
  ) {
    selectedImage.style.display = "none";
    this.style.display = "none";
    selectedImage = null;
    selectedWord = null;
    matchedCount++;
    score += 10;

    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;

    if (matchedCount === selectedImages.length) {
      setItemMatchings();
      window.location.href = `singleSelection.html?score=${score}`;
    }
  } else {
    selectedWord = this;
    if (selectedImage) {
      showError("Incorrect match!");
    } else {
      clearError();
    }
  }
}

scoreElement.textContent = score;

// show error message
function showError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  errorShown = true;

  // clean error message
  setTimeout(() => {
    errorMessage.textContent = "";
    //errorMessage.style.display = "none";
    errorShown = false;
  }, 2000);
}

// clean error message
function clearError() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "";
  //errorMessage.style.display = "none";
  errorShown = false;
}

// Initialize the page,remove or append imgs and words
window.onload = function () {
  const imageContainer = document.querySelector(".image-container");
  const wordContainer = document.querySelector(".word-container");

  imageContainer.innerHTML = "";
  wordContainer.innerHTML = "";

  selectedImages.forEach((image) => {
    imageContainer.appendChild(image);
  });

  selectedWords.forEach((word) => {
    wordContainer.appendChild(word);
  });
};

// Timer countdown for 1 min
let remainingTime = 60;

const timerElement = document.getElementById("timer");
timerElement.textContent = remainingTime;

const timerInterval = setInterval(() => {
  remainingTime--;
  timerElement.textContent = remainingTime;

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    setItemMatchings();
    window.location.href = `singleSelection.html?score=${score}`;
  }
}, 1000);

function setItemMatchings(){
  var listnings=window.localStorage.getItem("listnings");
  var matchings=score*1-listnings*1;
  window.localStorage.setItem("matchings",matchings);
}