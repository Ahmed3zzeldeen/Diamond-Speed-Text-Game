// Array Of Words

const words = [
    "Hello",
    "Code",
    "Town",
    "Github",
    "Country",
    "Testing",
    "Programing",
    "Javascript",
    "Youtube",
    "Linkedin",
    "Leetcode",
];

// Setting Levels
const lvls = {
    "Easy": 5,
    "Normal": 4,
    "Hard": 3 
};

// Default Level
let defaultLevelName ="Normal"; //Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".massage .lvl");
let secondsSpan = document.querySelector(".massage .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let game = document.querySelector(".game");
let finish = document.querySelector(".finish");
let finishMassageResult = document.querySelector(".finish p .result");
let finishMassageGot = document.querySelector(".finish p .got");
let finishMassageTotal = document.querySelector(".finish p .total");
let finishMassageCon = document.querySelector(".finish p .con-mss");


// Setting Level Name + Seconds + Score

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event 
input.onpaste = function () {
    return false;
}

// Start Game 
startButton.onclick = function () {
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
                input.value = ""
                // Increase Score
                scoreGot.innerHTML++;
                if (words.length > 0 ){
                    // Call Generate Word Function
                    genWords();
                }
                else {
                let span = document.createElement("span");
                span.className = "good";
                let spanText = document.createTextNode("Congratulations 💙💥");
                span.appendChild(spanText);
                finishMassageResult.appendChild(span);
                let span2 = document.createElement("span");
                let spanText2 = document.createTextNode("Fast. Try Again To More Win");
                span2.appendChild(spanText2);
                finishMassageCon.appendChild(span2);
                finishMassageGot.innerHTML = scoreGot.innerHTML;
                finishMassageTotal.innerHTML = scoreTotal.innerHTML;
                finish.style = "display:flex;";
                game.style = "opacity: 0.3;";
                }
            } else {
                if (scoreGot.innerHTML === "0") {
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Opps ..");
                span.appendChild(spanText);
                finishMassageResult.appendChild(span);
                let span2 = document.createElement("span");
                let spanText2 = document.createTextNode("Slow. Pls Try Again ");
                span2.appendChild(spanText2);
                finishMassageCon.appendChild(span2);
                finishMassageGot.innerHTML = scoreGot.innerHTML;
                finishMassageTotal.innerHTML = scoreTotal.innerHTML;
                finish.style = "display:flex;";
                game.style = "opacity: 0.3;";
                }

                if (scoreGot.innerHTML > "0") {
                let span = document.createElement("span");
                span.className = "good";
                let spanText = document.createTextNode("Good You Can Improve. ");
                span.appendChild(spanText);
                finishMassageResult.appendChild(span);
                let span2 = document.createElement("span");
                let spanText2 = document.createTextNode("Close .Try Again ");
                span2.appendChild(spanText2);
                finishMassageCon.appendChild(span2);
                finishMassageGot.innerHTML = scoreGot.innerHTML;
                finishMassageTotal.innerHTML = scoreTotal.innerHTML;
                finish.style = "display:flex;";
                game.style = "opacity: 0.3;";
                }
            }
        }
    }, 1000);
}