import React from 'react';

const QuizInstructions = ({ onStart }) => {
  return (
    <div id="home" className="active">
      <h2>Quiz Instructions</h2>
      <div className="home-gif">
        <img src={`${process.env.PUBLIC_URL}/img/logo.gif`} alt='Quiz!!'></img>
      </div>
      <div className="note">
        <p>This Quiz contains multiple choice questions from different domains. Answer the Questions and complete them within the time limit. All the Best !!!</p>
      </div>
      <div className="start-button">
        <button onClick={onStart}>Start Quiz</button>
      </div>
    </div>
  );
};

export default QuizInstructions;
