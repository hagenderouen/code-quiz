
// Quiz object. 
    // Vars: questions, choices, answers, timeLeft, quiz progess (isQuizInProgress).
    // Methods: score calculator, timer.
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
        }
    ],
    timeLeft: 75,
    isQuizInProgress: false,
    currentQuestion: 0,
    score: 0,
    calculateScore() {
        // do something
    },
    startTimer() {
        // do something
    },
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
    startQuiz() {
        this.isQuizInProgress = true;
    }
}

const mainEl = $('#main-content');

const displayWelcomeMsg = function() {
    mainEl.append(
        `<div class="text-center">
            <h2>Coding Quiz Challenge</h2>
            <p>
                Try to answer the following code related questions within
                the time limit. Keep in mind that incorrect answers will penalize
                score/time by ten seconds!
            </p>
            <button id="btn-start">Start Quiz</button>
        </div>`);
}

displayWelcomeMsg();

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

// Displays high scores with clear highscores button and go back (restart) button


// Handler for initials form.
const initialsFormHandler = function(event) {
    // store intials in localstorage
    // display highscores
}

// Start quiz button event listener
$('#btn-start').on('click', function() {
    quiz.startQuiz();
    // clears main el
    mainEl.html('');
    displayQuestion(quiz);
    //handleChoiceClicks();
});

// An event listener to start the timer.

// Evaluates the user choice clicks, updates score/timer and displays the next question.
const handleChoiceClicks = function() {
    
    $('#choices').on('click', '.choice-btn', function(event) {
    // Evaluate answer and update score
    let choice = $(event.target).text();
    
    if (quiz.isChoiceCorrect(choice)) {
        console.log('Correct!');
        quiz.incrementScore();
        console.log(`Curr score: ${quiz.score}`);
    } else {
        console.log('Wrong!');
        quiz.decrementScore();
        quiz.decrementTimer();
        console.log(`Curr score: ${quiz.score}`);
    }
    // clears main el
    mainEl.html('');

    quiz.incrementCurrentQuestion();

    // checks if there are any more questions
    if (quiz.currentQuestion + 1 > quiz.questions.length) {
        displayFinalMsgForm();
    } else {
        displayQuestion(quiz);
    }
    });
}

$('body').on('click', handleChoiceClicks);
$('body').on('click', )

// Save initials and score to localstorage.
