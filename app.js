let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

function choiceToWord(choise) {
    if(choise == 1) return 'Rock';
    if(choise == 2) return 'Paper';
    return 'Scissors';
}

function win(userChoice, contractChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${choiceToWord(userChoice)} beats ${choiceToWord(contractChoice)}. You win!`;
}

function lose(userChoice, contractChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${choiceToWord(userChoice)} loses to ${choiceToWord(contractChoice)}. You lost...`;
}

function draw(userChoice, contractChoice) {
    result_p.innerHTML = `${choiceToWord(userChoice)} equals to ${choiceToWord(contractChoice)}. It's a draw`;
}

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const options = {value: ethers.utils.parseEther("0.0000000000000001")}

async function play(option) {
    result_p.innerHTML = "Wait transaction pending!"
    const play = contract.play(option, options)
}

async function main(){
    await init()
    rock_div.addEventListener('click', function(){
        play(ROCK);
    })

    paper_div.addEventListener('click', function(){
        play(PAPER);
    })

    scissors_div.addEventListener('click', function(){
        play(SCISSORS);
    })

    contract.on("Lose", (userChoice, contractChoice) => {
        lose(userChoice, contractChoice);
        console.log(`Lose ${userChoice} ${contractChoice}`);
    });
    
    contract.on("Win", (userChoice, contractChoice) => {
        win(userChoice, contractChoice);
        console.log(`Win ${userChoice} ${contractChoice}`);
    });

    contract.on("Draw", (userChoice, contractChoice) => {
        draw(userChoice, contractChoice);
        console.log(`Draw ${userChoice} ${contractChoice}`);
    });
    console.log("Here");
}

main();