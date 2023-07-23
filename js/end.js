const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

//Disable the save score button until the username is filled
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();
  var username=document.getElementById("username").value;
  if(username){
    window.localStorage.setItem("bl",true);
    window.localStorage.setItem("username",username);
    window.location.href = `chart.html`;
  }else{
    alert("username cannot be empty!");
  }
};
