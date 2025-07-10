import Frame1 from '../assets/Frame1.png'
import Frame2 from '../assets/Frame2.png'
import Frame3 from '../assets/Frame 3.png'
import { useNavigate } from 'react-router-dom';
import { Link, Element, scroller } from 'react-scroll';


export default function Section1 (){
   ;
  
    const navigate = useNavigate();
    return(
        <Element name="section1">
            <>
             <section className='flex flex-col gap-12 px-6 md:px-10 py-8 md:py-12'>
                <div className='flex flex-col gap-6 max-w-4xl'>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Find your next home without middlemen.</h1>
                    <p className="text-lg md:text-xl font-Poppins text-gray-500 leading-relaxed max-w-3xl">
                        Connect directly with landlords and tenants from the comfort of your home.<br />
                        No agents. No fees. Just honest housing.
                    </p>
                    <div className="flex gap-4">
                        <button
                       onClick={() => {
                  
              navigate('/signup')
                                       }}
                            className="rounded-[100px] bg-[#02D482] text-white px-6 py-3 text-sm font-Poppins hover:bg-[#02C478] transition-colors w-fit" style={{ width: '180px' }}>
                            Get started
                        </button>
                     
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-start justify-items-start">
                    <div className="flex-1 max-w-sm">
                        <img src={Frame1} alt="Landlord dashboard preview" className="w-full h-auto rounded-lg shadow-sm" />
                    </div>
                    <div className="flex-1 max-w-sm">
                        <img src={Frame2} alt="Property listing preview" className="w-full h-auto rounded-lg shadow-sm" />
                    </div>
                    <div className="flex-1 max-w-sm">
                        <img src={Frame3} alt="Tenant dashboard preview" className="w-full h-auto rounded-lg shadow-sm" />
                    </div>
                </div>
            </section>

            <div className='overflow-hidden bg-[#02D482] text-white p-2'>
                <div
                    className="whitespace-nowrap animate-marquee text-center text-lg font-semibold"
                    style={{
                        display: 'inline-block',
                        minWidth: '100%',
                        animation: 'marquee 12s linear infinite'
                    }}
                >
                    Join Landr today &amp; truly live within your means.
                </div>
            </div>
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 12s linear infinite;
                }
                `}
            </style>

          
            </>
        </Element>
    )
}