import Frame5 from '../assets/Frame5.png'
import Frame6 from '../assets/Frame6.png'
import Frame7 from '../assets/house-7313645_1280.jpg'
import Frame8 from '../assets/image23.jpeg'
import Frame9 from '../assets/happy-african-american-bank-manager-shaking-hands-with-client-after-successful-agreement-office.jpg'
import { useNavigate } from 'react-router-dom';
import { Link, Element, scroller } from 'react-scroll';

export default function Section3() {
  const navigate = useNavigate();
  
  return (
    <>
      <Element name="section3">
        {/* Landlord Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-8 md:py-16 gap-8 md:gap-12 lg:gap-24">
          <div className="flex-1 max-w-xl order-2 lg:order-1">
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4'>Are you a <span className="text-[#8B8F92]">Landlord?</span></h1>
            <p className="text-[#8B8F92] font-Poppins text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8">Here's what Landr Offers you</p>
            <ul className="list-disc pl-5 sm:pl-6 text-black font-Poppins space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10">
              <li>A pool of 10k plus active tenants within your vicinity.</li>
              <li>A dashboard for multiple house listing.</li>
              <li>Ease of doing business from the comfort of your homes.</li>
              <li>Control of your estate & finance & tenancy monitoring.</li>
            </ul>
            <button 
              onClick={() => navigate('/signup')}
              className="rounded-[100px] bg-[#02D482] text-white px-6 py-3 text-sm font-Poppins hover:bg-[#02C478] transition-colors w-full sm:w-[180px]"
            >
              Get started
            </button>
          </div>
          
          <div className="flex-1 w-full order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative aspect-video w-full max-w-[650px] mx-auto">
              <img 
                src={Frame9} 
                alt="Landr solutions illustration" 
                className="h-full w-full object-cover rounded-2xl shadow-lg" 
              />
            </div>
          </div>
        </section>

        {/* Tenant Section */}
        <section className="flex flex-col lg:flex-row-reverse items-center justify-between px-4 sm:px-6 md:px-10 py-8 md:py-16 gap-8 md:gap-12 lg:gap-24 bg-[#F2F4F3]">
          <div className="flex-1 max-w-xl order-2 lg:order-2">
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4'>Are you a <span className="text-[#8B8F92]">Tenant?</span></h1>
            <p className="text-[#8B8F92] font-Poppins text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8">Here's what Landr Offers you</p>
            <ul className="list-disc pl-5 sm:pl-6 text-black font-Poppins space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10">
              <li>A pool of 10k plus available houses within your vicinity.</li>
              <li>A regulated housing scheme that ensures you get your money's worth.</li>
              <li>Zero agency/hidden fees.</li>
              <li>A regulated agreement & dispute management channel.</li>
            </ul>
            <button
              onClick={() => navigate('/signup')}
              className="rounded-[100px] bg-[#02D482] text-white px-6 py-3 text-sm font-Poppins hover:bg-[#02C478] transition-colors w-full sm:w-[180px]"
            >
              Get started
            </button>
          </div>
          
          <div className="flex-1 w-full order-1 lg:order-1 mb-8 lg:mb-0">
            <div className="relative aspect-video w-full max-w-[650px] mx-auto">
              <img 
                src={Frame8} 
                alt="Landr solutions illustration" 
                className="h-full w-full object-cover rounded-2xl shadow-lg" 
              />
            </div>
          </div>
        </section>

        {/* Enterprise Section */}
        <section className="flex flex-col lg:flex-row-reverse items-center justify-between px-4 sm:px-6 md:px-10 py-8 md:py-16 gap-8 md:gap-12 lg:gap-24">
          <div className="flex-1 w-full order-2 lg:order-2 mb-8 lg:mb-0">
            <div className="relative aspect-video w-full max-w-[650px] mx-auto">
              <img 
                src={Frame7} 
                alt="Landr tenant dashboard illustration" 
                className="h-full w-full object-cover rounded-2xl shadow-lg" 
              />
            </div>
          </div>
         
          <div className="flex-1 max-w-xl order-1 lg:order-1">
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4'>Are you an <span className="text-[#8B8F92]">enterprise?</span></h1>
            <p className="text-[#8B8F92] font-Poppins text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8">Here's what Landr Offers you</p>
            <ul className="list-disc pl-5 sm:pl-6 text-black font-Poppins space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10">
              <li>A pool of 10k plus available clients within your vicinity.</li>
              <li>A regulated housing scheme that ensures you get your money's worth.</li>
              <li>Zero agency/hidden fees.</li>
              <li>A regulated agreement & dispute management channel.</li>
            </ul>
            <button 
              onClick={() => navigate('/signup')}
              className="rounded-[100px] bg-[#02D482] text-white px-6 py-3 text-sm font-Poppins hover:bg-[#02C478] transition-colors w-full sm:w-[180px]"
            >
              Get started
            </button>
          </div>
          
         
        </section>
      </Element>
    </>
  )
}