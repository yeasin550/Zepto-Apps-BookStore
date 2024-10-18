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
                </div>

                {/* Enquire Now Button */}
                <div className="hidden md:block">
                    <NavLink
                        // to="/explore"
                        className="border border-gray-500 px-4 py-2 rounded-md  transition duration-300 "
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
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
                   
                    {/* Enquire Now Button */}
                    <div className="hidden md:block">
                        <NavLink
                            // to="/explore"
                            className="border border-gray-500 px-4 py-2 rounded-md  transition duration-300 "
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;