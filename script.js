const playerChoices = document.querySelectorAll('.player-choice');
const computerThrow = document.getElementById('computer-throw');
const outcomeMessage = document.getElementById('outcome-message');
const resetBtn = document.getElementById('reset-btn');

let computerInterval;
let computerChoice = '';
let playerChoice = '';
let index = 0;
let elapsedTime = 0;

const choices = ['rock', 'paper', 'scissors'];
const choiceImages = { // choice img obj
    rock: 'img/rock.PNG',       
    paper: 'img/paper.PNG',      
    scissors: 'img/scissors.PNG',   
    question: 'img/question-mark.PNG'    
};

// Reset game
resetBtn.addEventListener('click', resetGame);

// Add event listeners to player choices
playerChoices.forEach(choice => {
    choice.addEventListener('click', handlePlayerClick);
});


// Highlight player choice
function handlePlayerClick(event) {
    if (computerInterval) return; // prevent clicking during computer shuffle would mess things up. null pointers ret false 

    playerChoice = event.currentTarget.dataset.choice; //data field of html element assigned to playerChoice

    
    playerChoices.forEach(i => i.classList.remove('selected'));
    event.currentTarget.classList.add('selected');// Highlight selected

    // Start computer thinking
    startComputerThrow();
}

function startComputerThrow() {
    index = 0; //reset index and time from previous games
    elapsedTime = 0;

    // Start interval
    computerInterval = setInterval(cycleComputerChoices, 500);
}

function cycleComputerChoices() {
    // Display the current choice
    computerThrow.src = choiceImages[choices[index]];

    //previously randomly cycled then randomly but instances of multiple of the same choice in a row was confusing
    index = (index + 1) % choices.length; 
    elapsedTime += 500;

    // Stop after 3 seconds
    if (elapsedTime >= 3000) {
        clearInterval(computerInterval);
        computerInterval = null; //allow for new clicks

        pickFinalComputerChoice();
    }
}

function pickFinalComputerChoice() {
    computerChoice = choices[Math.floor(Math.random() * 3)]; //randomly pick final choice
    computerThrow.src = choiceImages[computerChoice];

    determineWinner();
}

function determineWinner() {
    if (playerChoice === computerChoice) {
        outcomeMessage.textContent = "It's a Tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        outcomeMessage.textContent = "You Win!";
    } else {
        outcomeMessage.textContent = "Computer Wins!";
    }
}

function resetGame() {
    playerChoice = '';
    computerChoice = '';
    index = 0;
    elapsedTime = 0;
    playerChoices.forEach(i => i.classList.remove('selected'));
    computerThrow.src = choiceImages.question;
    outcomeMessage.textContent = "Make your throw!";
}


