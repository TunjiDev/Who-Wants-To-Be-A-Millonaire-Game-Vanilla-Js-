'use strict';
const question = document.getElementById('question');
const options = Array.from(document.getElementsByClassName('options')); //converted to an array to be used/looped through on line 80
const scoreText = document.querySelector('.score');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modalText');
const wrongModalText = document.querySelector('.wrongModalText');
const overlay = document.querySelector('.overlay');
const wrongModal = document.querySelector('.wrongModal');
const wrongOverlay = document.querySelector('.wrongOverlay');
const fiftyFiftyBtn = document.querySelector('.fiftyFifty');
const countDownClock = document.querySelector('.timer');
const call = document.querySelector('.call');
const ask = document.querySelector('.ask');
const audienceModal = document.querySelector('.audienceModal');
const audienceOverlay = document.querySelector('.audienceOverlay');
const walkAway = document.querySelector('.walkaway');
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = []; //Empty array which Would later contain the questions(variable) array (line 14)
let option;
// selecting audio files
const letsPlayAudio = document.getElementById('lets-play');
const easyAudio = document.getElementById('easy');
const wrongAnswerAudio = document.getElementById('wrong-answer');
const correctAnswerAudio = document.getElementById('correct-answer');
const winAudio = document.getElementById('win');
const fiftyfiftyAudio = document.getElementById('fiftyfifty');
let currentTime;
let intervalId;
let timeoutId;
let currentQuestion = {}; //Empty object
let questions = [ //An array containing several objects of questions
    {
        question: 'What does HTML stand for?',
        option1: 'A. Hypertext Markup Language',
        option2: 'B. Hype Texter Make-up Lover',
        option3: 'C. High Too Much Lol',
        option4: 'D. Human Technology Machine Language',
        answer: 1,
    },
    {
        question: 'What does CSS stand for?',
        option1: 'A. Carcass Sewage Stuff',
        option2: 'B. Cascading Style Sheets',
        option3: 'C. Come See Something',
        option4: 'D. Can See Something',
        answer: 2,
    },
    {
        question: 'In programming, What does JS stand for?',
        option1: 'A. Just Server',
        option2: 'B. Jog Server',
        option3: 'C. Javascript',
        option4: 'D. Javasine',
        answer: 3,
    },
    {
        question: 'What are the 3 primary colors?',
        option1: 'A. Orange, Purple, Black',
        option2: 'B. White, Indigo, Cyan',
        option3: 'C. Red, Green, Blue',
        option4: 'D. Red, Yellow, Blue',
        answer: 4,
    },
    {
        question: "Which one of these is NOT an African country?",
        option1: 'A. Nigeria (It\'s this one choose it!)',
        option2: 'B. Ghana',
        option3: 'C. South Africa',
        option4: 'D. United States of America',
        answer: 4,
    },
    {
        question: 'Which one of these is NOT a 13 months series weapon?',
        option1: 'A. The Black March',
        option2: 'B. The Green April',
        option3: 'C. Kranos',
        option4: 'D. The Yellow May',
        answer: 3,
    },
    {
        question: 'What month of the year has only 28 or 29 days?',
        option1: 'A. February',
        option2: 'B. December',
        option3: 'C. September',
        option4: 'D. August',
        answer: 1,
    },
    {
        question: 'How many days make up a year?',
        option1: 'A. 365/366',
        option2: 'B. 400',
        option3: 'C. 465',
        option4: 'D. 465/466',
        answer: 1,
    },
    {
        question: 'In what month of the year is Christmas celebrated?',
        option1: 'A. January',
        option2: 'B. March',
        option3: 'C. December',
        option4: 'D. November',
        answer: 3,
    },
    {
        question: 'What is the largest planet in our Solar System?',
        option1: 'A. Earth',
        option2: 'B. Mercury',
        option3: 'C. Saturn',
        option4: 'D. Jupiter',
        answer: 4,
    },
    {
        question: 'What is the color of the Nigerian flag?',
        option1: 'A. Blue, White, Blue',
        option2: 'B. Blood-stained red',
        option3: 'C. Green, White, Green',
        option4: 'D. Purple and White',
        answer: 3,
    },
    {
        question: 'Who is the President of Nigeria?',
        option1: 'A. Mohammadu Buhari',
        option2: 'B. Yemi Osinbajo',
        option3: 'C. Yaradua',
        option4: 'D. Olusegun Obasanjo',
        answer: 1,
    },
    {
        question: 'How many continents are there on planet earth?',
        option1: 'A. 5',
        option2: 'B. 6',
        option3: 'C. 7',
        option4: 'D. 8',
        answer: 3,
    },
    {
        question: 'What\'s the name of the primary protagonist of the seasonal movie "The 100"?',
        option1: 'A. Clark',
        option2: 'B. Bellamy',
        option3: 'C. Jaha',
        option4: 'D. Murphy',
        answer: 1,
    },
    {
        question: 'Which one of these animals is a reptile?',
        option1: 'A. Dog',
        option2: 'B. Snake',
        option3: 'C. Shark',
        option4: 'D. Chicken',
        answer: 2,
    },
    {
        question: 'Which one of these girls is BEST GIRL?',
        option1: 'A. Rachel(lol)',
        option2: 'B. Xia xia',
        option3: 'C. Goseng',
        option4: 'D. Yuri Jahad',
        answer: 4,
    },
    {
        question: 'What is Tunji\'s favorite Webtoon?',
        option1: 'A. The God of Highschool',
        option2: 'B. Unordinary',
        option3: 'C. Kubera - One Last God -',
        option4: 'D. Tower of God',
        answer: 4,
    },
];

//some constants
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10; //MAXIMUM NUMBER OF QUESTIONS TO BE DISPLAYED

//Some Functions
function toggleModal() {
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}
function toggleAudienceModal() {
    audienceModal.classList.toggle('hidden');
    audienceOverlay.classList.toggle('hidden');
 }
const startTimerMusic = () => {
        timer();
	// start audio
	letsPlayAudio.play();
	letsPlayAudio.volume = 1.0;
	timeoutId = setTimeout(() => {
		easyAudio.play();
		easyAudio.volume = 1.0;
	}, 4000);
};
const stopTimerMusic = () => {
	clearTimeout(timeoutId);
	clearInterval(intervalId);
	letsPlayAudio.pause();
	letsPlayAudio.currentTime = 0;
	easyAudio.pause();
	easyAudio.currentTime = 0;
	wrongAnswerAudio.pause();
	wrongAnswerAudio.currentTime = 0;
	correctAnswerAudio.pause();
	correctAnswerAudio.currentTime = 0;
};
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('win.html');
    }
    //Stops the timer
    clearTimeout(timeoutId);
	clearInterval(intervalId);
    startTimerMusic(); //Restarts music on every new question
    countDownClock.style.color = 'white'; //Resets the timer color to white
    questionCounter++; //Increments from 0 to 1 (i.e Question 1)
    const questionIndex = Math.trunc(Math.random() * availableQuestions.length); //generates a random question in the available questions array
    currentQuestion = availableQuestions[questionIndex]; //The empty object variable declared in line 14 is given a value of available questions which is the array of questions
    question.textContent = currentQuestion.question;
        //Iterate through the questions
        options.forEach((option) => {
        const number = option.dataset['number'];
        option.textContent = currentQuestion['option' + number];
    });
    availableQuestions.splice(questionIndex, 1) //this removes the currently asked/used question from the available questions array so the same questions
    // console.log(availableQuestions);            //won't be repeated
    acceptingAnswers = true;
};
const timer = () => {
	currentTime = new Date().getTime();
	intervalId = setInterval(() => {
		const interval = Math.floor(
			(40000 + currentTime - new Date().getTime()) / 1000
		);
		countDownClock.textContent = interval;
		if (interval === 0) {
            //When second count is 0 end the game
            clearInterval(intervalId);
			gameOver('end.html');
		} if (interval === 10) { //Change to timer color to red when its 10 seconds and lower
            countDownClock.style.color = 'red';
        }
		return interval;
	}, 100);
};
function gameOver(endPage) {
    stopTimerMusic();
    wrongAnswerAudio.play();
    wrongAnswerAudio.volume = 1.0;
    setTimeout(() => {
        return window.location.assign(`${endPage}`);
    }, 5000);
}

//1. STARTING THE GAME
const startGame = function() {
    startTimerMusic(); //Starts music and timer
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //stores the questions array into available question using the spread operator(...arr)
    getNewQuestion();
    document.querySelector(`.score-${score}`).classList.add('scoreboarddull'); //Adds a default tomato color to the lowest score
};

//2. CHECKING FOR CORRECT/INCORRECT ANSWERS
//Iterate through the options and add event listeners for each options
options.forEach((option) => {
    option.addEventListener('click', function(e) {
        if (!acceptingAnswers) {
            return;
        }
        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset['number'];
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        //INCREMENTING THE SCORE/MONEY WON
        //CORRECT GUESSES
        if (classToApply === 'correct') {
            toggleModal();
            setTimeout(() => {
                toggleModal();
            }, 5000);
            incrementScore(CORRECT_BONUS);
            //Plays a different music for correct guesses
            stopTimerMusic();
            correctAnswerAudio.play();
            correctAnswerAudio.volume = 1.0;
            //Making the options visible once more after implementation of 50:50
            setTimeout(() => {
                document.querySelector(`[data-number = '1']`).classList.remove('hide');
                document.querySelector(`[data-number ='2']`).classList.remove('hide');
                document.querySelector(`[data-number = '3']`).classList.remove('hide');
                document.querySelector(`[data-number ='4']`).classList.remove('hide');
            }, 3000);
            setTimeout(() => {
                selectedOption.classList.add(classToApply);
                setTimeout(() => {
                    selectedOption.classList.remove(classToApply);
                    getNewQuestion();
                }, 6000);
            }, 1000);
        if (classToApply === 'correct' && score === 10) {
            document.querySelector(`.score-${score}`).classList.add('scoreboard');
            modalText.textContent = 'CONGRATULATIONS YOU HAVE BEAT THE GAME!';
        }
            //WRONG GUESSES
        } else if (classToApply === 'incorrect' && score === 9) {
            selectedOption.classList.add(classToApply);
            toggleModal();
            modalText.textContent =  'WRONG ANSWER! You Won Only ₦1,000,000. You Failed To Beat The Game';
            modalText.style.color = '#dc3545';
            //END THE GAME WHEN THE USER GUESSES WRONG
            gameOver('end.html');
        } else if (classToApply === 'incorrect' && score >= 8) {
            selectedOption.classList.add(classToApply);
            toggleModal();
            modalText.textContent =  'WRONG ANSWER! YOU WON ONLY ₦500,000';
            modalText.style.color = '#dc3545';
            //END THE GAME WHEN THE USER GUESSES WRONG
            gameOver('end.html');
        } else if (classToApply === 'incorrect' && score >= 4) {
            selectedOption.classList.add(classToApply);
            toggleModal();
            modalText.textContent =  'WRONG ANSWER! YOU WON ONLY ₦20,000';
            modalText.style.color = '#dc3545';
            //END THE GAME WHEN THE USER GUESSES WRONG
            gameOver('end.html'); 
        } else if (classToApply === 'incorrect' && score < 4) {
            selectedOption.classList.add(classToApply);
            toggleModal();
            modalText.textContent =  'WRONG ANSWER! YOU WON ONLY ₦0';
            modalText.style.color = '#dc3545';
            //END THE GAME WHEN THE USER GUESSES WRONG
            gameOver('end.html'); 
        } else if (classToApply === 'incorrect') {
            selectedOption.classList.add(classToApply);
            toggleModal();
            modalText.textContent =  'WRONG ANSWER!';
            modalText.style.color = '#dc3545';
            //END THE GAME WHEN THE USER GUESSES WRONG
            gameOver('end.html');
        }
    });
});

//3. IMPLEMENTING THE SCORE/MONEY WON FUNCTIONALITY
function incrementScore(num) {
    score += num;
    setTimeout(() => {
        document.querySelector(`.score-${score}`).classList.add('scoreboarddull'); //Adds a backgroundcolor to the current score
        document.querySelector(`.score-${score - 1}`).classList.remove('scoreboarddull'); //Removes backgroundcolor from previous score
    }, 4000);
    if (score === 4 || score === 8 || score === 9 || score === 10) {
        stopTimerMusic();
        winAudio.play();
        winAudio.volume = 1.0;
        setTimeout(() => {
            document.querySelector(`.score-${score}`).classList.add('scoreboard');
            document.querySelector(`.score-${score - 1}`).classList.remove('scoreboarddull');
        }, 4000);
    }
    if (score === 4) {
        modalText.textContent = 'CONGRATULATIONS YOU NOW HAVE ₦20,000 GUARANTEED!';
    }
    else if (score === 8) {
        modalText.textContent = 'CONGRATULATIONS YOU NOW HAVE ₦500,000 GUARANTEED!';
    }
    else if (score === 9) {
        modalText.textContent = 'CONGRATULATIONS YOU NOW HAVE ₦1,000,000 GUARANTEED!';
    }
    else {
        modalText.textContent = 'CORRECT ANSWER!';
    }
}

//4. IMPLEMENTING THE 50:50 FUNCTIONALITY
const randomNumHelperFunc = (num) => Math.floor(Math.random() * num) + 1;
const fiftyFiftyGenerator = (num) => {
	let randomFirst, randomSecond;
	// Generate first random number
	randomFirst = randomNumHelperFunc(4);
	while (randomFirst === num) {
		randomFirst = randomNumHelperFunc(4);
	}
	randomSecond = randomNumHelperFunc(4);
	while (randomSecond === randomFirst || randomSecond === num) {
		randomSecond = randomNumHelperFunc(4);
	}
	// hide two wrong answers
	 document.querySelector(`[data-number = '${randomFirst}']`).classList.toggle('hide');
	 document.querySelector(`[data-number ='${randomSecond}']`).classList.toggle('hide');
};
fiftyFiftyBtn.addEventListener('click', () => {
    fiftyfiftyAudio.play();
    fiftyfiftyAudio.volume = 1.0;
	// Remove two wrong answers
	fiftyFiftyGenerator(currentQuestion.answer);
	// hide the 50:50 button
	fiftyFiftyBtn.classList.add('hide');
});

//5. IMPLEMENTING THE PHONE A FRIEND FUNCTIONALITY
const optionsArray = ['A', 'B', 'C', 'D',];
call.addEventListener('click', function() {
    const genRandomNum = Math.floor(Math.random() * 4);
    call.classList.add('hidden'); //Removes the call button permanently
    toggleModal();
    modalText.textContent = `John says he thinks the answer is ${optionsArray[genRandomNum]}`;
    setTimeout(() => {
        toggleModal();
    }, 5000);
});

//6. IMPLEMENTING THE ASK AUDIENCE FUNCTIONALITY
ask.addEventListener('click', function() {
    ask.classList.add('hide');
    let img = document.createElement('img');
    img.setAttribute('src', `audience--${currentQuestion.answer}.png`);
    audienceModal.appendChild(img);
    toggleAudienceModal();
    setTimeout(() => {
        toggleAudienceModal();
    }, 5000);
});

//7. IMPLEMENTING THE WALK AWAY FUNCTIONALITY
walkAway.addEventListener('click', () => {
    // gameOver('end.html');
    if (score === 9) {
        toggleModal();
        modalText.textContent =  'YOU BAGGED ONLY ₦1,000,000';
        modalText.style.color = '#dc3545';
        gameOver('end.html');
    } else if (score >= 8) {
        toggleModal();
        modalText.textContent =  'You came this close and decided to walk away? ₦500,000 for you';
        modalText.style.color = '#dc3545';
        gameOver('end.html');
    } else if (score >= 4) {
        toggleModal();
        modalText.textContent =  'YOU BAGGED ONLY ₦20,000. You have failed us!';
        modalText.style.color = '#dc3545';
        gameOver('end.html');
    } else {
        toggleModal();
        modalText.textContent =  'YOU WON NOTHING(₦0), WHAT A SHAME';
        modalText.style.color = '#dc3545';
        gameOver('end.html');
    }
});

startGame();