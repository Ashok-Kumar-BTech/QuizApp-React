import React from 'react';

const ResultPage = ({ score, onRetake }) => {
  return (
    <div id="result" className="active">
      <h2>Quiz Results</h2>
      <p id="score">Score: {score.correctCount}/{score.totalQuestions} ({score.percentage}%)</p>
      <button onClick={onRetake}>Restart Quiz</button>
    </div>
  );
};

export default ResultPage;
