import { useState } from "react";
import { Link } from "react-router-dom";
const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");

    // Date mock pentru dashboard
    const stats = {
        totalStudents: 234,
        totalLessons: 1247,
        rating: 4.9,
        earnings: 18750
    };

    const upcomingLessons = [
        { id: 1, student: "Mihai S.", subject: "Matematică", date: "Azi", time: "14:00", duration: "60 min" },
        { id: 2, student: "Ana P.", subject: "Matematică", date: "Azi", time: "16:00", duration: "90 min" },
        { id: 3, student: "Diana L.", subject: "Matematică", date: "Mâine", time: "10:00", duration: "60 min" },
        { id: 4, student: "Cristian M.", subject: "Matematică", date: "Mâine", time: "15:00", duration: "120 min" }
    ];

    const recentReviews = [
        { id: 1, student: "Mihai S.", rating: 5, comment: "Profesor excelent! Am înțeles totul foarte clar.", date: "Acum 2 zile" },
        { id: 2, student: "Ana P.", rating: 5, comment: "Recomand cu încredere! Metoda de predare e super eficientă.", date: "Acum 5 zile" },
        { id: 3, student: "Diana L.", rating: 4, comment: "Foarte bun profesor, explicații clare și răbdare.", date: "Acum 1 săptămână" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="w-full px-8 lg:px-16 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Bine ai revenit, boss! 👋</h1>
                            <p className="text-indigo-100">Iată un rezumat al activității tale</p>
                        </div>
                        <Link
                            to="/teachers/1"
                            className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>Vezi profilul public</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="w-full px-8 lg:px-16 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Total Elevi</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                            <span>↑ 12%</span>
                            <span className="text-gray-500">vs luna trecută</span>
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Lecții Predate</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalLessons}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                            <span>↑ 8%</span>
                            <span className="text-gray-500">vs luna trecută</span>
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Rating Mediu</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.rating}/5.0</p>
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Din 87 recenzii</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Venit Luna Curentă</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.earnings} MDL</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                            <span>↑ 15%</span>
                            <span className="text-gray-500">vs luna trecută</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="w-full px-8 lg:px-16 mb-8">
                <div className="bg-white rounded-xl shadow-md p-2 flex gap-2">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "overview"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Prezentare Generală
                    </button>
                    <button
                        onClick={() => setActiveTab("schedule")}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "schedule"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Programări
                    </button>
                    <button
                        onClick={() => setActiveTab("students")}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "students"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Elevi
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "settings"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Setări
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full px-8 lg:px-16 pb-12">
                {activeTab === "overview" && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Upcoming Lessons */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Lecții Programate</h2>
                                    <button className="text-indigo-600 hover:text-indigo-700 font-semibold">
                                        Vezi toate →
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {upcomingLessons.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {lesson.student.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{lesson.student}</h3>
                                                    <p className="text-sm text-gray-600">{lesson.subject}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">{lesson.date} • {lesson.time}</p>
                                                <p className="text-sm text-gray-600">{lesson.duration}</p>
                                            </div>
                                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                                                Începe
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-8 grid md:grid-cols-2 gap-6">
                                <button className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 text-left group">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors duration-200">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Setează Disponibilitate</h3>
                                    <p className="text-gray-600 text-sm">Actualizează orele în care ești disponibil</p>
                                </button>

                                <button className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 text-left group">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-200">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Materiale de Curs</h3>
                                    <p className="text-gray-600 text-sm">Încarcă și organizează materialele</p>
                                </button>
                            </div>
                        </div>

                        {/* Recent Reviews */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recenzii Recente</h2>
                                <div className="space-y-4">
                                    {recentReviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-gray-900">{review.student}</h3>
                                                <div className="flex items-center gap-1">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <span key={i} className="text-amber-400">⭐</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                                            <p className="text-xs text-gray-500">{review.date}</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 py-2 text-indigo-600 hover:text-indigo-700 font-semibold">
                                    Vezi toate recenziile →
                                </button>
                            </div>

                            {/* Earnings Chart */}
                            <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Câștiguri Lunare</h2>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-gray-600">Ian 2024</span>
                                            <span className="text-sm font-semibold">15,200 MDL</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-600" style={{ width: "81%" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-gray-600">Feb 2024</span>
                                            <span className="text-sm font-semibold text-green-600">18,750 MDL</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-600" style={{ width: "100%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "schedule" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Programări</h2>
                        <p className="text-gray-600">Aici vei vedea calendarul complet cu toate programările tale.</p>
                    </div>
                )}

                {activeTab === "students" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Elevi</h2>
                        <p className="text-gray-600">Lista completă cu toți elevii tăi și progresul lor.</p>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Setări</h2>
                        <p className="text-gray-600">Configurează profilul, prețurile și preferințele tale.</p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default TeacherDashboard;
