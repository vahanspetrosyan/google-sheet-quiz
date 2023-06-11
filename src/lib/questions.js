const questions = {
    topic: 'Javascript',
    level: 'Beginner',
    totalQuestions: 10,
    perQuestionScore: 5,
    totalTime: 60, // in seconds
    questions: [
        {
            question:
                'Question 1?',
            choices: [
                'Answer 1',
                'Answer 2',
                'Answer 3',
                'Answer 4'
            ],
            type: 'MCQs',
            correctAnswer: 'Answer 1',
        },
        {
            question:
                'Question 2?',
            choices: [
                'Answer 1',
                'Answer 2',
                'Answer 3'
            ],
            type: 'MCQs',
            correctAnswer: 'Answer 1',
        },
        {
            question:
                'Question 3?',
            choices: [
                'Answer 1',
                'Answer 2',
            ],
            type: 'MCQs',
            correctAnswer: 'Answer 1',
        }
    ],
}

export default questions;
