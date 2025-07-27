import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Home from './components/Home'
import Appointment from './components/Appointment/Appointment'
import './App.css'

function App() {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/appointments" element={<Appointment />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App