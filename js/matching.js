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

// Handle the image click event
function handleImageClick() {
  if (
    selectedWord &&
    this.getAttribute("data-word") === selectedWord.getAttribute("data-word")
  ) {
    // Both the image and the word disappear
    this.style.display = "none";
    selectedWord.style.display = "none";
    selectedImage = null;
    selectedWord = null;
    matchedCount++;
    score += 10;

    // Update score display
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;

    // check if all images and words are matched
    if (matchedCount === selectedImages.length) {
      // Jump to the next page
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

// handle word click event
function handleWordClick() {
  if (
    selectedImage &&
    this.getAttribute("data-word") === selectedImage.getAttribute("data-word")
  ) {
    // Both the image and the word disappear
    selectedImage.style.display = "none";
    this.style.display = "none";
    selectedImage = null;
    selectedWord = null;
    matchedCount++;
    score += 10;

    // Update score display
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;

    // check if all images and words are matched
    if (matchedCount === selectedImages.length) {
      // Jump to the next page
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
// Update the score display after accumulating the score
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
  }, 1500);
}

// clean error message
function clearError() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "";
  //errorMessage.style.display = "none";
  errorShown = false;
}

// Initialize the page
window.onload = function () {
  // Get the container elements of pictures and words
  const imageContainer = document.querySelector(".image-container");
  const wordContainer = document.querySelector(".word-container");

  // Remove all images and words from the containers
  imageContainer.innerHTML = "";
  wordContainer.innerHTML = "";

  // Append the selected images and words to the containers
  selectedImages.forEach((image) => {
    imageContainer.appendChild(image);
  });

  selectedWords.forEach((word) => {
    wordContainer.appendChild(word);
  });
};

// Timer countdown
let remainingTime = 60; // 1 minute

const timerElement = document.getElementById("timer");
timerElement.textContent = remainingTime;

const timerInterval = setInterval(() => {
  remainingTime--;
  timerElement.textContent = remainingTime;

  if (remainingTime <= 0) {
    clearInterval(timerInterval);

    // Jump to the next page and pass the score
    window.location.href = `singleSelection.html?score=${score}`;
  }
}, 1000);
