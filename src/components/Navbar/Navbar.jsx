import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import logo from "../../assets/Logo.png"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="sticky top-0 bg-white z-50">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="">
                    <NavLink to="/" >
                        <img src={logo} className="w-20" alt="" />
                    </NavLink>
                </div>

                {/* Menu Items */}
                <div className="hidden md:flex space-x-8 text-lg">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-purple-700 ${isActive ? 'font-bold text-purple-700' : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/wishlist"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-purple-700 ${isActive ? 'font-bold text-purple-700' : ''}`
                        }
                    >
                        WishList
                    </NavLink>
                    <NavLink
                        to="/book-page"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-purple-700 ${isActive ? 'font-bold text-purple-700' : ''}`
                        }
                    >
                        Book Page
                    </NavLink>
                </div>

                {/* Enquire Now Button */}
                <div className="hidden md:block">
                    <NavLink
                        to="/explore"
                        className="bg-white border hover:text-white px-4 border-[#F8AF56] py-2 rounded-md hover:bg-[#F8AF56] transition duration-300 text-[#F8AF56]"
                    >
                        Enquire Now
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                        <FiMenu size={24} />
                    </button>
                </div>
            </div>

            {/* Responsive Menu Items */}
            {menuOpen && (
                <div className="md:hidden flex flex-col text-center space-y-4 py-4 px-4 bg-white shadow-lg">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-purple-700 ${isActive ? 'font-bold text-purple-700' : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/wishlist"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-purple-700 ${isActive ? 'font-bold text-purple-700' : ''}`
                        }
                    >
                        WishList
                    </NavLink>
                    <NavLink
                        to="/book-page"
                        className={({ isActive }) =>
                            `text-gray-800 hover:text-[#F8AF56] ${isActive ? 'font-bold text-[#F8AF56]' : ''}`
                        }
                    >
                        Book Page
                    </NavLink>
                   
                    <NavLink
                        to="/explore"
                        className="bg-white border hover:text-white px-4 border-[#F8AF56] py-2 rounded-md hover:bg-[#F8AF56] transition duration-300 text-[#F8AF56]"
                    >
                        Enquire Now
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;