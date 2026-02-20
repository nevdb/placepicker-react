import { useState, useCallback } from "react";

import QUESTIONS from "../data/questions.js";
import quizCompleted from "../assets/quiz-completed.webp";
import QuestionTimer from "../components/QuestionTimer.jsx";

export default function QuizContent() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  const [shuffledAnswers, setShuffledAnswers] = useState(() =>
    shuffleArray(QUESTIONS[0].answers),
  );

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prev) => {
      const updated = [...prev, selectedAnswer];
      const nextIndex = updated.length;

      if (nextIndex < QUESTIONS.length) {
        setShuffledAnswers(shuffleArray(QUESTIONS[nextIndex].answers));
      }

      return updated;
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  if (quizIsComplete) {
    return (
      <div className="max-w-[50rem] m-auto p-8 bg-violet-500 rounded-lg text-center items-center flex flex-col ">
        <img
          src={quizCompleted}
          alt="Quiz completed icon"
          className="h-32 w-auto"
        />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div className="max-w-[50rem] m-auto p-8 bg-violet-500 rounded-lg text-center">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2 className="text-amber-100">
          {QUESTIONS[activeQuestionIndex].text}
        </h2>

        <ul className="list-none m-0 p-0 flex flex-col items-center gap-2">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="w-[90%] mx-auto">
              <button
                className="inline-block w-full text-sm px-8 py-4 rounded-[24px] bg-violet-950 hover:bg-amber-500 hover:text-white"
                onClick={() => handleSelectAnswer(answer)}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
