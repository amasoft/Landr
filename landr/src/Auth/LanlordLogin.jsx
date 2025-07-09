import logo from '../assets/Landr.png'
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

export default function LanlordLogin() {
    const navigate = useNavigate();
    return(
        <>
          <div>
            
                <button
                    className="flex items-center absolute left-8 gap-2  text-gray-700 hover:text-[#02D482] transition-colors"
                    onClick={() => window.history.back()}
                >
                    <MoveLeft className="w-10 h-10" />
                
                </button>
                
            <img src={logo} alt="Landr Logo" className="mx-auto mt-8" />
            <h1 className="text-[20px] font-bold text-center mt-4">Create your Landr landlord account</h1>
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
                    <label htmlFor="middlename" className="text-sm font-medium font-Poppins text-gray-700">middle name(optional)</label>
                    <input
                        id="middlename"
                        type="text"
                        placeholder="Enter your middle name"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                      
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
                    <label htmlFor="phone" className="text-sm font-medium font-Poppins text-gray-700">Phone number</label>
                    <div className="flex gap-2">
                        <select
                            className="border-gray-300 border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all bg-white"
                            required
                        >
                            <option value="+234">🇳🇬 +234</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+27">🇿🇦 +27</option>
                            <option value="+233">🇬🇭 +233</option>
                            <option value="+254">🇰🇪 +254</option>
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+86">🇨🇳 +86</option>
                        </select>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="flex-1 border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="state" className="text-sm font-medium font-Poppins text-gray-700">State of residence</label>
                    <input
                        id="state"
                        type="text"
                        placeholder="Enter your state"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="street" className="text-sm font-medium font-Poppins text-gray-700">Street</label>
                    <input
                        id="street"
                        type="text"
                        placeholder="Enter your street"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lga" className="text-sm font-medium font-Poppins text-gray-700">LGA</label>
                    <input
                        id="lga"
                        type="text"
                        placeholder="Enter your LGA"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="age" className="text-sm font-medium font-Poppins text-gray-700">Age</label>
                    <input
                        id="age"
                        type="number"
                        placeholder="Enter your age"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="religion" className="text-sm font-medium font-Poppins text-gray-700">Religion</label>
                    <select
                        id="religion"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all bg-white"
                        required
                    >
                        <option value="">Select your religion</option>
                        <option value="christianity">Christianity</option>
                        <option value="islam">Islam</option>
                        <option value="judaism">Judaism</option>
                        <option value="hinduism">Hinduism</option>
                        <option value="buddhism">Buddhism</option>
                        <option value="traditional">Traditional African Religion</option>
                        <option value="other">Other</option>
                        <option value="none">Prefer not to say</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="country" className="text-sm font-medium font-Poppins text-gray-700">Country</label>
                    <select
                        id="country"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all bg-white"
                        required
                    >
                        <option value="">Select your country</option>
                        <option value="nigeria">🇳🇬 Nigeria</option>
                        <option value="ghana">🇬🇭 Ghana</option>
                        <option value="south-africa">🇿🇦 South Africa</option>
                        <option value="kenya">🇰🇪 Kenya</option>
                        <option value="egypt">🇪🇬 Egypt</option>
                        <option value="morocco">🇲🇦 Morocco</option>
                        <option value="ethiopia">🇪🇹 Ethiopia</option>
                        <option value="uganda">🇺🇬 Uganda</option>
                        <option value="tanzania">🇹🇿 Tanzania</option>
                        <option value="cameroon">🇨🇲 Cameroon</option>
                        <option value="united-states">🇺🇸 United States</option>
                        <option value="united-kingdom">🇬🇧 United Kingdom</option>
                        <option value="canada">🇨🇦 Canada</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="House" className="text-sm font-medium font-Poppins text-gray-700">House Type</label>
                    <select
                        id="House"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all bg-white"
                        required
                    >
                        <option value="">Select house type</option>
                        <option value="apartment">🏢 Apartment</option>
                        <option value="duplex">🏠 Duplex</option>
                        <option value="bungalow">🏡 Bungalow</option>
                        <option value="flat">🏘️ Flat</option>
                        <option value="mini-flat">🏠 Mini Flat</option>
                        <option value="self-contain">🏠 Self Contain</option>
                        <option value="room-and-parlour">🏠 Room and Parlour</option>
                        <option value="studio">🏠 Studio</option>
                        <option value="terrace">🏘️ Terrace</option>
                        <option value="detached">🏡 Detached House</option>
                        <option value="semi-detached">🏡 Semi-Detached</option>
                        <option value="penthouse">🏢 Penthouse</option>
                        <option value="mansion">🏰 Mansion</option>
                        <option value="other">Other</option>
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
                        className="h-4 w-4 border-gray-300 rounded focus:ring-[#02D482] transition-all"
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
                      onClick={() => navigate('/TenantLogin2')}
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