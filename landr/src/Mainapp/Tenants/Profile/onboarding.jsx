import { useNavigate } from "react-router-dom";
import { MoveLeft, Camera, Upload } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/TenantsMainapp/profile/onboarding2");
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto"> {/* Changed max-w-4xl to max-w-md for better form width */}
           <button
                            className="flex items-center absolute left-8 gap-2 text-gray-700 hover:text-[#02D482] transition-colors"
                            onClick={() => window.history.back()}
                        >
                            <MoveLeft className="w-10 h-10" />
                        </button>
        <h1 className="text-2xl sm:text-3xl text-center font-bold ">Welcome to Landr!</h1>
        <p className="text-[#02D482] font-Poppins text-center mb-8">
          Let's get you set up with your profile.
        </p>
        
        {/* Profile Setup Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium font-Poppins text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
              placeholder="123-456-7890"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium font-Poppins text-gray-700 mb-1">Street of Residence</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
              placeholder="123 Main St"
            />
          </div>    
          
          <div>
            <label className="block text-sm font-medium font-Poppins text-gray-700 mb-1">LGA of Residence</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
              placeholder="Lagos Mainland"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium font-Poppins text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
              placeholder="date of birth"
            />
          </div>
          
          <button
            type="submit"
            onClick={handleNext}
            className="w-full bg-[#02D482] text-white px-6 py-3 font-medium rounded-lg hover:bg-green-600 transition-colors mt-4"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}