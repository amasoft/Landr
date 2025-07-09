//Wensite components
import Navbar from './webpage/navbar'
import Section1 from './webpage/section1'
import Section2 from './webpage/section2'
import Section3 from './webpage/Section3'
import Section4 from './webpage/Section4'
import Section5 from './webpage/Section5'
//login components
import TenatLogin from './Auth/TenatLogin'
import TenantLogin2 from './Auth/TenantLogin2'
import LanlordLogin from './Auth/LanlordLogin'
import LanlordLogin2 from './Auth/LanlordLogin2'
import EnterpriseLogin from './Auth/EnterpriseLogin'
//mainapp components
import LandlordMainapp from './Mainapp/Landlords/LandlordMainapp'
import TenantsMainapp from './Mainapp/Tenants/tenantsMainapp'
import { Routes, Route,BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './contexts/ModalContext';
import './App.css'

function App() {


  return (
    <>
    
    <BrowserRouter>
        <ModalProvider>
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
        //login routes
        <Route path="/LanlordLogin" element={<LanlordLogin />} />
        <Route path="/LanlordLogin2" element={<LanlordLogin2 />} />
        <Route path="/TenantLogin2" element={<TenantLogin2 />} />
        <Route path="/TenatLogin" element={<TenatLogin />} />
        <Route path="/EnterpriseLogin" element={<EnterpriseLogin />} />
        <Route path="/LandlordMainapp" element={<LandlordMainapp />} />
        <Route path="/TenantsMainapp" element={<TenantsMainapp />} />
      </Routes>
       </ModalProvider>
    </BrowserRouter>
    
    </>
  )
}

export default App
