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
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>
        <CounterContent initialCount={chosenCount} />
      </main>
    </>
  );
}
