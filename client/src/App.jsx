import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/SignIn"
import Signup from "./pages/SignUp"
import SendMoney from "./pages/SendMoney"
import NotFound from './components/NotFound'
import HomePage from './pages/HomePage'
export default  function App() {
 
  return (
    <BrowserRouter>
    <Routes>

        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="*" element={<NotFound/>} />
    </Routes>
    
    </BrowserRouter>
  )
}
