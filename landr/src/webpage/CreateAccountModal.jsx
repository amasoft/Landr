// components/CreateAccountModal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import logo from '../assets/Landr.png'; 

const CreateAccountModal = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    closeModal();
    navigate(path);
  };

  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <img src={logo} className='w-15' alt="Logo" />
        <button
          onClick={closeModal}
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
        </button>
      </div>
      
      <h2 className="font-bold mb-4 text-left">Select Your Niche</h2>
      
      <div className="flex flex-col gap-4">
        <button
          className="rounded-[100px] border border-black py-3 px-6 text-[13px] font-Poppins hover:bg-[#02D482] hover:text-white transition-colors"
          onClick={() => handleNavigation('/LanlordLogin')}
        >
          Landlord
        </button>
        <button
          className="rounded-[100px] border border-black py-3 px-6 text-[13px] font-Poppins hover:bg-[#02D482] hover:text-white transition-colors"
          onClick={() => handleNavigation('/TenatLogin')}
        >
          Tenant
        </button>
        <button
          className="rounded-[100px] border border-black py-3 px-6 text-[13px] font-Poppins hover:bg-[#02D482] hover:text-white transition-colors"
          onClick={() => handleNavigation('/EnterpriseLogin')}
        >
          Enterprise
        </button>
      </div>
    </>
  );
};

export default CreateAccountModal;