import React, {useEffect, useState} from "react";
import './App.css';
// import {default as myQuestions} from "./lib/questions";

const App = () => {
    const [activeQuestion, setActiveQuestion] = React.useState(0)
    const [selectedAnswer, setSelectedAnswer] = React.useState('')
    const [showResult, setShowResult] = React.useState(false)
    const [showQuestions, setShowQuestions] = React.useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState(null)
    const [result, setResult] = React.useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    const [answeredQuestions, setAnsweredQuestions] = React.useState([])


    const [question, setQuestion] = useState()
    const [choices, setChoices] = useState()
    const [correctAnswer, setCorrectAnswer] = useState()

    const [questions, setQuestions] = useState()
    const [settings, setSettings] = useState()

    useEffect(() => {
        const load = async () => {
            try {
                const questionsQ = await fetch("https://script.google.com/macros/s/AKfycbwduLDam8ovAabdLI4pec6lRmKFmVxavkWnD5UzKBuJS4ml-V2-2InACg03IKK-w0-pvQ/exec");
                const questionsS = await questionsQ.json();
                setQuestions(questionsS.data);
                setSettings(questionsS.settings[0]);
            } catch (error) {
                console.log(error);
            }
        };
        load().then(r => console.log(r));
    }, [])

    useEffect(() => {
        console.log(questions)
        if(questions) {
            setQuestion(questions[activeQuestion].question);
            setChoices(questions[activeQuestion].choices);
            setCorrectAnswer(questions[activeQuestion].correctanswer);
        }
    }, [activeQuestion, questions])

    // const {questions} = myQuestions
    // const {question, choices, correctAnswer} = questions[activeQuestion]

    const onClickNext = () => {
        setAnsweredQuestions([
            ...answeredQuestions,
            {
                question: question,
                questionId: activeQuestion,
                answer: choices[selectedAnswerIndex],
                answerId: selectedAnswerIndex,
            }
        ])

        const formData = new FormData();
        formData.append("question", question);
        formData.append("questionId", activeQuestion.toString());
        formData.append("answer", choices[selectedAnswerIndex]);
        formData.append("answerId", selectedAnswerIndex.toString());

        fetch("https://script.google.com/macros/s/AKfycbwduLDam8ovAabdLI4pec6lRmKFmVxavkWnD5UzKBuJS4ml-V2-2InACg03IKK-w0-pvQ/exec", {
            method: 'POST',
            body: formData
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });

        setSelectedAnswerIndex(null)
        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + settings.perquestionscore,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : {...prev, wrongAnswers: prev.wrongAnswers + 1}
        )
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0)
            setShowResult(true)
        }
    }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

    return (
        <div className="quiz-container">
            {
                settings && !showQuestions && !showResult && (
                    <>
                      <p>
                          {settings.topic} <br /> {settings.welcome}
                      </p>
                      <button onClick={() => setShowQuestions(true)}>Սկսել</button>
                    </>
                )
            }

            {
                questions && choices && !showResult && showQuestions && (
                    <>
                        <div>
                            <span className="active-question-no">
                              {addLeadingZero(activeQuestion + 1)}
                            </span>
                            <span className="total-question">/{addLeadingZero(questions.length)}</span>
                        </div>
                        <h2>{question}</h2>
                        <ul>
                            {choices.map((answer, index) => (
                                <li
                                    onClick={() => onAnswerSelected(answer, index)}
                                    key={answer}
                                    className={
                                        selectedAnswerIndex === index ? 'selected-answer' : null
                                    }
                                >
                                    {answer}
                                </li>
                            ))}
                        </ul>
                        <div className="flex-right">
                            <button
                                onClick={onClickNext}
                                disabled={selectedAnswerIndex === null}
                            >
                                {activeQuestion === questions.length - 1 ? 'Վերջ' : 'Հաջորդը'}
                            </button>
                        </div>
                    </>
                )
            }

            {
                showResult && (
                    <div className="result">
                        <h3>Result</h3>
                        <p>
                            Total Question: <span>{questions.length}</span>
                        </p>
                        <p>
                            Total Score:<span> {result.score}</span>
                        </p>
                        <p>
                            Correct Answers:<span> {result.correctAnswers}</span>
                        </p>
                        <p>
                            Wrong Answers:<span> {result.wrongAnswers}</span>
                        </p>
                        {
                            answeredQuestions.map((e, i) => (
                                <p>
                                   {/* <span>{e.questionId}: </span>
                                    <span>{e.question}: </span>
                                    <span>{e.answerId}: </span>
                                    <span>{e.answer}</span>

                                    <hr />*/}
                                </p>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
export default App;
