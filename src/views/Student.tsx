import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Student: React.FC = () => {
  const subjects = useSelector((state: RootState) => state.subjects);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [startQuiz, setStartQuiz] = useState(false);

  if (!selectedSubject) {
    return (
      <div className="flex flex-col items-center justify-center admin-login admin-container">
        <h2 className="text-2xl font-bold mb-6">Select Subject</h2>
        <select
          className="mb-4 px-3 py-2 border rounded"
          onChange={(e) => setSelectedSubject(Number(e.target.value))}
          value={selectedSubject ?? ""}
        >
          <option value="">Select a subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        {selectedSubject && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setStartQuiz(true)}
          >
            Start Quiz
          </button>
        )}
      </div>
    );
  }

  if (!startQuiz) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 admin-login admin-container">
        <h2 className="text-2xl font-bold mb-6">Ready to start?</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setStartQuiz(true)}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return <QuizView subjectId={selectedSubject} />;
};

const QuizView: React.FC<{ subjectId: number }> = ({ subjectId }) => {
  const subject = useSelector((state: RootState) =>
    state.subjects.find((s) => s.id === subjectId)
  );
  const questions = useSelector((state: RootState) =>
    state.questions.filter((q) => q.subjectId === subjectId)
  );
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCorrections, setShowCorrections] = useState(false);

  const handleAnswer = (idx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

  const numAnswered = answers.filter((a) => a !== null).length;

  if (showCorrections) {
    return (
      <CorrectionsView
        subject={subject}
        questions={questions}
        answers={answers}
        onBack={() => setShowCorrections(false)}
      />
    );
  }

  if (submitted) {
    const score = questions.reduce(
      (acc, q, idx) => acc + (answers[idx] === q.answer ? 1 : 0),
      0
    );
    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= 50;
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 admin-login admin-container">
        <h2 className="text-2xl font-bold mb-4">Your Score</h2>
        <p className="mb-2">
          {score} / {questions.length} ({percent}%)
        </p>
        <p
          className={`mb-4 font-bold ${
            passed ? "text-green-600" : "text-red-600"
          }`}
        >
          {passed
            ? "Congratulations, you passed the test!"
            : "Sorry, you did not pass."}
        </p>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded"
          onClick={() => setShowCorrections(true)}
        >
          Show Corrections
        </button>
      </div>
    );
  }

  if (showSubmit) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 admin-login admin-container">
        <h2 className="text-2xl font-bold mb-4">Are you ready to submit?</h2>
        <div className="flex gap-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded edit-button margin-right-10px"
            onClick={() => setSubmitted(true)}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded delete-button"
            onClick={() => setShowSubmit(false)}
          >
            No
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 admin-container">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="font-bold text-lg">{subject?.name}</h2>
          <span className="text-sm">
            {numAnswered} / {questions.length} answered
          </span>
        </div>
        <div className="mb-4 font-bold">
          Question {current + 1} of {questions.length}
        </div>
        <div className="mb-4 question-text">{q.text}</div>
        <div className="mb-6 question-options">
          {q.options.map((opt) => (
            <button
              key={opt}
              className={`block w-full text-left px-4 py-2 mb-2 rounded border ${
                answers[current] === opt
                  ? "bg-gray-400 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleAnswer(current, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center next-prev d-flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setCurrent(current - 1)}
            disabled={current === 0}
          >
            Previous
          </button>
          {current < questions.length - 1 ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setCurrent(current + 1)}
              disabled={answers[current] === null}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => setShowSubmit(true)}
              disabled={answers[current] === null}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CorrectionsView: React.FC<{
  subject: any;
  questions: any[];
  answers: (string | null)[];
  onBack: () => void;
}> = ({ subject, questions, answers, onBack }) => {
  const [current, setCurrent] = useState(0);
  const q = questions[current];
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 question-corrections admin-container admin-login">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow">
        <div className="mb-4 flex justify-between items-center">
          <span className="font-bold text-lg">
            {subject?.name} - Corrections
          </span>
          <span className="text-sm">
            {current + 1} / {questions.length}
          </span>
        </div>
        <div className="mb-4 font-bold">
          Question {current + 1} of {questions.length}
        </div>
        <div className="mb-4 correction-question-text">{q.text}</div>
        <div className="mb-6 question-options">
          {q.options.map((opt: string) => {
            const isCorrect: boolean = opt === q.answer;
            const isChosen: boolean = answers[current] === opt;
            return (
              <div
                key={opt}
                className={`block px-4 py-2 correction-options mb-2  ${
                  isCorrect
                    ? "bg-green-200 correct"
                    : isChosen
                    ? "bg-red-200 incorrect"
                    : "bg-gray-100"
                }`}
              >
                {opt}
                {isCorrect && (
                  <span className="ml-2 text-green-700 font-bold">
                    (Correct)
                  </span>
                )}
                {isChosen && !isCorrect && (
                  <span className="ml-2 text-red-700 font-bold">
                    (Your Answer)
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setCurrent(current - 1)}
            disabled={current === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setCurrent(current + 1)}
            disabled={current === questions.length - 1}
          >
            Next
          </button>
        </div>
        <div className="mt-4 text-center margin-top-10px">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded"
            onClick={onBack}
          >
            Back to Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
