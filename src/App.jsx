import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Home from './components/Home'
import './App.css'

function App() {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="content">
                    <Home />
                </div>
            </div>
        </Router>
    )
}

export default App