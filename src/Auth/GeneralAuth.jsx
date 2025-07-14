@@ .. @@
 import logo from '../assets/Landr.png'
 import React, { useState } from 'react';
-import { ToastContainer, toast } from 'react-toastify'
+import { ToastContainer, toast } from 'react-toastify';
+import 'react-toastify/dist/ReactToastify.css';
 import { useNavigate } from 'react-router-dom';
 import { MoveLeft } from 'lucide-react';
 
@@ .. @@
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState('');
+    const [showPassword, setShowPassword] = useState(false);
+    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 
@@ .. @@
         }));
     };
 
+    const validateEmail = (email) => {
+        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
+        return emailRegex.test(email);
+    };
+
+    const validatePassword = (password) => {
+        // At least 8 characters, one uppercase, one lowercase, one number
+        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
+        return passwordRegex.test(password);
+    };
+
+    const validateForm = () => {
+        const errors = [];
+        
+        if (!formData.firstName.trim()) {
+            errors.push('First name is required');
+        }
+        
+        if (!formData.lastName.trim()) {
+            errors.push('Last name is required');
+        }
+        
+        if (!formData.email.trim()) {
+            errors.push('Email is required');
+        } else if (!validateEmail(formData.email)) {
+            errors.push('Please enter a valid email address');
+        }
+        
+        if (!formData.password) {
+            errors.push('Password is required');
+        } else if (!validatePassword(formData.password)) {
+            errors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
+        }
+        
+        if (formData.password !== formData.confirmPassword) {
+            errors.push('Passwords do not match');
+        }
+        
+        if (!formData.termsAccepted) {
+            errors.push('Please accept the terms of use');
+        }
+        
+        return errors;
+    };
+
     const registerUser = async (userData) => {
         try {
-            const response = await fetch('/api/api/Authentications/CreateUser', {
+            const response = await fetch('/api/Authentications/CreateUser', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
+                    'Accept': 'application/json',
                 },
                 body: JSON.stringify(userData)
             });
 
-            // Log the response for debugging
-            console.log('Response status:', response.status);
-            console.log('Response headers:', response.headers);
-            
-            // Get the response text first
-            const responseText = await response.text();
-            console.log('Response text:', responseText);
+            let data;
+            const contentType = response.headers.get('content-type');
+            
+            if (contentType && contentType.includes('application/json')) {
+                data = await response.json();
+            } else {
+                const text = await response.text();
+                throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
+            }
 
             if (!response.ok) {
-                // Try to parse as JSON, but handle cases where it's not JSON
-                let errorData = {};
-                try {
-                    errorData = JSON.parse(responseText);
-                } catch (jsonError) {
-                    console.error('Response is not valid JSON:', responseText);
-                    throw new Error(`Server error: ${response.status} - ${responseText.substring(0, 100)}`);
-                }
-                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
+                throw new Error(data.message || data.error || `Registration failed: ${response.status}`);
             }
 
-            // Parse the successful response
-            let data = {};
-            try {
-                data = JSON.parse(responseText);
-            } catch (jsonError) {
-                console.error('Success response is not valid JSON:', responseText);
-                throw new Error('Invalid response format from server');
-            }
-
-            toast.success('Registration successful! go to the login screen');
+            toast.success('Registration successful! Please login to continue.');
             return data;
+            
         } catch (error) {
-            console.error('Registration error:', error);
-            throw error;
+            if (error.name === 'TypeError' && error.message.includes('fetch')) {
+                throw new Error('Network error. Please check your connection and try again.');
+            }
+            throw new Error(error.message || 'Registration failed. Please try again.');
         }
     };
 
-
-    const handleLogin = async (e) => {
+    const handleRegistration = async (e) => {
         e.preventDefault();
         setError('');
         
-      
-        if (formData.password !== formData.confirmPassword) {
-            setError('Passwords do not match');
-            return;
-        }
-        
-        if (!formData.termsAccepted) {
-            setError('Please accept the terms of use');
+        // Validate form
+        const validationErrors = validateForm();
+        if (validationErrors.length > 0) {
+            setError(validationErrors[0]); // Show first error
             return;
         }
 
-        
-        if (formData.password.length < 6) {
-            setError('Password must be at least 6 characters long');
-            return;
-        }
-
         setIsLoading(true);
 
         try {
-            
             const userData = {
                 firstName: formData.firstName,
                 lastName: formData.lastName,
                 email: formData.email,
                 role: accountType, 
                 password: formData.password
             };
 
-          
             const result = await registerUser(userData);
             
-          
-            console.log('Registration successful:', result);
-            
-           
+            // Store user data
             if (result.token) {
                 localStorage.setItem('userToken', result.token);
             }
             localStorage.setItem('userType', accountType);
-            localStorage.setItem('userId', result.id || result.userId);
-            
+            if (result.id || result.userId) {
+                localStorage.setItem('userId', result.id || result.userId);
+            }
 
+            // Navigate based on account type
             if (accountType === 'tenant') {
                 navigate('/TenantsMainapp');
             } else if (accountType === 'landlord') {
@@ -184,21 +226,12 @@ export default function GeneralAuth (){
             }
             
         } catch (error) {
-           
-            if (error.message.includes('already exists') || error.message.includes('duplicate')) {
-                setError('An account with this email already exists. Please use a different email or try logging in.');
-            } else if (error.message.includes('invalid email')) {
-                setError('Please enter a valid email address.');
-            } else if (error.message.includes('password')) {
-                setError('Password does not meet requirements. Please try a stronger password.');
-            } else if (error.message.includes('Server error')) {
-                setError('Server error occurred. Please try again later.');
-            } else if (error.message.includes('Invalid response format')) {
-                setError('Server returned an invalid response. Please contact support.');
+            if (error.message.toLowerCase().includes('already exists') || 
+                error.message.toLowerCase().includes('duplicate')) {
+                setError('An account with this email already exists. Please try logging in instead.');
             } else {
-                setError('Registration failed. Please check your information and try again.');
+                setError(error.message);
             }
-            console.error('Registration error:', error);
         } finally {
             setIsLoading(false);
         }
@@ .. @@
             <form className="flex flex-col gap-5 max-w-md mx-auto mt-8 bg-white p-8 rounded-3xl shadow-lg" onSubmit={handleLogin}>
+            <form className="flex flex-col gap-5 max-w-md mx-auto mt-8 bg-white p-8 rounded-3xl shadow-lg" onSubmit={handleRegistration}>
                 <div className="flex flex-col gap-1">
@@ .. @@
                 <div className="flex flex-col gap-1">
                     <label htmlFor="password" className="text-sm font-medium font-Poppins text-gray-700">Password</label>
-                    <input
-                        id="password"
-                        name="password"
-                        type="password"
-                        placeholder="Enter your password"
-                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
-                        value={formData.password}
-                        onChange={handleInputChange}
-                        required
-                        minLength={6}
-                    />
+                    <div className="relative">
+                        <input
+                            id="password"
+                            name="password"
+                            type={showPassword ? "text" : "password"}
+                            placeholder="Enter your password"
+                            className="border-gray-300 border rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all w-full"
+                            value={formData.password}
+                            onChange={handleInputChange}
+                            required
+                        />
+                        <button
+                            type="button"
+                            onClick={() => setShowPassword(!showPassword)}
+                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
+                        >
+                            {showPassword ? '👁️' : '👁️‍🗨️'}
+                        </button>
+                    </div>
+                    <p className="text-xs text-gray-500 mt-1">
+                        Password must be at least 8 characters with uppercase, lowercase, and number
+                    </p>
                 </div>
                 
                 <div className="flex flex-col gap-1">
                     <label htmlFor="confirmPassword" className="text-sm font-medium font-Poppins text-gray-700">Confirm password</label>
-                    <input
-                        id="confirmPassword"
-                        name="confirmPassword"
-                        type="password"
-                        placeholder="Confirm your password"
-                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
-                        value={formData.confirmPassword}
-                        onChange={handleInputChange}
-                        required
-                    />
+                    <div className="relative">
+                        <input
+                            id="confirmPassword"
+                            name="confirmPassword"
+                            type={showConfirmPassword ? "text" : "password"}
+                            placeholder="Confirm your password"
+                            className="border-gray-300 border rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all w-full"
+                            value={formData.confirmPassword}
+                            onChange={handleInputChange}
+                            required
+                        />
+                        <button
+                            type="button"
+                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
+                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
+                        >
+                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
+                        </button>
+                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2">
@@ .. @@
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
                     className={`rounded-[100px] ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#02D482] hover:bg-green-600'} text-white px-4 py-3 text-[13px] font-Poppins transition-colors`}
                     type='submit'
                     disabled={isLoading}
                 >
                     {isLoading ? 'Creating Account...' : 'Create Account'}
                 </button>
+                
+                <div className="text-center">
+                    <p className="text-sm text-gray-600">
+                        Already have an account?{' '}
+                        <button
+                            type="button"
+                            onClick={() => navigate('/')}
+                            className="text-[#02D482] hover:underline font-medium"
+                        >
+                            Sign in here
+                        </button>
+                    </p>
+                </div>
             </form>
         </div>
         </>
     )
 }