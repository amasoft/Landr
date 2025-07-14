@@ .. @@
 import logo from '../assets/Landr.png'
 import { Link } from 'react-scroll';
-import { ToastContainer, toast } from 'react-toastify'
+import { ToastContainer, toast } from 'react-toastify';
+import 'react-toastify/dist/ReactToastify.css';
 import { useNavigate } from 'react-router-dom';
 import { X } from 'lucide-react';
 import React, { useState } from 'react';
 
@@ .. @@
     const [loginData, setLoginData] = useState({
         email: '',
         password: ''
     });
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState('');
+    const [showPassword, setShowPassword] = useState(false);
 
     const navigate = useNavigate();
     
@@ .. @@
         }));
     }
 
+    const validateLoginForm = () => {
+        if (!loginData.email.trim()) {
+            return 'Email is required';
+        }
+        if (!loginData.password) {
+            return 'Password is required';
+        }
+        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
+        if (!emailRegex.test(loginData.email)) {
+            return 'Please enter a valid email address';
+        }
+        return null;
+    };
+
     async function handleLoginSubmit(e) {
         e.preventDefault();
         setIsLoading(true);
         setError('');
 
+        // Validate form
+        const validationError = validateLoginForm();
+        if (validationError) {
+            setError(validationError);
+            setIsLoading(false);
+            return;
+        }
+
         try {
-            const response = await fetch('/api/api/Authentications/UserLogin', {
+            const response = await fetch('/api/Authentications/UserLogin', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
+                    'Accept': 'application/json',
                 },
                 body: JSON.stringify({
                     email: loginData.email,
@@ -78,25 +100,35 @@ export default function Navbar() {
                 })
             });
 
+            let data;
+            const contentType = response.headers.get('content-type');
+            
+            if (contentType && contentType.includes('application/json')) {
+                data = await response.json();
+            } else {
+                throw new Error('Server returned invalid response format');
+            }
+
             if (!response.ok) {
-                throw new Error(`Login failed: ${response.status}`);
+                throw new Error(data.message || data.error || `Login failed: ${response.status}`);
             }
 
-            const data = await response.json();
-            
-            
-            console.log('Login successful:', data);
-            toast.success("welcome back" + data.firstName + " " + data.lastName, {
+            // Store authentication data
+            if (data.token) {
+                localStorage.setItem('userToken', data.token);
+            }
+            if (data.role) {
+                localStorage.setItem('userType', data.role);
+            }
+            if (data.id || data.userId) {
+                localStorage.setItem('userId', data.id || data.userId);
+            }
+
+            toast.success(`Welcome back ${data.firstName || ''} ${data.lastName || ''}!`, {
                 position: "top-right",
-                autoClose: 5000,}
-            )
-        
-            
-            
-           
-            navigate ("/TenantsMainapp")
-            
-          
+                autoClose: 3000,
+            });
+
+            // Close modal and reset form
+            handleLoginClose();
+
+            // Navigate based on user role
+            const userRole = data.role || 'tenant';
+            if (userRole === 'landlord') {
+                navigate('/LandlordMainapp');
+            } else if (userRole === 'tenant') {
+                navigate('/TenantsMainapp');
+            } else if (userRole === 'enterprise') {
+                navigate('/EnterpriseMainapp');
+            } else {
+                navigate('/TenantsMainapp'); // Default fallback
+            }
             
         } catch (err) {
-            console.error('Login error:', err);
-            setError(err.message || 'Login failed. Please try again.');
+            if (err.name === 'TypeError' && err.message.includes('fetch')) {
+                setError('Network error. Please check your connection and try again.');
+            } else if (err.message.toLowerCase().includes('unauthorized') || 
+                      err.message.toLowerCase().includes('invalid credentials')) {
+                setError('Invalid email or password. Please try again.');
+            } else {
+                setError(err.message || 'Login failed. Please try again.');
+            }
         } finally {
             setIsLoading(false);
         }
@@ .. @@
                         <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
                             <input
                                 type="email"
                                 name="email"
                                 placeholder="Email"
                                 value={loginData.email}
                                 onChange={handleInputChange}
-                                className="border-gray-600 border rounded-[100px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02D482]"
+                                className="border-gray-300 border rounded-[100px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                                 required
                                 disabled={isLoading}
+                                autoComplete="email"
                             />
-                            <input
-                                type="password"
-                                name="password"
-                                placeholder="Password"
-                                value={loginData.password}
-                                onChange={handleInputChange}
-                                className="border-gray-600 border rounded-[100px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02D482]"
-                                required
-                                disabled={isLoading}
-                            />
+                            <div className="relative">
+                                <input
+                                    type={showPassword ? "text" : "password"}
+                                    name="password"
+                                    placeholder="Password"
+                                    value={loginData.password}
+                                    onChange={handleInputChange}
+                                    className="border-gray-300 border rounded-[100px] px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all w-full"
+                                    required
+                                    disabled={isLoading}
+                                    autoComplete="current-password"
+                                />
+                                <button
+                                    type="button"
+                                    onClick={() => setShowPassword(!showPassword)}
+                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
+                                    disabled={isLoading}
+                                >
+                                    {showPassword ? '👁️' : '👁️‍🗨️'}
+                                </button>
+                            </div>
                             <button
                                 type="submit"
-                                className="rounded-[100px] bg-[#02D482] text-white px-6 py-2 font-Poppins hover:bg-[#02C478] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
+                                className={`rounded-[100px] ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#02D482] hover:bg-green-600'} text-white px-6 py-3 font-Poppins transition-colors`}
                                 disabled={isLoading}
                             >
                                 {isLoading ? 'Logging in...' : 'Login'}
                             </button>
+                            
+                            <div className="text-center">
+                                <button
+                                    type="button"
+                                    onClick={() => {
+                                        handleLoginClose();
+                                        navigate('/signup');
+                                    }}
+                                    className="text-sm text-[#02D482] hover:underline"
+                                    disabled={isLoading}
+                                >
+                                    Don't have an account? Sign up here
+                                </button>
+                            </div>
                         </form>
                     </div>
                 </div>
@@ .. @@
     );
 }