import Frame5 from '../assets/Frame5.png'
import Frame6 from '../assets/Frame6.png'
import Frame7 from '../assets/Frame7.png'
import { Link, Element, scroller } from 'react-scroll';
import { useModal } from '../contexts/ModalContext'; // Adjust path as needed
import CreateAccountModal from './CreateAccountModal';

export default function Section3(){
     const { openModal } = useModal();
         const handleCreateAccountOpen = () => {
                openModal(<CreateAccountModal />);
            };
    return (
        <>
        <Element name="section3">

        
         <section className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 py-12 md:py-16 gap-12 lg:gap-24">
            <div className="flex-1 max-w-xl">
                <h1 className='text-3xl md:text-4xl font-bold leading-tight mb-4'>Are you a <span className="text-[#8B8F92]">Landlord?</span></h1>
                <p className="text-[#8B8F92] font-Poppins text-xl md:text-2xl mb-8">Here's what Landr Offers you</p>
                <ul className="list-disc pl-6 text-black font-Poppins space-y-4 text-lg md:text-xl leading-relaxed mb-10">
                    <li>A pool of 10k plus active tenants within your vicinity.</li>
                    <li>A dashboard for multiple house listing.</li>
                    <li>Ease of doing business from the comfort of your homes.</li>
                    <li>Control of your estate & finance & tenancy monitoring.</li>
                </ul>
                <button 
                  onClick={() => {
                  
                   handleCreateAccountOpen();
                                       }}
                className="rounded-[100px] bg-[#02D482] text-white px-6 py-3 text-sm font-Poppins hover:bg-[#02C478] transition-colors" style={{ width: '180px' }}>
                    Get started
                </button>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
                <img src={Frame5} alt="Landr dashboard illustration" className="h-auto w-full max-w-[500px] object-contain" />
            </div>
        </section>

        <section className="flex flex-col lg:flex-row-reverse items-center justify-between px-6 md:px-10 py-12 md:py-16 gap-12 lg:gap-24 bg-[#F2F4F3]">
            <div className="flex-1 max-w-xl">
                <h1 className='text-3xl md:text-4xl font-bold leading-tight mb-4'>Are you a <span className="text-[#8B8F92]">Tenant?</span></h1>
                <p className="text-[#8B8F92] font-Poppins text-xl md:text-2xl mb-8">Here's what Landr Offers you</p>
                <ul className="list-disc pl-6 text-black font-Poppins space-y-4 text-lg md:text-xl leading-relaxed mb-10">
                    <li>A pool of 10k plus available houses within your vicinity.</li>
                    <li>A regulated housing scheme that ensures you get your money's worth.</li>
                    <li>Zero agency/hidden fees.</li>
                    <li>A regulated agreement & dispute management channel.</li>
                </ul>
                <button
                  onClick={() => {
                  
                   handleCreateAccountOpen();
                                       }}
                className="rounded-[100px] bg-[#02D482] text-white px-6 py-3 text-sm font-Poppins hover:bg-[#02C478] transition-colors" style={{ width: '180px' }}>
                    Get started
                </button>
            </div>
            <div className="flex-1 flex justify-center lg:justify-start">
                <img src={Frame6} alt="Landr tenant dashboard illustration" className="h-auto w-full max-w-[500px] object-contain" />
            </div>
        </section>

          <section className="flex flex-col lg:flex-row-reverse items-center justify-between px-6 md:px-10 py-12 md:py-16 gap-12 lg:gap-24 ">
             <div className="flex-1 flex justify-center lg:justify-start">
                <img src={Frame7} alt="Landr tenant dashboard illustration" className="h-auto w-full max-w-[500px] object-contain" />
            </div>
            <div className="flex-1 max-w-xl">
                <h1 className='text-3xl md:text-4xl font-bold leading-tight mb-4'>Are you an <span className="text-[#8B8F92]">enterprise?</span></h1>
                <p className="text-[#8B8F92] font-Poppins text-xl md:text-2xl mb-8">Here's what Landr Offers you</p>
                <ul className="list-disc pl-6 text-black font-Poppins space-y-4 text-lg md:text-xl leading-relaxed mb-10">
                    <li>A pool of 10k plus available clients within your vicinity.</li>
                    <li>A regulated housing scheme that ensures you get your money's worth.</li>
                    <li>Zero agency/hidden fees.</li>
                    <li>A regulated agreement & dispute management channel.</li>
                </ul>
                <button 
                  onClick={() => {
                  
                   handleCreateAccountOpen();
                                       }}
                className="rounded-[100px] bg-[#02D482] text-white px-6 py-3 text-sm font-Poppins hover:bg-[#02C478] transition-colors" style={{ width: '180px' }}>
                    Get started
                </button>
            </div>
           
        </section>
        </Element>
        </>
    )
}