import { useState } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

export default function QuizAssignment({ onSubmit }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const quizzes = [
    {
      subject: 'Mathematics',
      title: 'Calculus Quiz - Chapter 3',
      duration: '30 minutes',
      questions: 10,
      type: 'Quiz'
    },
    {
      subject: 'Physics',
      title: 'Motion & Forces Assignment',
      duration: '45 minutes',
      questions: 8,
      type: 'Assignment'
    },
    {
      subject: 'Chemistry',
      title: 'Chemical Reactions Quiz',
      duration: '25 minutes',
      questions: 12,
      type: 'Quiz'
    },
    {
      subject: 'English',
      title: 'Literature Analysis Essay',
      duration: '60 minutes',
      questions: 5,
      type: 'Assignment'
    },
    {
      subject: 'Computer Science',
      title: 'Data Structures Quiz',
      duration: '40 minutes',
      questions: 15,
      type: 'Quiz'
    }
  ];

  const sampleQuestions = [
    {
      question: 'What is the derivative of x²?',
      options: ['x', '2x', 'x²', '2'],
      correct: 1
    },
    {
      question: 'What is the integral of 2x?',
      options: ['x', 'x²', '2x²', '2'],
      correct: 1
    },
    {
      question: 'What is the limit of (x² - 1)/(x - 1) as x approaches 1?',
      options: ['0', '1', '2', 'undefined'],
      correct: 2
    },
    {
      question: 'What is the chain rule used for?',
      options: [
        'Adding functions',
        'Differentiating composite functions',
        'Integration',
        'Finding limits'
      ],
      correct: 1
    },
    {
      question: "What is f'(x) if f(x) = sin(x)?",
      options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
      correct: 0
    }
  ];

  const handleStartQuiz = subject => {
    setSelectedQuiz(subject);
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
  };

  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswers({ ...answers, [questionIndex]: answerIndex });
  };

  const handleSubmitQuiz = () => {
    const score = Object.entries(answers).filter(
      ([qIndex, aIndex]) =>
        sampleQuestions[parseInt(qIndex)].correct === aIndex
    ).length;

    setSubmitted(true);

    setTimeout(() => {
      if (selectedQuiz) {
        onSubmit(selectedQuiz, score * 20, 100);
        setSelectedQuiz(null);
      }
    }, 2000);
  };

  if (selectedQuiz) {
    if (submitted) {
      const score = Object.entries(answers).filter(
        ([qIndex, aIndex]) =>
          sampleQuestions[parseInt(qIndex)].correct === aIndex
      ).length;

      const percentage = (score / sampleQuestions.length) * 100;

      return (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                percentage >= 50 ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {percentage >= 50 ? (
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>

            <h2 className="text-gray-900 mb-2">
              Quiz Submitted!
            </h2>

            <p className="text-gray-600 mb-6">
              You scored {score} out of {sampleQuestions.length}
            </p>

            <div className="text-4xl mb-6">
              <span
                className={
                  percentage >= 50
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {percentage.toFixed(0)}%
              </span>
            </div>

            <p className="text-gray-600">
              {percentage >= 50
                ? 'Great job! Keep up the good work.'
                : 'You may need counseling support. Check the counseling section.'}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">
              {selectedQuiz} Quiz
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>30:00</span>
            </div>
          </div>

          <span className="text-gray-600">
            Question {currentQuestion + 1} of{' '}
            {sampleQuestions.length}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-gray-900 mb-6">
            {sampleQuestions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {sampleQuestions[currentQuestion].options.map(
              (option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswer(currentQuestion, index)
                  }
                  className={`w-full text-left p-4 border rounded-lg ${
                    answers[currentQuestion] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-gray-900">
                    {option}
                  </span>
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() =>
              setCurrentQuestion(
                Math.max(0, currentQuestion - 1)
              )
            }
            disabled={currentQuestion === 0}
            className="px-6 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion <
          sampleQuestions.length - 1 ? (
            <button
              onClick={() =>
                setCurrentQuestion(currentQuestion + 1)
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-gray-900">
        Available Quizzes & Assignments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h3 className="text-gray-900 mb-1">
              {quiz.subject}
            </h3>
            <p className="text-gray-600 mb-4">
              {quiz.title}
            </p>

            <button
              onClick={() =>
                handleStartQuiz(quiz.subject)
              }
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Start {quiz.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
