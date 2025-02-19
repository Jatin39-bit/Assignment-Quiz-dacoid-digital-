/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const MyScoreboard = () => {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/user/myscores', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setQuizHistory(response.data);
        console.log(response.data);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchQuizHistory();
  }
    , []);

  return (
    <div>
        <Navbar />
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Quiz Scoreboard</h1>
      {quizHistory.length === 0 ? (
        <p className="text-gray-400">No quiz attempts yet.</p>
      ) : (
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse border border-gray-700 text-center">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 py-3 px-4">Date</th>
                <th className="border border-gray-700 py-3 px-4">Score</th>
                <th className="border border-gray-700 py-3 px-4">Time Taken</th>
              </tr>
            </thead>
            <tbody>
              {quizHistory.map((entry, index) => (
                <tr key={index} className="border border-gray-700 hover:bg-gray-800">
                  <td className="py-3 px-4">{new Date(entry.date).toLocaleString()}</td>
                  <td className="py-3 px-4">{entry.score}</td>
                  <td className="py-3 px-4">{entry.minutes} min {entry.seconds} sec</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  )
}

export default MyScoreboard