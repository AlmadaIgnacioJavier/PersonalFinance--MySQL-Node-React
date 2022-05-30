import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './assets/style.css'

// views

import Balance from './views/balanceActual'
import Login from './views/login.jsx'
import SignIn from './views/signIn.jsx'
import Index from './views/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
	    <Routes>
	      <Route path="/" element={<Index />} />
	      <Route path="/balance" element={<Balance />} />
	      <Route path="/login" element={<Login />} />
	      <Route path="/signin" element={<SignIn />} />	
	    </Routes>
  	</BrowserRouter>
  </React.StrictMode>
)
