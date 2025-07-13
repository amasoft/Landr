import logo from '../assets/Landr.png'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

export default function GeneralAuth (){
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState('tenant');
    

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        privacyAccepted: false
    });
    
  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

 
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const registerUser = async (userData) => {
        try {
            const response = await fetch('/api/api/Authentications/CreateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            // Log the response for debugging
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            // Get the response text first
            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (!response.ok) {
                // Try to parse as JSON, but handle cases where it's not JSON
                let errorData = {};
                try {
                    errorData = JSON.parse(responseText);
                } catch (jsonError) {
                    console.error('Response is not valid JSON:', responseText);
                    throw new Error(`Server error: ${response.status} - ${responseText.substring(0, 100)}`);
                }
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // Parse the successful response
            let data = {};
            try {
                data = JSON.parse(responseText);
            } catch (jsonError) {
                console.error('Success response is not valid JSON:', responseText);
                throw new Error('Invalid response format from server');
            }

            toast.success('Registration successful! go to the login screen');
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
      
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        if (!formData.termsAccepted) {
            setError('Please accept the terms of use');
            return;
        }

        
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);

        try {
            
            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: accountType, 
                password: formData.password
            };

          
            const result = await registerUser(userData);
            
          
            console.log('Registration successful:', result);
            
           
            if (result.token) {
                localStorage.setItem('userToken', result.token);
            }
            localStorage.setItem('userType', accountType);
            localStorage.setItem('userId', result.id || result.userId);
            

            if (accountType === 'tenant') {
                navigate('/TenantsMainapp');
            } else if (accountType === 'landlord') {
                navigate('/LandlordMainapp');
            } else if (accountType === 'enterprise') {
                navigate('/EnterpriseMainapp');
            }
            
        } catch (error) {
           
            if (error.message.includes('already exists') || error.message.includes('duplicate')) {
                setError('An account with this email already exists. Please use a different email or try logging in.');
            } else if (error.message.includes('invalid email')) {
                setError('Please enter a valid email address.');
            } else if (error.message.includes('password')) {
                setError('Password does not meet requirements. Please try a stronger password.');
            } else if (error.message.includes('Server error')) {
                setError('Server error occurred. Please try again later.');
            } else if (error.message.includes('Invalid response format')) {
                setError('Server returned an invalid response. Please contact support.');
            } else {
                setError('Registration failed. Please check your information and try again.');
            }
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <div>
            <button
                className="flex items-center absolute left-8 gap-2  text-gray-700 hover:text-[#02D482] transition-colors"
                onClick={() => window.history.back()}
            >
                <MoveLeft className="w-10 h-10" />
            </button>
                <ToastContainer  />
            <img src={logo} alt="Landr Logo" className="mx-auto mt-8" />
            <h1 className="text-[20px] font-bold text-center mt-4">Create your Landr account</h1>
            <p className='text-center font-Poppins text-[14px] text-[#02D482]'>Fill in the information to get started</p>
            
          
            {error && (
                <div className="max-w-md mx-auto mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            <form className="flex flex-col gap-5 max-w-md mx-auto mt-8 bg-white p-8 rounded-3xl shadow-lg" onSubmit={handleLogin}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="firstName" className="text-sm font-medium font-Poppins text-gray-700">First name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
               
                <div className="flex flex-col gap-1">
                    <label htmlFor="lastName" className="text-sm font-medium font-Poppins text-gray-700">Last name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your Last name"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium font-Poppins text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                  
                <div className="flex flex-col gap-1">
                    <label htmlFor="Account" className="text-sm font-medium font-Poppins text-gray-700">Account Type</label>
                    <select 
                        required 
                        onChange={(e) => setAccountType(e.target.value)} 
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        value={accountType}
                    >
                        <option value="tenant">Tenant</option>
                        <option value="landlord">Landlord</option>
                        <option value="enterprise">Enterprise</option>
                    </select>
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium font-Poppins text-gray-700">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                    />
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="text-sm font-medium font-Poppins text-gray-700">Confirm password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="flex items-center gap-2">
                    <input
                        id="terms"
                        name="termsAccepted"
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 text-[#02D482] rounded focus:ring-[#02D482] transition-all"
                        checked={formData.termsAccepted}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="terms" className="text-sm font-Poppins text-gray-700">
                        I agree to the <a href="#" className="text-[#02D482] hover:underline">Terms of Use</a> 
                    </label>
                </div>
                
                <div className="flex items-center gap-2">
                    <input
                        id="newsletter"
                        name="privacyAccepted"
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 rounded focus:ring-[#02D482] transition-all"
                        checked={formData.privacyAccepted}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="newsletter" className="text-sm font-Poppins text-gray-700">
                       Your personal data will be processed according to our <a href="#" className="text-[#02D482] hover:underline">Privacy notice</a>
                    </label>
                </div>
                
                <button 
                    className={`rounded-[100px] ${isLoading ? 'bg-gray-400' : 'bg-[#02D482]'} text-white px-4 py-3 text-[13px] font-Poppins`}
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Next'}
                </button>
            </form>
        </div>
        </>
    )
}