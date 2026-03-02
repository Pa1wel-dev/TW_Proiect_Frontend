import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate("/");
    };

    const dashboardPath = user?.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";

    const initials = user?.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="text-3xl transform group-hover:scale-110 transition-transform duration-200">🎓</div>
                        <span className="text-2xl font-bold text-white">LearnHub</span>
                    </Link>

                    {/* Nav Links — Desktop */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-white/90 hover:text-white font-medium transition-colors hover:underline underline-offset-4">Acasă</Link>
                        <Link to="/subjects" className="text-white/90 hover:text-white font-medium transition-colors hover:underline underline-offset-4">Materii</Link>
                        <Link to="/teachers" className="text-white/90 hover:text-white font-medium transition-colors hover:underline underline-offset-4">Profesori</Link>
                        {isAuthenticated && (
                            <Link to={dashboardPath} className="text-white/90 hover:text-white font-medium transition-colors hover:underline underline-offset-4">
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Auth area — Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated && user ? (
                            /* User dropdown */
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(v => !v)}
                                    className="flex items-center gap-2.5 bg-white/15 hover:bg-white/25 px-3 py-2 rounded-xl transition-all duration-200"
                                >
                                    {/* Avatar */}
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-sm">
                                        {initials}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white text-sm font-semibold leading-tight">{user.name.split(" ")[0]}</div>
                                        <div className="text-indigo-200 text-xs leading-tight capitalize">
                                            {user.role === "teacher" ? "👨‍🏫 Profesor" : "👨‍🎓 Elev"}
                                        </div>
                                    </div>
                                    <svg className={`w-4 h-4 text-white/70 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                                        {/* User info */}
                                        <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
                                            <div className="font-bold text-gray-900 text-sm">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </div>

                                        <div className="py-1">
                                            <Link
                                                to={dashboardPath}
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                                            >
                                                <span>📊</span> Dashboard
                                            </Link>
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                                            >
                                                <span>👤</span> Profilul meu
                                            </Link>

                                        </div>

                                        <div className="py-1 border-t border-gray-100">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <span>🚪</span> Deconectare
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Login / Register */
                            <>
                                <Link
                                    to="/auth"
                                    className="px-5 py-2 text-white font-semibold hover:bg-white/10 rounded-lg transition-all duration-200"
                                >
                                    Autentificare
                                </Link>
                                <Link
                                    to="/auth?tab=register"
                                    className="px-5 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-md"
                                >
                                    Înregistrare
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col gap-1">
                            {isAuthenticated && user && (
                                <div className="flex items-center gap-3 py-3 px-3 mb-2 bg-white/10 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold">
                                        {initials}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">{user.name}</div>
                                        <div className="text-indigo-200 text-xs capitalize">
                                            {user.role === "teacher" ? "👨‍🏫 Profesor" : "👨‍🎓 Elev"}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {[
                                { to: "/", label: "Acasă" },
                                { to: "/subjects", label: "Materii" },
                                { to: "/teachers", label: "Profesori" },
                                ...(isAuthenticated ? [{ to: dashboardPath, label: "Dashboard" }] : []),
                            ].map(item => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white/90 hover:text-white font-medium py-2.5 hover:bg-white/10 px-3 rounded-lg transition-all"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="border-t border-white/20 my-2" />

                            {isAuthenticated ? (
                                <button
                                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                    className="text-left text-red-300 hover:text-red-200 font-medium py-2.5 hover:bg-red-500/20 px-3 rounded-lg transition-all"
                                >
                                    🚪 Deconectare
                                </button>
                            ) : (
                                <>
                                    <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="text-white font-semibold py-2.5 hover:bg-white/10 px-3 rounded-lg transition-all">
                                        Autentificare
                                    </Link>
                                    <Link to="/auth?tab=register" onClick={() => setIsMenuOpen(false)} className="bg-white text-indigo-600 font-semibold py-2.5 px-3 rounded-lg hover:bg-indigo-50 transition-all shadow-md">
                                        Înregistrare
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
