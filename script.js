
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
    calculateScore() {
        // do something
    },
    startTimer() {
        // do something
    }
}
// A form submit handler that navigates through the questions.
// Display handler for quiz questions and choices.
// Display handler for quiz scores.
// Start quiz button and event listener to start the timer.
// Detect incorrect answers and subtract from timer.
// Save initials and score to localstorage.
