import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import QuizInstructions from './components/QuizInstructions.js';
import QuestionPage from './components/QuestionPage.js';
import ResultPage from './components/ResultPage.js';
import LoginButton from './components/LoginButton.js';
import LogoutButton from './components/LogoutButton.js';
import quizData from './questions/quizData.js';

function App() {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [currentPage, setCurrentPage] = useState('home');
  const [userAnswers, setUserAnswers] = useState(Array(quizData.questions.length).fill(null));
  const [timer, setTimer] = useState(quizData.questions.length * 10);
  const [score, setScore] = useState(null);

  useEffect(() => {
    let interval;
    if (currentPage !== 'home' && currentPage !== 'result') {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            handleSubmit();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentPage]);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const correctCount = userAnswers.filter(
      (answer, i) => answer === quizData.questions[i].answer
    ).length;
    const percentage = (correctCount / quizData.questions.length) * 100;
    setScore({
      correctCount,
      totalQuestions: quizData.questions.length,
      percentage: percentage.toFixed(2),
    });
    navigateTo('result');
  };

  const handleRetake = () => {
    setUserAnswers(Array(quizData.questions.length).fill(null));
    setTimer(quizData.questions.length * 10);
    navigateTo('home');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <div id="header">
            <span>Welcome, {user.name}</span>
            <LogoutButton />
          </div>
          <div id="timer">Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</div>
          {currentPage === 'home' && <QuizInstructions onStart={() => navigateTo('pg1')} />}
          {currentPage.startsWith('pg') && (
            <QuestionPage
              currentPage={currentPage}
              questions={quizData.questions}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              onNext={navigateTo}
              onSubmit={handleSubmit}
            />
          )}
          {currentPage === 'result' && <ResultPage score={score} onRetake={handleRetake} />}
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default App;
