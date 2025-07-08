import Frame1 from '../assets/Frame1.png'
import Frame2 from '../assets/Frame2.png'
import Frame3 from '../assets/Frame 3.png'

export default function Section1 (){
    return(
        <section className='flex flex-col gap-12 px-6 md:px-10 py-8 md:py-12'>
            <div className='flex flex-col gap-6 max-w-4xl'>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Find your next home without middlemen.</h1>
                <p className="text-lg md:text-xl font-Poppins text-gray-500 leading-relaxed max-w-3xl">
                    Connect directly with landlords and tenants from the comfort of your home.<br />
                    No agents. No fees. Just honest housing.
                </p>
                <button className="rounded-[100px] bg-[#02D482] text-white px-6 py-3 text-sm font-Poppins hover:bg-[#02C478] transition-colors w-fit" style={{ width: '180px' }}>
                    Get started
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-center justify-center">
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
    )
}