import Navbar from './webpage/navbar'
import Section1 from './webpage/section1'
import Section2 from './webpage/section2'
import Section3 from './webpage/Section3'
import Section4 from './webpage/Section4'
import Section5 from './webpage/Section5'
import Login from './Auth/Login'
import { Routes, Route,BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
          </>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
