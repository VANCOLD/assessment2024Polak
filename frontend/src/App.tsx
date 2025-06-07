import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/project-navbar/navbar'
import Finance from './components/project-dashboard/finance/finance'
import TaskPlanning from './components/project-dashboard/task-planning/task-planning'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/finance" element={<Finance />} />
        <Route path="/task-planning" element={<TaskPlanning />} />
          <Route path="*" element={<Navigate to="/finance" replace />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
