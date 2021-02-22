
const quiz = {
    questions: [
        {
            question: 'Which of the following is not JavaScript Data Types?',
            choices: ['Undefined', 'Number', 'Boolean', 'Float'],
            answer: 'Float'
        },
        {
            question: 'What are variables used for in JavaScript Programs?',
            choices: ['Storing numbers, dates, or other values', 'Varying randomly','Causing high-school algebra flashbacks', 'None of the above'],
            answer: 'Storing numbers, dates, or other values'
        },
        {
            question: 'Inside which HTML element do we put the JavaScript?',
            choices: ['&#60script&#62', '&#60head&#62', '&#60meta&#62', '&#60style&#62'],
            answer: '<script>'
        }
    ],
    timeLeft: 75,
    currentQuestion: 0,
    score: 0,
    incrementCurrentQuestion() {
        this.currentQuestion++;
    },
    isChoiceCorrect(choice) {
        let currentQuestionIndex = this.currentQuestion;
        if (choice === this.questions[currentQuestionIndex].answer) {
            return true;
        } else {
            return false;
        }
    },
    incrementScore() {
        this.score += 10;
    },
    decrementScore() {
        this.score -= 10;
    },
    decrementTimer() {
        this.timeLeft -= 10;
    },
    setTime() {
        this.timeLeft--;
    }
}

const mainEl = $('#main-content');
const answerResponseEl = $('#answer-response');
const timeLeftEl = $('#time-left');
const viewHighScoresBtn = $('#view-highscores');

const displayWelcomeMsg = function() {
    mainEl.append(
        `<div class="text-center">
            <h2>Coding Quiz Challenge</h2>
            <p id="instructions">
                Try to answer the following code related questions within
                the time limit. Keep in mind that incorrect answers will penalize
                score/time by ten seconds!
            </p>
            <button id="btn-start">Start Quiz</button>
        </div>`);
}

// Displays the time left
const displayTimeLeft = function(timeLeft) {
    timeLeftEl.text(timeLeft);
}

displayWelcomeMsg();
displayTimeLeft(quiz.timeLeft);


// Displays the current question and choices to the main el.
const displayQuestion = function(quiz) {
    let questionIndex = quiz.currentQuestion;
    let question = quiz.questions[questionIndex];
    console.log(question);
    // append question to main content
    mainEl.append(`<h2>${question.question}</h2>`);
    // creat the list for answer choices
    let listEl = $('<ol id="choices">');
    // loop through choices and append items to the list
    for (var i = 0; i < question.choices.length; i++) {
        let choice = question.choices[i];
        listEl.append(`<li><button class="choice-btn">${choice}</button></li>`);
    }
    // append list to mainEl
    mainEl.append(listEl);
}

// Displays final scores and initials form. 
const displayFinalMsgForm = function() {
    mainEl.append(`
        <h2>All done!</h2
        <p>Final score: ${quiz.score}</p>
        <form id="initials-form">
            <label for="initials">Your initials:</label>
            <input type="text" id="initials" name="initials">
            <input type="submit" value="Submit">
        </form>`
        );
}

// Displays high scores 
const displayHighScores = function() {
    mainEl.html('');
    mainEl.append(`<h2>High Scores</h2>`);
    
    let highScores = localStorage.getItem("highScores");

    if (!highScores || highScores.length === 0) {
        highScores = [];
    } else {
        highScores = JSON.parse(highScores);
    }

    let scoresListEl = $('<ol id="scores-list">'); 

    // loop through high scores and add to the list
    for (var i = 0; i < highScores.length; i++) {
        scoresListEl.append(`<li>${highScores[i].initials} ${highScores[i].score}</li>`);
    }

    mainEl.append(scoresListEl);

    mainEl.append('<div><button id="go-back">Go Back</button><button id="clear-highscores">Clear Highscores</button></div>');
}

const handleGoBack = function() {
    location.reload();
}

const handleClearHighScores = function() {
    localStorage.setItem("highScores", []);
    displayHighScores();
}

// Updates initials and score from localstorage
const handleInitialsForm = function(event) {
    event.preventDefault();
    console.log('Initials form clicked!');
    const initialsInput = $('#initials');
    let highScores = localStorage.getItem("highScores");

    if (!highScores || highScores.length === 0) {
        highScores = [];
    } else {
        highScores = JSON.parse(highScores);
    }

    let highScore = {
        initials: initialsInput.val(),
        score: quiz.score
    }

    highScores.push(highScore);
    
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // clears main el
    mainEl.html(' ')

    displayHighScores();

}

// Start quiz button event listener
$('#btn-start').on('click', function() {
    setTimer();

    // clears main el
    mainEl.html('');

    displayQuestion(quiz);
});

const setTimer = function() {
    const timer = setInterval(function(){

        // Decrements timeLeft by 1
        quiz.setTime();

        var timeLeft = quiz.timeLeft;

        displayTimeLeft(timeLeft);

        if (timeLeft < 0) {
            clearInterval(timer);
            
            // clears main el
            mainEl.html('');
            
            displayTimeLeft(0);
            displayFinalMsgForm();
        }
    }, 1000);
}

// Evaluates the user's answer choice, updates the score/timer, and checks if there are any more questions.
// If the quiz is over, it displays the final message form.
const handleChoiceClicks = function(event) {
    
    // Evaluate answer and update score
    let choice = $(event.target).text();
    
    if (quiz.isChoiceCorrect(choice)) {
        displayAnswerResponse('Correct!');
        console.log('Correct!');
        quiz.incrementScore();
        console.log(`Curr score: ${quiz.score}`);
    } else {
        displayAnswerResponse('Wrong!');
        console.log('Wrong!');
        quiz.decrementScore();
        quiz.decrementTimer();
        console.log(`Curr score: ${quiz.score}`);
    }
    // clears main el
    mainEl.html('');

    quiz.incrementCurrentQuestion();

    // checks if there are any more questions.
    if (quiz.currentQuestion + 1 > quiz.questions.length) {
        quiz.timeLeft = 0;
        displayFinalMsgForm();
    } else {
        displayQuestion(quiz);
    }
}

// TODO Display answer prompt
const displayAnswerResponse = function(answer) {
    answerResponseEl.append(`<hr><p><i>${answer}</i></p>`);
    
    setTimeout(function(){
        answerResponseEl.html('<p></p>');
    }, 1000)
    
}

viewHighScoresBtn.on('click', displayHighScores);
mainEl.on('click', '.choice-btn', handleChoiceClicks);
mainEl.on('submit', '#initials-form', handleInitialsForm);
mainEl.on('click', '#go-back', handleGoBack);
mainEl.on('click', '#clear-highscores', handleClearHighScores);
