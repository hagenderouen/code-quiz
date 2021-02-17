
// Quiz object. 
    // Vars: questions, choices, answers, timeLeft, quiz progess (isQuizInProgress).
    // Methods: score calculator, timer.
const quiz = {
    questions: [
        {
            question: 'Which of the following is not JavaScript Data Types?',
            choices: ['Undefined', 'Number', 'Boolean', 'Float'],
            answer: 'Float'
        }
    ],
    timeLeft: 75,
    isQuizInProgress: false,
    currentQuestion: 0,
    calculateScore() {
        // do something
    },
    startTimer() {
        // do something
    }
}

const mainEl = $('#main-content');

// A form submit handler that navigates through the questions.

// Display handler for quiz questions and choices.
const displayQuestion = function(quiz) {
    let questionIndex = quiz.currentQuestion;
    let question = quiz.questions[questionIndex];
    console.log(question);
    // append question to main content
    mainEl.append(`<h2>${question.question}</h2>`);
    // creat the list for answer choices
    let listEl = $('<ol>');
    // loop through choices and append items to the list
    for (var i = 0; i < question.choices.length; i++) {
        listEl.append(`<li>${question.choices[i]}</li>`);
    }
    // append list to mainEl
    mainEl.append(listEl);
}

displayQuestion(quiz);

// Display handler for quiz scores.
// Start quiz button and event listener to start the timer.
// Detect incorrect answers and subtract from timer.
// Save initials and score to localstorage.
