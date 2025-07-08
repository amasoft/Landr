import Navbar from './webpage/navbar'
import Section1 from './webpage/section1'
import Section2 from './webpage/section2'
import Section3 from './webpage/Section3'
import Section4 from './webpage/Section4'
import Section5 from './webpage/Section5'
import TenatLogin from './Auth/TenatLogin'
import LanlordLogin from './Auth/LanlordLogin'
import EnterpriseLogin from './Auth/EnterpriseLogin'
import { Routes, Route,BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
    <BrowserRouter>
       
      <Routes>
        <Route path="/" element={
          <>
           <Navbar />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
          </>
        } />
        <Route path="/LanlordLogin" element={<LanlordLogin />} />
        <Route path="/TenatLogin" element={<TenatLogin />} />
        <Route path="/EnterpriseLogin" element={<EnterpriseLogin />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
