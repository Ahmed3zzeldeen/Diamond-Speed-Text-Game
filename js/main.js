// Array Of Words

const words = [
    "Hello",
    "Code",
    "Town",
    "Github",
    "Country",
    "Testing",
    "Programming",
    "Javascript",
    "Youtube",
    "Linkedin",
    "Leetcode",
];
// Array Of Words by Levels



// Setting Levels
const lvls = {
    "Easy": 5,
    "Normal": 4,
    "Hard": 3 
};


// Sound Effects
const shortSuccess = new Audio('./sound-effects/short-success.mp3');
const noLuckTooBad = new Audio('./sound-effects/no-luck-too-bad.mp3');
const longSuccess = new Audio('./sound-effects/success-fanfare.mp3');
const shortNotification = new Audio('./sound-effects/notification-sound.mp3');

// Catch Selectors

let gameName = document.querySelector(".name");
let startButton = document.querySelector(".start");
let selectLevel = document.querySelector("#select-lvl");
let secondsSpan = document.querySelector(".massage .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let container = document.querySelector(".container");
let finish = document.querySelector(".finish");
let finishMassageResult = document.querySelector(".finish p .result");
let finishMassageGot = document.querySelector(".finish p .got");
let finishMassageTotal = document.querySelector(".finish p .total");
let finishMassageCon = document.querySelector(".finish p .con-mss");
let playAgainBtn = document.querySelector(".finish .play-again");



// Default Level
let defaultLevelName = selectLevel.value ; //Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Setting Level Name + Seconds + Score

secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;


selectLevel.addEventListener("change" ,  changeLevel );

function changeLevel  () {
    defaultLevelName = selectLevel.value ;
    defaultLevelSeconds = lvls[defaultLevelName];
    timeLeftSpan.innerHTML = defaultLevelSeconds;    
    secondsSpan.innerHTML = defaultLevelSeconds;
}

// Disable Paste Event 
input.onpaste = function () {
    return false;
}

// Start Game 
startButton.onclick = function startGame() {
    this.remove();
    input.focus();
    // Generate Word Function
    genWords();
}

function genWords() {
    // Get Random Word From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get Word Index
    let wordIndex = words.indexOf(randomWord);
    // Ramove WordFrom Array
    words.splice(wordIndex, 1);
    // Show The Random Word 
    theWord.innerHTML = randomWord;
    // Empty Upcoming Words
    upcomingWords.innerHTML = "";
    // Generate Words 
    for (let i=0; i < words.length ; i++) {
        // Creat Div Element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // Stop Time
            clearInterval(start);
            // Compare Words 
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                //Empty Input Field
                input.value = "";
                // Increase Score
                scoreGot.innerHTML++;
                shortSuccess.play();
                if (words.length > 0 ){
                    // Call Generate Word Function
                    genWords();
                }
                else if (scoreGot.innerHTML == scoreTotal.innerHTML ){
                    let span = document.createElement("span");
                    let spanText = document.createTextNode("Congratulations 💙💥");
                    let span2 = document.createElement("span");
                    let spanText2 = document.createTextNode("Fast. Try Again To More Win");
                    span.className = "good";
                    createEndMass(span , spanText , span2 , spanText2 );
                    playAgainBtn.onclick = function (){
                        location.reload();
                    }
                    shortNotification.play();
                    longSuccess.play();
                }
                else {
                    let span = document.createElement("span");
                    let spanText = document.createTextNode("Good You Can Improve. ");
                    let span2 = document.createElement("span");
                    let spanText2 = document.createTextNode("Close .Try Again ");
                    span.className = "good";
                    createEndMass(span , spanText , span2 , spanText2 );
                    playAgainBtn.onclick = function (){
                        location.reload();
                    }
                    shortNotification.play();
                }
            } else {
                if (scoreGot.innerHTML === "0") {
                    let span = document.createElement("span");
                    let spanText = document.createTextNode("Opps ..");
                    let span2 = document.createElement("span");
                    let spanText2 = document.createTextNode("Slow. Pls Try Again ");
                    span.className = "bad";
                    createEndMass(span , spanText , span2 , spanText2 );
                    noLuckTooBad.play();
                    shortNotification.play();
                }
                if (scoreGot.innerHTML > "0") {
                    let span = document.createElement("span");
                    let spanText = document.createTextNode("Good You Can Improve. ");
                    let span2 = document.createElement("span");
                    let spanText2 = document.createTextNode("Close .Try Again ");
                    span.className = "good";
                    createEndMass(span , spanText , span2 , spanText2 );
                }
                shortNotification.play();
            }
        }


}, 1000);
}

function createEndMass(span , spanText , span2 , spanText2 ) {
    span.appendChild(spanText);
    finishMassageResult.appendChild(span);
    span2.appendChild(spanText2);
    finishMassageCon.appendChild(span2);
    finishMassageGot.innerHTML = scoreGot.innerHTML;
    finishMassageTotal.innerHTML = scoreTotal.innerHTML;
    finish.style = "display:flex;";
    container.style = gameName.style ="opacity: 0.3;";
    //  "opacity: 0.3;";?
}

playAgainBtn.onclick = function (){
    finish.style = "display:none;";
    container.style = gameName.style ="opacity: 1;";    
    // empty finishMassage
    finishMassageResult.innerHTML = "";
    finishMassageCon.innerHTML = "";
    //Empty Input Field
    input.value = "";
    // Start again
    input.focus();
    // Generate Word Function
    genWords();
}