import Frame4 from '../assets/Frame4.png'

export default function Section2 (){
    const reasons = [
        {
            heading: "Easy access to affordable housing",
            text: "Landr seeks to reduce the normally arduous task of house hunting. Give us your preferences & we'll do the dirty job for you, while you sip your cold zobo."
        },
        {
            heading: "Tenancy protection",
            text: "Landr seeks to make that helpless feeling house seekers face, when even after exorbitant prices, they have to pay hidden inexplicable fees. Everyone deserves a voice. Landr is speaking for you."
        },
        {
            heading: "Digitalization of real estate",
            text: "The landlord-tenancy industry is still largely analog and stuck on old principles that do not necessarily encourage economic growth. Landr intends to bridge that gap."
        },
        {
            heading: "Investment incentives",
            text: "A digitalized housing system creates jobs and a fertile ground for investments and visible growth. Landr seeks to facilitate this too."
        },
        {
            heading: "Landlord empowerment",
            text: "Landlords also aren't spared from the growing percentage demands. Landr seeks to return the initiative to landowners & establish a fair ground for all parties."
        },
        {
            heading: "Reduction on the cost of housing",
            text: "Housing in Nigeria today is incredibly high & doesn't reflect the prevalent economic indices of the people. Landr seeks to provide a fair ground for everyone to truly get their money's worth."
        }
    ];
    
    return(
        <section className="bg-[#F2F4F3] py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-12 text-left">
                    Why <span className="text-[#8B8F92]">Landr?</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {reasons.map((reason, idx) => (
                        <div key={idx} className="bg-white rounded-[30px] p-6 h-auto min-h-[244px] flex flex-col shadow-sm hover:shadow-md transition-shadow">
                            <div className='flex items-center gap-3 mb-4'>
                                <img src={Frame4} alt="Landr feature icon" className="flex-shrink-0 w-6 h-6 mt-1" />
                                <h2 className="font-semibold text-lg leading-tight">{reason.heading}</h2>
                            </div>
                            <p className="text-[#8B8F92] font-Poppins leading-relaxed flex-grow">{reason.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}