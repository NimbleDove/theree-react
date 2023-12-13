import { addDoc, collection, where } from 'firebase/firestore';
import { db } from "../config/firebase";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExamComponent = ({ userId }) => {
    const navigate = useNavigate();
  
    
  
    useEffect(() => {
      if (!localStorage["user"]) {
        navigate("/login");
      }
    }, []);
  
    const user = JSON.parse(localStorage["user"] ?? "{}");
    const username = user.username;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is the capital of Germany?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Berlin",
    },
    // Add more questions as needed
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: selectedOption,
    });

    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption("");
  };

  const handleFinishExam = async () => {
    try {
      const successRate = (score / questions.length) * 100;
      const subjectofthis = "Trigonometri";
      await addDoc(collection(db, "results"), {
        username: username,
        totalQuestions: questions.length,
        correctAnswers: score,
        successRate: successRate,
        timestamp: Date.now(),
        userAnswers: userAnswers,
        subject: subjectofthis,
      });
    } catch (error) {
      console.error('Error storing user results in Firestore', error);
    }
  };

  return (
    <div className='worthLife'>
      {currentQuestionIndex < questions.length ? (
        <div className='quizBox'>
          <h3 >Question {currentQuestionIndex + 1}</h3>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleNextQuestion} id='buttonofNextInQuizBox'>Next Question</button>
        </div>
      ) : (
        <div>
          <h3>Exam Completed!</h3>
          <p>
            Your Score: {score}/{questions.length}
          </p>
          <button onClick={handleFinishExam}>Finish Exam</button>
        </div>
      )}
    </div>
  );
};

export default ExamComponent;
