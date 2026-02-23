import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 w-full">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 w-full">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="relative w-full px-8 lg:px-16 pt-20 pb-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                500+ profesori verificați disponibili acum
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                Găsește profesorul perfect pentru
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> succesul tău</span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed">
                                Conectează-te cu cei mai buni profesori din România pentru BAC, Cambridge,
                                TOEFL și multe alte examene. Lecții online personalizate, rezultate garantate.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/teachers"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <span>Explorează Profesorii</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Vezi Demo</span>
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                                <div>
                                    <div className="text-3xl font-bold text-indigo-600">500+</div>
                                    <div className="text-sm text-gray-600 mt-1">Profesori verificați</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-indigo-600">10,000+</div>
                                    <div className="text-sm text-gray-600 mt-1">Elevi mulțumiți</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-indigo-600">95%</div>
                                    <div className="text-sm text-gray-600 mt-1">Rată de succes</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Floating Cards */}
                        <div className="relative h-[600px] hidden lg:block">
                            <div className="absolute top-10 left-10 w-64 bg-white rounded-2xl shadow-xl p-6 transform hover:rotate-0 transition-transform duration-300" style={{ transform: 'rotate(3deg)' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        E
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Elena Popescu</div>
                                        <div className="text-sm text-indigo-600">Matematică</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <span className="text-amber-400">⭐</span>
                                        <span className="font-bold">4.9</span>
                                    </div>
                                    <div className="text-2xl font-bold text-indigo-600">80 MDL</div>
                                </div>
                            </div>

                            <div className="absolute top-40 right-10 w-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 transform hover:rotate-0 transition-transform duration-300 text-white" style={{ transform: 'rotate(-3deg)' }}>
                                <div className="text-4xl mb-2">🎯</div>
                                <div className="text-xl font-bold mb-2">BAC Matematică</div>
                                <div className="text-indigo-100">Pregătire completă pentru examen</div>
                            </div>

                            <div className="absolute bottom-20 left-20 w-64 bg-white rounded-2xl shadow-xl p-6 transform hover:rotate-0 transition-transform duration-300" style={{ transform: 'rotate(6deg)' }}>
                                <div className="text-4xl mb-3">🌍</div>
                                <div className="text-xl font-bold text-gray-900 mb-2">Cambridge C1</div>
                                <div className="text-gray-600">Certificare internațională</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subjects Section */}
            <section className="py-20 bg-white w-full">
                <div className="w-full px-8 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Materii populare</h2>
                        <p className="text-xl text-gray-600">Alege din peste 15 materii disponibile</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { icon: "📐", name: "Matematică", count: "120+" },
                            { icon: "🇬🇧", name: "Engleză", count: "150+" },
                            { icon: "📖", name: "Română", count: "80+" },
                            { icon: "⚛️", name: "Fizică", count: "65+" },
                            { icon: "🧪", name: "Chimie", count: "70+" },
                            { icon: "💻", name: "Informatică", count: "90+" }
                        ].map((subject, index) => (
                            <Link
                                key={index}
                                to="/teachers"
                                className="group bg-gradient-to-br from-gray-50 to-white hover:from-indigo-50 hover:to-purple-50 rounded-2xl p-6 text-center border-2 border-gray-100 hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                    {subject.icon}
                                </div>
                                <div className="font-bold text-gray-900 mb-1">{subject.name}</div>
                                <div className="text-sm text-gray-600">{subject.count} profesori</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 w-full">
                <div className="w-full px-8 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">De ce LearnHub?</h2>
                        <p className="text-xl text-indigo-100">Platforma ta de încredere pentru educație online</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Profesori verificați",
                                description: "Toți profesorii sunt verificați și evaluați de comunitatea noastră"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                ),
                                title: "Lecții personalizate",
                                description: "Fiecare lecție este adaptată nevoilor și stilului tău de învățare"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Prețuri flexibile",
                                description: "Găsește profesori pentru orice buget, de la 50 RON/oră"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                                title: "100% online",
                                description: "Învață de oriunde, oricând, cu platforma noastră intuitivă"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl text-white mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-indigo-100">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white w-full">
                <div className="w-full px-8 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Cum funcționează?</h2>
                        <p className="text-xl text-gray-600">3 pași simpli către succesul tău</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                step: "1",
                                title: "Caută profesorul",
                                description: "Filtrează după materie, preț și disponibilitate pentru a găsi profesorul ideal",
                                icon: "🔍"
                            },
                            {
                                step: "2",
                                title: "Rezervă o lecție",
                                description: "Alege data și ora care ți se potrivește și confirmă lecția",
                                icon: "📅"
                            },
                            {
                                step: "3",
                                title: "Începe să înveți",
                                description: "Conectează-te online și bucură-te de o experiență educațională personalizată",
                                icon: "🎓"
                            }
                        ].map((step, index) => (
                            <div key={index} className="relative">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl font-bold rounded-full mb-6 shadow-lg">
                                        {step.step}
                                    </div>
                                    <div className="text-6xl mb-4">{step.icon}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-10 left-full w-full h-1">
                                        <div className="absolute top-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50 w-full">
                <div className="w-full px-8 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce spun elevii noștri</h2>
                        <p className="text-xl text-gray-600">Peste 10,000 elevi mulțumiți</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Mihai S.",
                                role: "Elev clasa a XII-a",
                                avatar: "M",
                                rating: 5,
                                text: "Am reușit să iau 9.80 la BAC la matematică datorită profesoarei de pe LearnHub. Explică foarte clar și este super răbdătoare!"
                            },
                            {
                                name: "Diana L.",
                                role: "Student, anul II",
                                avatar: "D",
                                rating: 5,
                                text: "Am luat Cambridge C1 la prima încercare! Profesorul meu a fost extraordinar, foarte dedicat și cu metodă eficientă."
                            },
                            {
                                name: "Ana P.",
                                role: "Student medicină",
                                avatar: "A",
                                rating: 5,
                                text: "Platformă excelentă! Am găsit rapid un profesor de chimie pentru admiterea la medicină. Recomand cu încredere!"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-amber-400 text-xl">⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 w-full">
                <div className="w-full px-8 lg:px-16 text-center">
                    <h2 className="text-5xl font-bold text-white mb-6">Gata să începi?</h2>
                    <p className="text-xl text-indigo-100 mb-10">
                        Alătură-te miilor de elevi care și-au atins obiectivele cu LearnHub
                    </p>
                    <Link
                        to="/teachers"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-600 font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200"
                    >
                        <span>Găsește un Profesor Acum</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
