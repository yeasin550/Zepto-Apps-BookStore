import banner from "../../assets/banner.png"


const Banner = () => {
    return (
        <div className="max-w-[1200px] mb-5 px-5 mx-auto md:flex items-center justify-between overflow-hidden">
            <div className="flex-1 text-left">
                <h2 className="text-[24px] font-bold text-[#FF0000] italic">Special 50% Off</h2>
                <h1 className="text-[30px] md:text-[54px] font-bold">
                    Get Your New <span className="text-[#FF0000]">Books</span> Collection!!!
                </h1>
                <p className="leading-6 mb-8">
                    Books are valuable sources of knowledge and imagination, offering readers insights into different worlds,
                    perspectives, and cultures. They range from fiction to nonfiction, covering various genres like mystery,
                    history, and fantasy, allowing individuals to explore ideas, learn, and grow creatively.
                </p>
                <div className="flex gap-5">
                    <a href="#" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold transition-colors hover:bg-indigo-700">
                        Explore More →
                    </a>
                    <a href="#" className="hidden md:block px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-full font-bold transition-colors hover:bg-gray-100">
                        See other promos
                    </a>
                </div>
            </div>
            <div className="flex-1 relative">
                <div className="md:w-[450px] md:h-[450px] w-[300px] h-[300px] bg-[#f58529] rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                <img src={banner} alt="Student with books" className="relative z-10 w-[500px] h-[519px]" />
            </div>
        </div>
    );
};

export default Banner;
