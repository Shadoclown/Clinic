import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/variable.css'  // Import variables first
import './App.css'
import './components/style/Table.css'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Appointment from './components/Appointment/Appointment'
import Examination from './components/Examination'
import Records from './components/Records'

function App() {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/appointments" element={<Appointment />} />
                        <Route path="/examination" element={<Examination />} />
                        <Route path="/records" element={<Records />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App