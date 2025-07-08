import logo from '../assets/Landr.png'
import { Link } from 'react-scroll';
import React, { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = (
        <>
            <Link to="section1" smooth={true} duration={800} className="cursor-pointer" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="section2" smooth={true} duration={800} className="cursor-pointer" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="section3" smooth={true} duration={800} className="cursor-pointer" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link to="section4" smooth={true} duration={800} className="cursor-pointer" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="section5" smooth={true} duration={800} className="cursor-pointer" onClick={() => setMenuOpen(false)}>Contact</Link>
        </>
    );
    const [showLogin, setShowLogin] = useState(false);
  
      function handleLoginOpen() {
          setShowLogin(true);
      }
  
      function handleLoginClose() {
          setShowLogin(false);
      }

    // Helper to determine active link
    const getLinkClass = (isActive) =>
        `cursor-pointer ${isActive ? 'text-black font-semibold' : 'text-gray-500'}`;

    return (
        <>
            <div className="flex justify-between items-center p-4 ml-10 mr-10">
                <img src={logo} className='w-20' />
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-2">
                    <Link
                        to="section1"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        Home
                    </Link>
                    <Link
                        to="section2"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        About Us
                    </Link>
                    <Link
                        to="section3"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        Features
                    </Link>
                    <Link
                        to="section4"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        Services
                    </Link>
                    <Link
                        to="section5"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        Contact
                    </Link>
                </nav>
                {/* Hamburger Icon */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-1 w-6 bg-black mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block h-1 w-6 bg-black mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-1 w-6 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-2">
                    <button
                        className="rounded-[100px] border-black border-1 py-3 px-6 text-[13px] font-Poppins"
                        onClick={handleLoginOpen}
                    >
                        Login
                    </button>
                    <button className="rounded-[100px] bg-[#02D482] text-white px-4 py-3 text-[13px] font-Poppins">Create an account</button>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center pt-24 gap-6">
                    <Link
                        to="section1"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        Home
                    </Link>
                    <Link
                        to="section2"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        About Us
                    </Link>
                    <Link
                        to="section3"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        Features
                    </Link>
                    <Link
                        to="section4"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        Services
                    </Link>
                    <Link
                        to="section5"
                        smooth={true}
                        duration={800}
                        className={({ isActive }) => getLinkClass(isActive)}
                        onClick={() => setMenuOpen(false)}
                        spy={true}
                    >
                        Contact
                    </Link>
                    <button
                        className="rounded-[100px] border-black border-1 py-3 px-6 text-[13px] font-Poppins"
                        onClick={() => {
                            setMenuOpen(false);
                            handleLoginOpen();
                        }}
                    >
                        Login
                    </button>
                    <button className="rounded-[100px] bg-[#02D482] text-white px-4 py-3 text-[13px] font-Poppins">Create an account</button>
                    <button
                        className="absolute top-4 right-6 text-2xl"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/45">
                    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm relative">
                        <div className='flex items-center justify-between mb-6'>
                        <img src={logo} className='w-20' />
                        <button
                            className=""
                            onClick={handleLoginClose}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        </div>
                      
                        <h2 className="text-[] font-bold mb-4 text-left">Login your account Here.</h2>
                        <form className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="border-gray-600 border rounded-[100px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02D482]"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="border-gray-600 border rounded-[100px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02D482]"
                                required
                            />
                            <button
                                type="submit"
                                className="rounded-[100px] bg-[#02D482] text-white px-6 py-2 font-Poppins hover:bg-[#02C478] transition-colors"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}