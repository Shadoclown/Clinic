import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from './components/sidebar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <div className="content-wrapper">
            <h1>Welcome to MediClinic</h1>
            <p>Select a menu item from the sidebar to get started.</p>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
