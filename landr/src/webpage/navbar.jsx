export default function navbar (){
    return(
        <>
        <div className="flex justify-between items-center p-4 ml-10 mr-10 ">
            <h1 className="text-black">Landr</h1>
            <nav className="flex items-center gap-2">
                <a>Home</a>
                <a>About Us</a>
                <a>Features</a>
                <a>Services</a>
                <a>Contact</a>
            </nav>
            <div className="flex items-center gap-2">
                <button className="rounded-[100px] border-black border-1 py-3 px-6 text-[13px] font-Poppins">Login</button>
                <button className="rounded-[100px] bg-[#02D482] text-white px-4 py-3 text-[13px] font-Poppins">Create an account</button>
            </div>
        </div>
        
        </>
    )
}