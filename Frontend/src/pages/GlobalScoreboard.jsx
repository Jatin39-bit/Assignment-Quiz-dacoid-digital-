/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const GlobalScoreboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/user/leaderboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setScores(response.data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };
    fetchScores();
  }
    , []);
  
  return (
    <div className='h-screen flex flex-col'>
        <Navbar />
        <div className="bg-gray-900 text-white flex-1 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🌎 Global Scoreboard</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-lg">
              <th className="border border-gray-700 px-4 py-2">#</th>
              <th className="border border-gray-700 px-4 py-2">Player</th>
              <th className="border border-gray-700 px-4 py-2">Score</th>
              <th className="border border-gray-700 px-4 py-2">Time Taken</th>
              <th className="border border-gray-700 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((score, index) => (
                <tr key={score._id} className="hover:bg-gray-800">
                  <td className="border border-gray-700 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-700 px-4 py-2 capitalize">{score.user.name}</td>
                  <td className="border border-gray-700 px-4 py-2 text-center font-semibold">{score.score}</td>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    {score.minutes}m {score.seconds}s
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-center">
                    {new Date(score.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No scores available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default GlobalScoreboard