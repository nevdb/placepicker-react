import quiz from "./../assets/quiz.png";
import QuizContent from "../components/QuizContent";

export default function Quiz() {
  return (
    <>
      <header>
        <img src={quiz} alt="Quiz logo" className="bg-amber-500" />
        <h1>Quiz</h1>
        <p>Create a quiz.</p>
      </header>
      <main>
        <QuizContent />
      </main>
    </>
  );
}
