import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ─── Mini BookModal (inline, reused from TeacherProfile) ──────────────────────
const HOURS = ["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

interface TeacherMock {
    id: number;
    name: string;
    subject: string;
    rating: number;
    lessons: number;
    avatar: string;
    price?: number;
    availability?: string[];
    specializations?: string[];
}

const getNext14Days = () => {
    const days: { label: string; value: string; dayName: string }[] = [];
    const dayNames = ["Dum","Lun","Mar","Mie","Joi","Vin","Sâm"];
    const monthNames = ["Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Nov","Dec"];
    for (let i = 1; i <= 14; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        days.push({
            label: `${d.getDate()} ${monthNames[d.getMonth()]}`,
            value: d.toISOString().split("T")[0],
            dayName: dayNames[d.getDay()],
        });
    }
    return days;
};

const BookModal = ({
                       teacher,
                       onClose,
                       onSuccess,
                   }: {
    teacher: TeacherMock;
    onClose: () => void;
    onSuccess: () => void;
}) => {
    const days = getNext14Days();
    const [step, setStep] = useState<1|2|3>(1);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedHour, setSelectedHour] = useState("");
    const [duration, setDuration] = useState<60|90>(60);
    const [topic, setTopic] = useState("");
    const [level, setLevel] = useState("");
    const price = teacher.price || 80;
    const total = price * (duration / 60);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const BOOKINGS_KEY = "learnhub_bookings";
        const existing = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...existing, {
            id: `booking_${Date.now()}`,
            teacherId: String(teacher.id),
            teacherName: teacher.name,
            teacherSubject: teacher.subject,
            date: selectedDay,
            hour: selectedHour,
            duration,
            topic,
            level,
            total,
            status: "pending",
            createdAt: new Date().toISOString(),
        }]));
        onSuccess();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-3xl text-white">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-2xl font-bold">📅 Programează lecție</h2>
                        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-lg">×</button>
                    </div>
                    <p className="text-indigo-200 text-sm">cu {teacher.name} · {teacher.subject}</p>
                    <div className="flex items-center gap-2 mt-4">
                        {[1,2,3].map(s => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-white text-indigo-600" : "bg-white/20 text-white/60"}`}>{s}</div>
                                {s < 3 && <div className={`h-0.5 w-10 rounded ${step > s ? "bg-white" : "bg-white/20"}`} />}
                            </div>
                        ))}
                        <span className="ml-2 text-indigo-200 text-sm">{step === 1 ? "Dată & oră" : step === 2 ? "Detalii" : "Confirmare"}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {step === 1 && (
                        <>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Alege data</label>
                                <div className="grid grid-cols-7 gap-1.5">
                                    {days.map(d => (
                                        <button type="button" key={d.value} onClick={() => setSelectedDay(d.value)}
                                                className={`flex flex-col items-center p-2 rounded-xl border-2 text-center ${selectedDay === d.value ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-100 hover:border-indigo-300 text-gray-700"}`}>
                                            <span className="text-[10px] font-semibold text-gray-400">{d.dayName}</span>
                                            <span className="text-sm font-bold">{d.label.split(" ")[0]}</span>
                                            <span className="text-[10px] text-gray-400">{d.label.split(" ")[1]}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Alege ora</label>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                    {HOURS.map(h => (
                                        <button type="button" key={h} onClick={() => setSelectedHour(h)}
                                                className={`py-2.5 rounded-xl border-2 text-sm font-semibold ${selectedHour === h ? "border-indigo-600 bg-indigo-600 text-white" : "border-gray-100 hover:border-indigo-300 text-gray-700"}`}>
                                            {h}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Durata</label>
                                <div className="flex gap-3">
                                    {([60,90] as const).map(d => (
                                        <button type="button" key={d} onClick={() => setDuration(d)}
                                                className={`flex-1 py-3 rounded-xl border-2 font-bold ${duration === d ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                                            {d} min
                                            <span className="block text-xs font-normal mt-0.5">{price * d / 60} MDL</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button type="button" disabled={!selectedDay || !selectedHour} onClick={() => setStep(2)}
                                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl disabled:opacity-40 hover:opacity-90 shadow-lg">
                                Continuă →
                            </button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Subiectul lecției *</label>
                                <input required value={topic} onChange={e => setTopic(e.target.value)}
                                       placeholder="Ex: Ecuații, Gramatică, Vocabular..."
                                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Nivelul tău</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Începător","Intermediar","Avansat"].map(l => (
                                        <button type="button" key={l} onClick={() => setLevel(l)}
                                                className={`py-2.5 rounded-xl border-2 text-sm font-semibold ${level === l ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-200 hover:border-indigo-300 text-gray-600"}`}>
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50">← Înapoi</button>
                                <button type="button" disabled={!topic} onClick={() => setStep(3)}
                                        className="flex-[2] py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl disabled:opacity-40 hover:opacity-90">
                                    Continuă →
                                </button>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 space-y-3">
                                <h3 className="font-bold text-gray-900 text-lg mb-3">Rezumat rezervare</h3>
                                {[
                                    { icon:"👨‍🏫", label:"Profesor", value: teacher.name },
                                    { icon:"📚", label:"Materie", value: teacher.subject },
                                    { icon:"📅", label:"Data", value: new Date(selectedDay).toLocaleDateString("ro-RO", { weekday:"long", day:"numeric", month:"long" }) },
                                    { icon:"🕐", label:"Ora", value: selectedHour },
                                    { icon:"⏱️", label:"Durata", value: `${duration} minute` },
                                    { icon:"🎯", label:"Subiect", value: topic },
                                ].map(row => (
                                    <div key={row.label} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">{row.icon} {row.label}</span>
                                        <span className="font-semibold text-gray-800">{row.value}</span>
                                    </div>
                                ))}
                                <div className="border-t border-indigo-200 pt-3 flex items-center justify-between">
                                    <span className="font-bold text-gray-700">Total de plătit</span>
                                    <span className="text-2xl font-bold text-indigo-600">{total} MDL</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50">← Înapoi</button>
                                <button type="submit" className="flex-[2] py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 shadow-lg">
                                    ✓ Confirmă rezervarea
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

const BookSuccessModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cerere trimisă!</h2>
            <p className="text-gray-500 mb-6">Profesorul a primit cererea ta și o va confirma în curând.</p>
            <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90">
                Înapoi la dashboard
            </button>
        </div>
    </div>
);

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate();
    const [bookModal, setBookModal] = useState<{ open: boolean; teacher: TeacherMock | null }>({ open: false, teacher: null });
    const [bookSuccess, setBookSuccess] = useState(false);

    // Date mock pentru dashboard student
    const stats = {
        totalLessons: 47,
        hoursLearned: 82,
        currentStreak: 12,
        completionRate: 94
    };

    const upcomingLessons = [
        { id: 1, teacher: "Prof. Maria Ionescu", subject: "Matematică", date: "Azi", time: "14:00", duration: "60 min", status: "confirmat" },
        { id: 2, teacher: "Prof. Dan Popescu", subject: "Fizică", date: "Azi", time: "17:00", duration: "90 min", status: "confirmat" },
        { id: 3, teacher: "Prof. Maria Ionescu", subject: "Matematică", date: "Mâine", time: "10:00", duration: "60 min", status: "confirmat" },
        { id: 4, teacher: "Prof. Elena Rus", subject: "Engleză", date: "Joi", time: "15:00", duration: "60 min", status: "în așteptare" }
    ];

    const recentLessons = [
        {
            id: 1,
            teacher: "Prof. Maria Ionescu",
            subject: "Matematică",
            date: "Acum 2 zile",
            topic: "Ecuații de gradul 2",
            homework: "Rezolvă exercițiile 1-15 din manual",
            hasReview: false
        },
        {
            id: 2,
            teacher: "Prof. Dan Popescu",
            subject: "Fizică",
            date: "Acum 4 zile",
            topic: "Legile lui Newton",
            homework: "Citește capitolul 3",
            hasReview: true
        }
    ];

    const myTeachers: TeacherMock[] = [
        { id: 1, name: "Prof. Maria Ionescu", subject: "Matematică", rating: 4.9, lessons: 24, avatar: "MI", price: 80, availability: ["Luni","Miercuri","Vineri"] },
        { id: 2, name: "Prof. Dan Popescu", subject: "Fizică", rating: 4.8, lessons: 15, avatar: "DP", price: 75, availability: ["Marți","Joi"] },
        { id: 3, name: "Prof. Elena Rus", subject: "Engleză", rating: 5.0, lessons: 8, avatar: "ER", price: 90, availability: ["Luni","Marți","Joi","Sâmbătă"] }
    ];

    const subjectProgress = [
        { subject: "Matematică", progress: 78, color: "indigo" },
        { subject: "Fizică", progress: 65, color: "purple" },
        { subject: "Engleză", progress: 92, color: "green" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="w-full px-8 lg:px-16 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Bine ai revenit! 📚</h1>
                            <p className="text-indigo-100">Continuă să înveți și să progresezi</p>
                        </div>
                        <Link
                            to="/teachers"
                            className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>Găsește profesori noi</span>
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
                                <p className="text-gray-600 text-sm font-medium mb-1">Lecții Completate</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalLessons}</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                            <span>↑ 6 lecții</span>
                            <span className="text-gray-500">luna aceasta</span>
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Ore de Studiu</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.hoursLearned}h</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">În ultimele 30 de zile</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Streak Actual</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.currentStreak} 🔥</p>
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Zile consecutive de învățare</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium mb-1">Rata de Finalizare</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.completionRate}%</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-green-600 text-sm mt-2">Progres excelent!</p>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="w-full px-8 lg:px-16 mb-8">
                <div className="bg-white rounded-xl shadow-md p-2 flex gap-2 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`flex-1 whitespace-nowrap py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "overview"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Prezentare Generală
                    </button>
                    <button
                        onClick={() => setActiveTab("lessons")}
                        className={`flex-1 whitespace-nowrap py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "lessons"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Lecțiile Mele
                    </button>
                    <button
                        onClick={() => setActiveTab("teachers")}
                        className={`flex-1 whitespace-nowrap py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "teachers"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Profesorii Mei
                    </button>
                    <button
                        onClick={() => setActiveTab("progress")}
                        className={`flex-1 whitespace-nowrap py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            activeTab === "progress"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        Progres
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
                                    <Link to="/subjects" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                                        Rezervă lecție nouă →
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {upcomingLessons.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                    {lesson.teacher.split(' ')[1]?.charAt(0) || 'P'}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{lesson.teacher}</h3>
                                                    <p className="text-sm text-gray-600">{lesson.subject}</p>
                                                </div>
                                            </div>
                                            <div className="text-right mr-4">
                                                <p className="font-semibold text-gray-900">{lesson.date} • {lesson.time}</p>
                                                <p className="text-sm text-gray-600">{lesson.duration}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {lesson.status === "confirmat" ? (
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                                        Confirmat
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                                                        În așteptare
                                                    </span>
                                                )}
                                                <button className="p-2 text-gray-600 hover:text-gray-900">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Lessons & Homework */}
                            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lecții Recente & Teme</h2>
                                <div className="space-y-4">
                                    {recentLessons.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className="p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-600"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{lesson.subject}</h3>
                                                    <p className="text-sm text-gray-600">{lesson.teacher} • {lesson.date}</p>
                                                </div>
                                                {!lesson.hasReview && (
                                                    <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                                                        Lasă recenzie
                                                    </button>
                                                )}
                                            </div>
                                            <div className="bg-white p-3 rounded-lg">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Subiect: {lesson.topic}</p>
                                                <div className="flex items-start gap-2 mt-2">
                                                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-700">Temă pentru acasă:</p>
                                                        <p className="text-sm text-gray-600">{lesson.homework}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Progress Overview */}
                            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Progresul pe Materii</h2>
                                <div className="space-y-4">
                                    {subjectProgress.map((item, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                                                <span className="text-sm font-bold text-gray-900">{item.progress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-${item.color}-600`}
                                                    style={{ width: `${item.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-4">
                                <Link to="/teachers" className="w-full bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200 text-left group flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Găsește Profesori</h3>
                                        <p className="text-sm text-gray-600">Explorează profesori noi</p>
                                    </div>
                                </Link>

                                <button className="w-full bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200 text-left group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Materiale de Studiu</h3>
                                            <p className="text-sm text-gray-600">Accesează resursele tale</p>
                                        </div>
                                    </div>
                                </button>

                                <button className="w-full bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200 text-left group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Calendarul Meu</h3>
                                            <p className="text-sm text-gray-600">Vezi toate programările</p>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            {/* Achievement */}
                            <div className="mt-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-md p-6 text-white">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-4xl">🏆</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-1">Streak Master!</h3>
                                    <p className="text-sm text-white/90 mb-3">Ai învățat 12 zile la rând!</p>
                                    <div className="bg-white/20 rounded-lg p-2">
                                        <p className="text-xs font-medium">Continuă așa pentru a debloca insigna de 30 de zile! 🚀</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "lessons" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lecțiile Mele</h2>
                        <p className="text-gray-600">Aici vei vedea istoricul complet al tuturor lecțiilor tale.</p>
                    </div>
                )}

                {activeTab === "teachers" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Profesorii Mei</h2>
                            <Link to="/teachers" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                + Adaugă profesor nou
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myTeachers.map((teacher) => (
                                <div key={teacher.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                                    {/* Clickable header → profil profesor */}
                                    <button
                                        onClick={() => navigate(`/teachers/${teacher.id}`)}
                                        className="flex items-center gap-4 mb-4 w-full text-left hover:opacity-80 transition-opacity"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                            {teacher.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 hover:text-indigo-600 transition-colors">{teacher.name}</h3>
                                            <p className="text-sm text-gray-600">{teacher.subject}</p>
                                        </div>
                                    </button>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Rating:</span>
                                            <span className="font-semibold text-amber-500">⭐ {teacher.rating}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Lecții finalizate:</span>
                                            <span className="font-semibold text-gray-900">{teacher.lessons}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setBookModal({ open: true, teacher })}
                                        className="w-full px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        📅 Rezervă lecție
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "progress" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Progresul Meu</h2>
                        <p className="text-gray-600">Statistici detaliate și grafice despre evoluția ta la fiecare materie.</p>
                    </div>
                )}
            </div>

            {/* Book modal */}
            {bookModal.open && bookModal.teacher && (
                <BookModal
                    teacher={bookModal.teacher}
                    onClose={() => setBookModal({ open: false, teacher: null })}
                    onSuccess={() => {
                        setBookModal({ open: false, teacher: null });
                        setBookSuccess(true);
                    }}
                />
            )}
            {bookSuccess && (
                <BookSuccessModal onClose={() => setBookSuccess(false)} />
            )}
        </div>
    );
};

export default StudentDashboard;
