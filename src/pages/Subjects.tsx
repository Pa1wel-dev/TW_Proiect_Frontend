import { Link } from "react-router-dom";

const Subjects = () => {
    const subjects = [
        {
            icon: "📐",
            name: "Matematică",
            teacherCount: 120,
            color: "from-blue-500 to-indigo-600",
            bgColor: "bg-blue-50",
            description: "BAC, Olimpiade, Admitere Facultate"
        },
        {
            icon: "🇬🇧",
            name: "Engleză",
            teacherCount: 150,
            color: "from-green-500 to-emerald-600",
            bgColor: "bg-green-50",
            description: "Cambridge, TOEFL, IELTS, Conversație"
        },
        {
            icon: "📖",
            name: "Română",
            teacherCount: 80,
            color: "from-red-500 to-rose-600",
            bgColor: "bg-red-50",
            description: "BAC, Comentariu Literar, Eseu"
        },
        {
            icon: "⚛️",
            name: "Fizică",
            teacherCount: 65,
            color: "from-purple-500 to-violet-600",
            bgColor: "bg-purple-50",
            description: "BAC, Olimpiade, Admitere Politehnica"
        },
        {
            icon: "🧪",
            name: "Chimie",
            teacherCount: 70,
            color: "from-orange-500 to-amber-600",
            bgColor: "bg-orange-50",
            description: "BAC, Admitere Medicină, Farmacie"
        },
        {
            icon: "💻",
            name: "Informatică",
            teacherCount: 90,
            color: "from-cyan-500 to-blue-600",
            bgColor: "bg-cyan-50",
            description: "C++, Python, BAC, Web Development"
        },
        {
            icon: "🧬",
            name: "Biologie",
            teacherCount: 55,
            color: "from-lime-500 to-green-600",
            bgColor: "bg-lime-50",
            description: "BAC, Admitere Medicină, Anatomie"
        },
        {
            icon: "📜",
            name: "Istorie",
            teacherCount: 45,
            color: "from-amber-500 to-yellow-600",
            bgColor: "bg-amber-50",
            description: "BAC, Istorie Universală, Istorie României"
        },
        {
            icon: "🌍",
            name: "Geografie",
            teacherCount: 40,
            color: "from-teal-500 to-cyan-600",
            bgColor: "bg-teal-50",
            description: "BAC, Geografie Fizică, Geografie Umană"
        },
        {
            icon: "🇫🇷",
            name: "Franceză",
            teacherCount: 60,
            color: "from-blue-500 to-indigo-600",
            bgColor: "bg-blue-50",
            description: "DELF, BAC, Conversație"
        },
        {
            icon: "🇩🇪",
            name: "Germană",
            teacherCount: 50,
            color: "from-gray-600 to-slate-700",
            bgColor: "bg-gray-50",
            description: "Goethe, BAC, Business Deutsch"
        },
        {
            icon: "🇪🇸",
            name: "Spaniolă",
            teacherCount: 45,
            color: "from-yellow-500 to-orange-600",
            bgColor: "bg-yellow-50",
            description: "DELE, Conversație, BAC"
        },
        {
            icon: "💰",
            name: "Economie",
            teacherCount: 35,
            color: "from-emerald-500 to-green-600",
            bgColor: "bg-emerald-50",
            description: "BAC, Microeconomie, Macroeconomie"
        },
        {
            icon: "🤔",
            name: "Filosofie",
            teacherCount: 30,
            color: "from-indigo-500 to-purple-600",
            bgColor: "bg-indigo-50",
            description: "BAC, Logică, Etică"
        },
        {
            icon: "🧠",
            name: "Psihologie",
            teacherCount: 40,
            color: "from-pink-500 to-rose-600",
            bgColor: "bg-pink-50",
            description: "BAC, Psihologie Generală, Admitere"
        },
        {
            icon: "⚖️",
            name: "Logică",
            teacherCount: 25,
            color: "from-slate-500 to-gray-600",
            bgColor: "bg-slate-50",
            description: "BAC, Argumentare, Silogisme"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 w-full">
                <div className="w-full px-8 lg:px-16">
                    <div className="w-full">
                        <h1 className="text-5xl font-bold mb-4">
                            Explorează Materiile 📚
                        </h1>
                        <p className="text-xl text-indigo-100">
                            Alege materia care te interesează și descoperă cei mai buni profesori din România
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-200 py-8">
                <div className="w-full px-8 lg:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">16</div>
                            <div className="text-gray-600 font-medium">Materii Disponibile</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">1,000+</div>
                            <div className="text-gray-600 font-medium">Profesori Verificați</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">10,000+</div>
                            <div className="text-gray-600 font-medium">Lecții Predate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">4.8/5</div>
                            <div className="text-gray-600 font-medium">Rating Mediu</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subjects Grid */}
            <div className="w-full px-8 lg:px-16 py-16">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Toate Materiile</h2>
                    <p className="text-gray-600 text-lg">
                        Click pe o materie pentru a vedea profesorii disponibili
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {subjects.map((subject, index) => (
                        <Link
                            key={index}
                            to={`/teachers?subject=${encodeURIComponent(subject.name)}`}
                            className={`group relative ${subject.bgColor} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-300`}
                        >
                            {/* Icon Badge */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                {subject.icon}
                            </div>

                            {/* Content */}
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                                    {subject.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    {subject.description}
                                </p>
                            </div>

                            {/* Teacher Count */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    <span className="font-semibold">{subject.teacherCount}+ profesori</span>
                                </div>
                                <svg className="w-6 h-6 text-indigo-600 transform group-hover:translate-x-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>

                            {/* Gradient Overlay on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Popular Subjects Banner */}
            <div className="bg-white py-16">
                <div className="w-full px-8 lg:px-16">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center">
                        <h2 className="text-4xl font-bold mb-4">
                            Cele mai populare materii
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 w-full mx-auto">
                            Matematică, Engleză și Informatică sunt cele mai căutate materii pe platforma noastră
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/teachers?subject=Matematică"
                                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg"
                            >
                                Matematică →
                            </Link>
                            <Link
                                to="/teachers?subject=Engleză"
                                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg"
                            >
                                Engleză →
                            </Link>
                            <Link
                                to="/teachers?subject=Informatică"
                                className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg"
                            >
                                Informatică →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full px-8 lg:px-16 py-16">
                <div className="text-center w-full">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Nu găsești materia pe care o cauți?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Contactează-ne și vom găsi profesorul perfect pentru tine!
                    </p>
                    <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                        Contactează-ne
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subjects;
