import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="text-3xl transform group-hover:scale-110 transition-transform duration-200">
                            🎓
                        </div>
                        <span className="text-2xl font-bold text-white">
                            LearnHub
                        </span>
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:underline underline-offset-4"
                        >
                            Acasă
                        </Link>
                        <Link
                            to="/subjects"
                            className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:underline underline-offset-4"
                        >
                            Materii
                        </Link>
                        <Link
                            to="/teachers"
                            className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:underline underline-offset-4"
                        >
                            Profesori
                        </Link>
                        <Link
                            to="/dashboard/teacher"
                            className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:underline underline-offset-4"
                        >
                            Dashboard Profesor
                        </Link>
                        <Link
                            to="/dashboard/student"
                            className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:underline underline-offset-4"
                        >
                            Dashboard Elev
                        </Link>
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <button className="px-5 py-2 text-white font-semibold hover:bg-white/10 rounded-lg transition-all duration-200">
                            Autentificare
                        </button>
                        <button className="px-5 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-md">
                            Înregistrare
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 animate-fadeIn">
                        <div className="flex flex-col gap-3">
                            <Link
                                to="/"
                                className="text-white/90 hover:text-white font-medium transition-colors duration-200 py-2 hover:bg-white/10 px-3 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Acasă
                            </Link>
                            <Link
                                to="/subjects"
                                className="text-white/90 hover:text-white font-medium transition-colors duration-200 py-2 hover:bg-white/10 px-3 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Materii
                            </Link>
                            <Link
                                to="/teachers"
                                className="text-white/90 hover:text-white font-medium transition-colors duration-200 py-2 hover:bg-white/10 px-3 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Profesori
                            </Link>
                            <Link
                                to="/dashboard/teacher"
                                className="text-white/90 hover:text-white font-medium transition-colors duration-200 py-2 hover:bg-white/10 px-3 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard Profesor
                            </Link>
                            <Link
                                to="/dashboard/student"
                                className="text-white/90 hover:text-white font-medium transition-colors duration-200 py-2 hover:bg-white/10 px-3 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard Elev
                            </Link>
                            <div className="border-t border-white/20 my-2"></div>
                            <button
                                className="text-white font-semibold py-2 hover:bg-white/10 px-3 rounded-lg text-left transition-all duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Autentificare
                            </button>
                            <button
                                className="bg-white text-indigo-600 font-semibold py-2 px-3 rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Înregistrare
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
