import logo from '../assets/Landr.png'

export default function TenantLogin (){
    return (
        <>
        <div>
            <img src={logo} alt="Landr Logo" className="mx-auto mt-8" />
            <h1 className="text-[20px] font-bold text-center mt-4">Create your Landr tenant account</h1>
            <p className='text-center font-Poppins text-[14px]'>Fill in the information to get started</p>
            <form className="flex flex-col gap-5 max-w-md mx-auto mt-8 bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex flex-col gap-1">
                    <label htmlFor="fullname" className="text-sm font-medium font-Poppins text-gray-700">Full name</label>
                    <input
                        id="fullname"
                        type="text"
                        placeholder="Enter your full name"
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
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="state" className="text-sm font-medium font-Poppins text-gray-700">State of residency</label>
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
                    <label htmlFor="country" className="text-sm font-medium font-Poppins text-gray-700">Country</label>
                    <input
                        id="country"
                        type="text"
                        placeholder="Enter your country"
                        className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                        required
                    />
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
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mt-2 transition-all"
                >
                    Login
                </button>
            </form>
        </div>
        </>
    )
}