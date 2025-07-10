import logo from '../assets/Landr.png'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

export default function GeneralAuth (){
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState('tenant');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        if (accountType === 'tenant') {
            navigate('/TenantsMainapp');
        }
        else if (accountType === 'landlord') {
            navigate('/LandlordMainapp');
        }
        else if (accountType === 'enterprise') {
            // Handle enterprise login
        }
    }
    return (
        <>
        <div>
            
                <button
                    className="flex items-center absolute left-8 gap-2  text-gray-700 hover:text-[#02D482] transition-colors"
                    onClick={() => window.history.back()}
                >
                    <MoveLeft className="w-10 h-10" />
                
                </button>
                
            <img src={logo} alt="Landr Logo" className="mx-auto mt-8" />
            <h1 className="text-[20px] font-bold text-center mt-4">Create your Landr account</h1>
            <p className='text-center font-Poppins text-[14px] text-[#02D482]'>Fill in the information to get started</p>
            
            <form className="flex flex-col gap-5 max-w-md mx-auto mt-8 bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex flex-col gap-1">
                    <label htmlFor="firstname" className="text-sm font-medium font-Poppins text-gray-700">first name</label>
                    <input
                        id="firstname"
                        type="text"
                        placeholder="Enter your first name"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
               
                <div className="flex flex-col gap-1">
                    <label htmlFor="lastname" className="text-sm font-medium font-Poppins text-gray-700">Last name</label>
                    <input
                        id="lastname"
                        type="text"
                        placeholder="Enter your Last name"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium font-Poppins text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
                  
                  <div className="flex flex-col gap-1">
                    <label htmlFor="Account" className="text-sm font-medium font-Poppins text-gray-700">Account Type</label>
                    <select required onChange={(e) => setAccountType(e.target.value)} className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all">
                        <option value="tenant">Tenant</option>
                        <option value="landlord">Landlord</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>
                  </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium font-Poppins text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="text-sm font-medium font-Poppins text-gray-700">Confirm password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 text-[#02D482] rounded focus:ring-[#02D482] transition-all"
                        required
                    />
                    <label htmlFor="terms" className="text-sm font-Poppins text-gray-700">
                        I agree to the <a href="#" className="text-[#02D482] hover:underline">Terms of Use</a> 
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        id="newsletter"
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 rounded focus:ring-[#02D482] transition-all"
                    />
                    <label htmlFor="newsletter" className="text-sm font-Poppins text-gray-700">
                       Your personal data will be processed according to our <a href="#" className="text-[#02D482] hover:underline">Privacy notice</a>
                    </label>
                </div>
                <button 
                      onClick={handleLogin}
                        className="rounded-[100px] bg-[#02D482] text-white px-4 py-3 text-[13px] font-Poppins"
                      type='submit'
                    >
                        Next
                    </button>
            </form>
        </div>
        </>
    )
}