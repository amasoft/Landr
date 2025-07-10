import Frame8 from '../assets/Frame8.png'
import { Link, Element, scroller } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

export default function Section4 (){
    const navigate = useNavigate();
  
    return(
        <Element name="section4">

     
        <section className='px-6 md:px-10 py-12 md:py-16'>
            <div className='bg-[#F2F4F3] rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
                <div className='flex-1 max-w-2xl'>
                    <h1 className='text-3xl md:text-4xl font-bold leading-tight mb-6'>
                        See how we solve <span className="text-[#8B8F92]">solutions effectively</span>
                    </h1>
                    <p className='font-Poppins text-lg leading-relaxed mb-6 text-gray-700'>
                        At Landr, our focus is the Nigerian. The average people working extremely hard, but facing monstrous housing costs, that ought not to be so. We believe in our resolve to ensure everyone has a home.
                    </p>
                    <p className='font-Poppins font-bold text-lg mb-8 text-gray-800'>
                        - The team at Landr.
                    </p>
                    <button
                      onClick={() => {
                  navigate('/signup')
                                       }}
                    className="rounded-[100px] bg-[#02D482] text-white px-6 py-3 text-sm font-Poppins hover:bg-[#02C478] transition-colors" style={{ width: '180px' }}>
                        Get started
                    </button>
                </div>
                
                <div className="flex-1 flex justify-center lg:justify-end">
                    <img src={Frame8} alt="Landr solutions illustration" className="h-auto w-full max-w-[400px] lg:max-w-[500px] object-contain" />
                </div>
            </div>
        </section>
           </Element>
    )
}