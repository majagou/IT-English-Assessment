// Select the draggable picture elements
var dragelement01 = document.getElementById("drag-element01");
var dragelement02 = document.getElementById("drag-element02");
var dragelement03 = document.getElementById("drag-element03");
var dragelement04 = document.getElementById("drag-element04");
// Variables to store initial positions and mouse pointer
var initialX1,
  initialY1,
  initialX2,
  initialY2,
  initialX3,
  initialY3,
  initialX4,
  initialY4;
var xOffset1 = 0,
  yOffset1 = 0,
  xOffset2 = 0,
  yOffset2 = 0,
  xOffset3 = 0,
  yOffset3 = 0,
  xOffset4 = 0,
  yOffset4 = 0;

// Event listeners for when dragging starts
dragelement01.addEventListener("mousedown", dragStart, false);
dragelement02.addEventListener("mousedown", dragStart, false);
dragelement03.addEventListener("mousedown", dragStart, false);
dragelement04.addEventListener("mousedown", dragStart, false);

// Event listener for dragging movement
document.addEventListener("mousemove", drag, false);

// Event listener for when dragging ends
document.addEventListener("mouseup", dragEnd, false);

// Function to handle dragging start
function dragStart(event) {
  if (event.target === dragelement01) {
    initialX1 = event.clientX - xOffset1;
    initialY1 = event.clientY - yOffset1;
  } else if (event.target === dragelement02) {
    initialX2 = event.clientX - xOffset2;
    initialY2 = event.clientY - yOffset2;
  } else if (event.target === dragelement03) {
    initialX3 = event.clientX - xOffset3;
    initialY3 = event.clientY - yOffset3;
  } else if (event.target === dragelement04) {
    initialX4 = event.clientX - xOffset4;
    initialY4 = event.clientY - yOffset4;
  }
}

// Function to handle dragging movement
function drag(event) {
  if (initialX1 && initialY1) {
    xOffset1 = event.clientX - initialX1;
    yOffset1 = event.clientY - initialY1;
    dragelement01.style.transform =
      "translate(" + xOffset1 + "px, " + yOffset1 + "px)";
  }
  if (initialX2 && initialY2) {
    xOffset2 = event.clientX - initialX2;
    yOffset2 = event.clientY - initialY2;
    dragelement02.style.transform =
      "translate(" + xOffset2 + "px, " + yOffset2 + "px)";
  }
  if (initialX3 && initialY3) {
    xOffset3 = event.clientX - initialX3;
    yOffset3 = event.clientY - initialY3;
    dragelement03.style.transform =
      "translate(" + xOffset3 + "px, " + yOffset3 + "px)";
  }
  if (initialX4 && initialY4) {
    xOffset4 = event.clientX - initialX4;
    yOffset4 = event.clientY - initialY4;
    dragelement04.style.transform =
      "translate(" + xOffset4 + "px, " + yOffset4 + "px)";
  }
}

// Function to handle dragging end
function dragEnd() {
  initialX1 = null;
  initialY1 = null;
  initialX2 = null;
  initialY2 = null;
  initialX3 = null;
  initialY3 = null;
  initialX4 = null;
  initialY4 = null;
}
