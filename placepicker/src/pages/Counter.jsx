import { useState } from "react";
import { log } from "../utils/log.js";
import logoImg from "../assets/counter-logo.png";

import CounterContent from "../components/counter/CounterContent";
// import Header from "./components/Header";

export default function Counter() {
  log("<App /> rendered");

  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }
  return (
    <>
      <header id="main-header">
        <img
          src={logoImg}
          className="h-10 w-auto"
          alt="Magnifying glass analyzing a document"
        />
        <h1>React - Behind The Scenes</h1>
      </header>
      <main>
        <section
          id="configure-counter"
          className="my-8 mx-auto p-0 rounded-md text-center flex gap-2 items-center justify-center border-1 border-teal-500"
        >
          <h2 className="my-2 text-base font-bold text-teal-500">
            Set Counter
          </h2>
          <input
            type="number"
            onChange={handleChange}
            value={enteredNumber}
            className="w-16 text-center m-2 px-1 py-2 border border-teal-500 rounded bg-teal-950 text-teal-500 text-base"
          />
          <button
            onClick={handleSetClick}
            className="cursor-pointer bg-transparent text-teal-300 border-0 hover:text-teal-600 border hover:border-teal-600"
          >
            Set
          </button>
        </section>
        <CounterContent initialCount={chosenCount} />
      </main>
    </>
  );
}
