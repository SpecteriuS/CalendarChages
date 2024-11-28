import './App.css'
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Calendar from './components/Calendar'
import EventDetails from './components/EventDetails'
import AllTasks from './components/AllTasks'


function App() {
  return (
    <>
      <Navbar
        content={
          <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/eventdetails/:id" element={<EventDetails />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/about" element={<About />} />
          </Routes>
        } />
    </>
  )
}

export default App
