import React from 'react';

const QuestionPage = ({ currentPage, questions, userAnswers, onAnswerChange, onNext, onSubmit }) => {
  const pageIndex = parseInt(currentPage.replace('pg', ''), 10) - 1;
  const startIndex = pageIndex * 5;
  const endIndex = startIndex + 5;
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <div id={currentPage} className="active">
      <h2>Page {pageIndex + 1}</h2>
      <div className="question-container">
        {currentQuestions.map((q, index) => (
          <div key={index} className="question">
            <p>{startIndex + index + 1}. {q.question}</p>
            {q.options.map((opt, optIndex) => (
              <label key={optIndex}>
                <input
                  type="radio"
                  name={`q${startIndex + index}`}
                  value={String.fromCharCode(65 + optIndex)}
                  checked={userAnswers[startIndex + index] === String.fromCharCode(65 + optIndex)}
                  onChange={() => onAnswerChange(startIndex + index, String.fromCharCode(65 + optIndex))}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
      </div>
      <div className="nav-buttons">
        {pageIndex > 0 && (
          <button onClick={() => onNext(`pg${pageIndex}`)}>Previous</button>
        )}
        {pageIndex < Math.ceil(questions.length / 5) - 1 && (
          <button onClick={() => onNext(`pg${pageIndex + 2}`)}>Next</button>
        )}
        {pageIndex === Math.ceil(questions.length / 5) - 1 && (
          <button onClick={onSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
