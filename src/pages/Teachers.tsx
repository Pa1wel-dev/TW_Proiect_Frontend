import { Link, useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { teachers } from "../data/teachers";

const TeacherCard = ({ teacher }: { teacher: typeof teachers[0] }) => {
    return (
        <Link
            to={`/teachers/${teacher.id}`}
            className="group block bg-white rounded-2xl border-2 border-gray-100 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
        >
            {/* Card Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg overflow-hidden">
                            {teacher.avatar ? (
                                <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                            ) : (
                                teacher.name.charAt(0)
                            )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                        <span className="text-amber-500 text-lg">⭐</span>
                        <span className="font-bold text-gray-900">{teacher.rating}</span>
                        <span className="text-gray-500 text-sm">({teacher.reviewCount})</span>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {teacher.name}
                    </h3>
                    <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">
                        {teacher.subject}
                    </p>
                </div>

                {/* Specializations */}
                {teacher.specializations && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {teacher.specializations.slice(0, 3).map((spec, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                            >
                                {spec}
                            </span>
                        ))}
                        {teacher.specializations.length > 3 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                +{teacher.specializations.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Description */}
                <p className="mt-4 text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {teacher.description}
                </p>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <span className="text-base">👥</span>
                        <span>{teacher.students}+ elevi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-base">🎯</span>
                        <span>{teacher.experience} ani exp.</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">Preț pe lecție</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-indigo-600">{teacher.price}</span>
                        <span className="text-gray-500 text-sm font-medium">MDL</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                    <span>Vezi profil</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    );
};

const Teachers = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"rating" | "price_asc" | "price_desc" | "experience">("rating");
    const [maxPrice, setMaxPrice] = useState<number>(200);
    const [minRating, setMinRating] = useState<number>(0);

    const selectedSubject = searchParams.get("subject") || "";

    const uniqueSubjects = useMemo(() => {
        return [...new Set(teachers.map(t => t.subject))].sort();
    }, []);

    const filteredTeachers = useMemo(() => {
        let result = [...teachers];

        // Filter by subject
        if (selectedSubject) {
            result = result.filter(t => t.subject === selectedSubject);
        }

        // Filter by search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.name.toLowerCase().includes(q) ||
                t.subject.toLowerCase().includes(q) ||
                t.specializations.some(s => s.toLowerCase().includes(q)) ||
                t.description.toLowerCase().includes(q)
            );
        }

        // Filter by max price
        result = result.filter(t => t.price <= maxPrice);

        // Filter by min rating
        result = result.filter(t => t.rating >= minRating);

        // Sort
        switch (sortBy) {
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "price_asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "experience":
                result.sort((a, b) => b.experience - a.experience);
                break;
        }

        return result;
    }, [selectedSubject, searchQuery, sortBy, maxPrice, minRating]);

    const handleSubjectChange = (subject: string) => {
        if (subject) {
            setSearchParams({ subject });
        } else {
            setSearchParams({});
        }
    };

    const subjectIcons: Record<string, string> = {
        "Matematică": "📐", "Engleză": "🇬🇧", "Română": "📖", "Fizică": "⚛️",
        "Chimie": "🧪", "Informatică": "💻", "Biologie": "🧬", "Istorie": "📜",
        "Geografie": "🌍", "Franceză": "🇫🇷", "Germană": "🇩🇪", "Spaniolă": "🇪🇸",
        "Economie": "💰", "Filosofie": "🤔", "Psihologie": "🧠", "Logică": "⚖️"
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16">

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-14 w-full">
                <div className="w-full px-8 lg:px-16">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-indigo-200 text-sm mb-4">
                        <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
                        <span>›</span>
                        <Link to="/subjects" className="hover:text-white transition-colors">Materii</Link>
                        {selectedSubject && (
                            <>
                                <span>›</span>
                                <span className="text-white font-medium">{selectedSubject}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-5xl font-bold mb-3">
                        {selectedSubject
                            ? <>{subjectIcons[selectedSubject] || "📚"} Profesori de {selectedSubject}</>
                            : "👨‍🏫 Toți Profesorii"
                        }
                    </h1>
                    <p className="text-xl text-indigo-100">
                        {filteredTeachers.length} profesori disponibili
                        {selectedSubject ? ` pentru ${selectedSubject}` : " pe platformă"}
                    </p>
                </div>
            </div>

            {/* Search & Sort Bar */}
            <div className="bg-white border-b border-gray-200 py-5 sticky top-16 z-40 shadow-sm">
                <div className="w-full px-8 lg:px-16 flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[220px]">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Caută profesor sau specializare..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value as typeof sortBy)}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white cursor-pointer"
                    >
                        <option value="rating">Sortează: Rating</option>
                        <option value="price_asc">Preț: Crescător</option>
                        <option value="price_desc">Preț: Descrescător</option>
                        <option value="experience">Experiență</option>
                    </select>

                    {/* Results count */}
                    <span className="text-sm text-gray-500 ml-auto">
                        <span className="font-bold text-indigo-600">{filteredTeachers.length}</span> profesori găsiți
                    </span>
                </div>
            </div>

            <div className="w-full px-8 lg:px-16 py-10 flex gap-8 items-start">

                {/* Sidebar Filters */}
                <aside className="w-72 flex-shrink-0 sticky top-36">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                            <h3 className="text-white font-bold text-lg">🔍 Filtre</h3>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Subject Filter */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Materie</label>
                                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                                    <button
                                        onClick={() => handleSubjectChange("")}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${!selectedSubject ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"}`}
                                    >
                                        🌟 Toate materiile
                                    </button>
                                    {uniqueSubjects.map(subject => (
                                        <button
                                            key={subject}
                                            onClick={() => handleSubjectChange(subject)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-between ${selectedSubject === subject ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"}`}
                                        >
                                            <span>{subjectIcons[subject] || "📚"} {subject}</span>
                                            <span className={`text-xs rounded-full px-2 py-0.5 ${selectedSubject === subject ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                                                {teachers.filter(t => t.subject === subject).length}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Price Filter */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                    Preț maxim: <span className="text-indigo-600">{maxPrice} MDL</span>
                                </label>
                                <input
                                    type="range"
                                    min={50}
                                    max={200}
                                    step={10}
                                    value={maxPrice}
                                    onChange={e => setMaxPrice(Number(e.target.value))}
                                    className="w-full accent-indigo-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>50 MDL</span>
                                    <span>200 MDL</span>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Rating Filter */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Rating minim</label>
                                <div className="space-y-1.5">
                                    {[0, 4.5, 4.7, 4.9].map(r => (
                                        <button
                                            key={r}
                                            onClick={() => setMinRating(r)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${minRating === r ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"}`}
                                        >
                                            {r === 0 ? "Toți profesorii" : `⭐ ${r}+`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Reset */}
                            {(selectedSubject || searchQuery || maxPrice < 200 || minRating > 0) && (
                                <>
                                    <hr className="border-gray-100" />
                                    <button
                                        onClick={() => {
                                            handleSubjectChange("");
                                            setSearchQuery("");
                                            setMaxPrice(200);
                                            setMinRating(0);
                                        }}
                                        className="w-full px-4 py-2.5 border-2 border-red-200 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-all text-sm"
                                    >
                                        ✕ Resetează filtrele
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Active filters pills */}
                    {(selectedSubject || minRating > 0 || maxPrice < 200) && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {selectedSubject && (
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                    {subjectIcons[selectedSubject]} {selectedSubject}
                                    <button onClick={() => handleSubjectChange("")} className="ml-1 hover:text-indigo-900 font-bold">×</button>
                                </span>
                            )}
                            {minRating > 0 && (
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                    ⭐ {minRating}+
                                    <button onClick={() => setMinRating(0)} className="ml-1 hover:text-amber-900 font-bold">×</button>
                                </span>
                            )}
                            {maxPrice < 200 && (
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    Max {maxPrice} MDL
                                    <button onClick={() => setMaxPrice(200)} className="ml-1 hover:text-green-900 font-bold">×</button>
                                </span>
                            )}
                        </div>
                    )}

                    {/* Grid */}
                    {filteredTeachers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredTeachers.map(teacher => (
                                <TeacherCard key={teacher.id} teacher={teacher} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <div className="text-7xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Niciun profesor găsit</h3>
                            <p className="text-gray-500 mb-8">Încearcă să schimbi filtrele sau caută altceva.</p>
                            <button
                                onClick={() => {
                                    handleSubjectChange("");
                                    setSearchQuery("");
                                    setMaxPrice(200);
                                    setMinRating(0);
                                }}
                                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Resetează filtrele
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="w-full px-8 lg:px-16 py-16">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">Nu ai găsit profesorul potrivit?</h2>
                    <p className="text-xl text-indigo-100 mb-8">Descrie-ne nevoile tale și îți vom găsi profesorul perfect!</p>
                    <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-200 shadow-lg">
                        Contactează-ne →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Teachers;
