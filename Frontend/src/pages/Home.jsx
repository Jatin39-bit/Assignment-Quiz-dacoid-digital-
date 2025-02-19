/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useContext, useCallback } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { dataContext } from '../context/ContextApi';
import { ToastContainer, toast } from 'react-toastify';
import Result from "../components/Result";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    if (status) {
      if (minutes === 0 && seconds === 0) {
        toast.error('Time up');
        saveData(score, minutes, seconds);
        setStatus(false);
      } else {
        const countdown = setTimeout(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        }, 1000);
        
        return () => clearTimeout(countdown);
      }
    }
  }, [seconds, minutes, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/user/questions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setQuestions(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          toast.error('Unauthorized');
        } else {
          toast.error('Something went wrong');
        }
      }
    };
    fetchData();
  }, []);

  const handleOptionClick = (option) => {
    if (selectedOption === null) {
      setSelectedOption(option);
      setShowAnswers(true);
      if (option === questions[currentQuestion]?.answer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };


  const nextQuestion = useCallback(() => {
      setSelectedOption(null);
      setShowAnswers(false);
      setCurrentQuestion((prev) => prev + 1);
  },[])




  const saveData = async (score, minutes, seconds) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/user/score', {
        score,
        minutes,
        seconds
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setResultData({score: response.data.newScore.score,
          minutes: response.data.newScore.minutes,
          seconds: response.data.newScore.seconds,
          percentage: response.data.percentage})
      setQuizCompleted(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (selectedOption !== null && questions[currentQuestion]?.options.includes(selectedOption) && currentQuestion + 1 < questions.length) {
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          nextQuestion();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [currentQuestion, selectedOption, nextQuestion, questions]);

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />
      {status ? (
        <div className="h-full flex justify-center items-center bg-gray-900 text-white">
        <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Question {currentQuestion + 1} / {questions.length}
          </h2>
          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion]?.question}</h3>
      
          <p className="mb-2 text-gray-300">⏳ Time Left: {minutes}m {seconds}s</p>
          <p className="mb-4 text-gray-300">🏆 Score: {score}</p>
      
          <div className="space-y-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`block w-full py-3 px-6 rounded-lg text-lg font-medium shadow-lg transition duration-200
                  ${showAnswers 
                    ? option === questions[currentQuestion]?.answer 
                      ? "bg-green-500 hover:bg-green-600"
                      : option === selectedOption 
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gray-700"
                    : "bg-gray-700 hover:bg-gray-600"}`}
                disabled={showAnswers}
              >
                {option}
              </button>
            ))}
          </div>
      
          {currentQuestion + 1 === questions.length ? (
            <button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200"
              onClick={() => {
                toast.success('Quiz Completed');
                saveData(score, minutes, seconds);
                setStatus(false);
                setCurrentQuestion(0);
                setScore(0);
                setMinutes(10);
                setSeconds(0);
                setShowAnswers(false);
                setSelectedOption(null);
              }}
            >
              🎉 Finish Quiz
            </button>
          ) : (
            <button
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200"
              onClick={nextQuestion}
              disabled={!showAnswers}
            >
              ⏭️ Next Question
            </button>
          )}
        </div>
      </div>
      
      ) : quizCompleted ? (
        <Result resultData={resultData} setQuizCompleted={setQuizCompleted}  />
      ) : (
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl  font-bold mb-6">Welcome to the Quiz</h1>
      <p className="text-lg text-gray-400 mb-8">Test your knowledge and challenge yourself!</p>
      <button
        onClick={() => setStatus(true)}
        className="bg-blue-600 hover:bg-blue-500 transition-transform transform hover:scale-105 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
      >
        Start Quiz
      </button>
    </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
