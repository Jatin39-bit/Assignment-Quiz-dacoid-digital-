/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect } from 'react'

const Result = ({resultData,setQuizCompleted}) => {
    
  return (
    <div className="flex items-center justify-center h-full bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg">You scored <span className="font-bold text-green-400">{resultData.score}</span> out of <span className="font-bold">10</span></p>
        <p className="text-lg mt-2">Time Taken: <span className="font-bold text-blue-400">{resultData.minutes}m {resultData.seconds}s</span></p>
        <p className="text-lg mt-2">You performed better than <span className="font-bold text-yellow-400">{resultData.percentage.toFixed(2)}%</span> of users.</p>
        <button 
          onClick={() =>{
            setQuizCompleted(false)
          }
          } 
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Result
