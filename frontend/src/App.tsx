import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import NavbarMain from './components/navbar-main/navbar-main'
import TaskPlanning from './components/task-planning-dashboard/task-planning/task-planning'
import FinanceDashboard from './components/finance-dashboard/finance-dashboard'


function App() {

  return (
    <BrowserRouter>
      <NavbarMain />
      <Routes>
          <Route path="*" element={<Navigate to="/finance" replace />} /> 
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/task-planning" element={<TaskPlanning />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
