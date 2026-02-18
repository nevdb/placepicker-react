import { useState } from "react";

import QUESTIONS from "../data/questions.js";

export default function QuizContent() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevPickedPlaces) => {
      return [...prevPickedPlaces, selectedAnswer];
    });
  }

  return (
    <div className="max-w-[50rem] m-auto p-8 bg-[linear-gradient(180deg,_#3e2a60_0%,_#321061_100%)] rounded-lg shadow-[1px_1px_8px_4px_rgba(12,5,32,0.6)] text-center">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>;
        <ul className="list-none m-0 p-0 flex flex-col items-center gap-2">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
            <li key={answer} className="w-[90%] mx-auto">
              <button
                className="inline-block w-full font-['Roboto_Condensed',sans-serif] text-[0.9rem] px-8 py-4 border-none rounded-[24px] bg-[#6cb7f5] cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#9d5af5] hover:text-white focus:bg-[#9d5af5] focus:text-white"
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
