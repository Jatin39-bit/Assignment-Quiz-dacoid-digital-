/* eslint-disable no-unused-vars */
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import GlobalScoreboard from './pages/GlobalScoreboard'
import MyScoreboard from './pages/MyScoreboard'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProtectedWrapper from './components/UserProtectedWrapper'

function App() {

  return (
    <Routes>
      <Route path="/" element={<UserProtectedWrapper><Home /></UserProtectedWrapper>} />
      <Route path="/global-scoreboard" element={<UserProtectedWrapper><GlobalScoreboard /></UserProtectedWrapper>} />
      <Route path="/my-scoreboard" element={<UserProtectedWrapper><MyScoreboard /></UserProtectedWrapper>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
