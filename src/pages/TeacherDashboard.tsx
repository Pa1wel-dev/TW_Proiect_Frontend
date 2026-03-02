import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BOOKINGS_KEY = "learnhub_bookings";

interface Booking {
    id: string;
    teacherId: string;
    teacherName: string;
    teacherSubject: string;
    date: string;
    hour: string;
    duration: number;
    topic: string;
    level: string;
    total: number;
    status: "pending" | "confirmed";
    createdAt: string;
}

const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [confirmingId, setConfirmingId] = useState<string | null>(null);

    const loadBookings = () => {
        const raw = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]") as Booking[];
        setBookings(raw);
    };

    useEffect(() => {
        loadBookings();
        // refresh when storage changes (other tabs)
        window.addEventListener("storage", loadBookings);
        return () => window.removeEventListener("storage", loadBookings);
    }, []);

    const pendingBookings = bookings.filter(b => b.status === "pending");
    const confirmedBookings = bookings.filter(b => b.status === "confirmed");

    const handleConfirm = (id: string) => {
        setConfirmingId(id);
        setTimeout(() => {
            const updated = bookings.map(b =>
                b.id === id ? { ...b, status: "confirmed" as const } : b
            );
            localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
            setBookings(updated);
            setConfirmingId(null);
        }, 500);
    };

    const handleReject = (id: string) => {
        const updated = bookings.filter(b => b.id !== id);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
        setBookings(updated);
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("ro-RO", {
            weekday: "short", day: "numeric", month: "short"
        });
    };

    // Mock stats
    const stats = {
        totalStudents: 234,
        totalLessons: 1247,
        rating: 4.9,
        earnings: 18750
    };

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
                            to="/profile"
                            className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Profilul meu</span>
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
                        <p className="text-green-600 text-sm mt-2">↑ 12% vs luna trecută</p>
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
                        <p className="text-green-600 text-sm mt-2">↑ 8% vs luna trecută</p>
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
                        <p className="text-green-600 text-sm mt-2">↑ 15% vs luna trecută</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="w-full px-8 lg:px-16 mb-8">
                <div className="bg-white rounded-xl shadow-md p-2 flex gap-2 overflow-x-auto">
                    {[
                        { id: "overview", label: "Prezentare Generală" },
                        { id: "pending", label: `Cereri în așteptare${pendingBookings.length > 0 ? ` (${pendingBookings.length})` : ""}` },
                        { id: "schedule", label: "Lecții Confirmate" },
                        { id: "students", label: "Elevi" },
                        { id: "settings", label: "Setări" },
                    ].map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`flex-1 whitespace-nowrap py-3 px-4 rounded-lg font-semibold transition-all duration-200 relative ${
                                activeTab === t.id ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {t.label}
                            {t.id === "pending" && pendingBookings.length > 0 && activeTab !== "pending" && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                    {pendingBookings.length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="w-full px-8 lg:px-16 pb-12">

                {/* ── OVERVIEW ── */}
                {activeTab === "overview" && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Pending alert */}
                            {pendingBookings.length > 0 && (
                                <div
                                    className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 flex items-center justify-between cursor-pointer hover:bg-amber-100 transition-colors"
                                    onClick={() => setActiveTab("pending")}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🔔</span>
                                        <div>
                                            <p className="font-bold text-amber-800">
                                                {pendingBookings.length === 1
                                                    ? "1 cerere nouă de rezervare"
                                                    : `${pendingBookings.length} cereri noi de rezervare`}
                                            </p>
                                            <p className="text-sm text-amber-600">Confirmă sau respinge cererile elevilor.</p>
                                        </div>
                                    </div>
                                    <span className="text-amber-600 font-semibold text-sm">Vezi →</span>
                                </div>
                            )}

                            {/* Confirmed upcoming */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-bold text-gray-900">Lecții Confirmate</h2>
                                    <button onClick={() => setActiveTab("schedule")} className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm">
                                        Vezi toate →
                                    </button>
                                </div>

                                {confirmedBookings.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                        <div className="text-4xl mb-2">📅</div>
                                        <p className="text-sm">Nicio lecție confirmată momentan.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {confirmedBookings.slice(0, 4).map(b => (
                                            <div key={b.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                                <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                                    {b.topic.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">{b.topic}</p>
                                                    <p className="text-sm text-gray-500">{b.teacherSubject} · {b.duration} min</p>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <p className="font-semibold text-gray-800">{formatDate(b.date)}</p>
                                                    <p className="text-sm text-gray-500">{b.hour}</p>
                                                </div>
                                                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex-shrink-0">
                                                    Confirmat
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Quick actions */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <button className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-left group">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Setează Disponibilitate</h3>
                                    <p className="text-gray-500 text-sm">Actualizează orele în care ești disponibil</p>
                                </button>
                                <button className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-left group">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Materiale de Curs</h3>
                                    <p className="text-gray-500 text-sm">Încarcă și organizează materialele</p>
                                </button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-5">Recenzii Recente</h2>
                                <div className="space-y-4">
                                    {recentReviews.map(r => (
                                        <div key={r.id} className="p-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="font-semibold text-gray-900 text-sm">{r.student}</span>
                                                <span className="text-amber-400 text-sm">{"⭐".repeat(r.rating)}</span>
                                            </div>
                                            <p className="text-xs text-gray-600 mb-1">{r.comment}</p>
                                            <p className="text-xs text-gray-400">{r.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Câștiguri Lunare</h2>
                                <div className="space-y-3">
                                    {[{ label: "Ian 2024", val: "15,200", pct: "81%" }, { label: "Feb 2024", val: "18,750", pct: "100%", highlight: true }].map(row => (
                                        <div key={row.label}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-600">{row.label}</span>
                                                <span className={`text-sm font-semibold ${row.highlight ? "text-green-600" : ""}`}>{row.val} MDL</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className={`h-full ${row.highlight ? "bg-green-500" : "bg-indigo-500"} rounded-full`} style={{ width: row.pct }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── PENDING BOOKINGS ── */}
                {activeTab === "pending" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Cereri în așteptare</h2>
                            {pendingBookings.length > 0 && (
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-bold rounded-full">
                                    {pendingBookings.length}
                                </span>
                            )}
                        </div>

                        {pendingBookings.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">✅</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Nicio cerere în așteptare</h3>
                                <p className="text-gray-500">Toate cererile au fost procesate.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pendingBookings.map(b => (
                                    <div key={b.id} className="border-2 border-amber-200 bg-amber-50 rounded-2xl p-5">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                            <div className="flex gap-4 flex-1">
                                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                    {b.topic.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-gray-900">{b.topic}</h3>
                                                        <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-xs font-semibold rounded-full">În așteptare</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-600 mt-2">
                                                        <span>📅 {formatDate(b.date)}</span>
                                                        <span>🕐 {b.hour}</span>
                                                        <span>⏱️ {b.duration} minute</span>
                                                        <span>💰 {b.total} MDL</span>
                                                        {b.level && <span>🎯 {b.level}</span>}
                                                        <span>📚 {b.teacherSubject}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        Primit la {new Date(b.createdAt).toLocaleString("ro-RO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 flex-shrink-0">
                                                <button
                                                    onClick={() => handleReject(b.id)}
                                                    className="px-4 py-2 border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors text-sm"
                                                >
                                                    ✕ Respinge
                                                </button>
                                                <button
                                                    onClick={() => handleConfirm(b.id)}
                                                    disabled={confirmingId === b.id}
                                                    className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md disabled:opacity-60 flex items-center gap-2"
                                                >
                                                    {confirmingId === b.id ? (
                                                        <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Se confirmă...</>
                                                    ) : "✓ Confirmă"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── CONFIRMED LESSONS ── */}
                {activeTab === "schedule" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lecții Confirmate</h2>

                        {confirmedBookings.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📅</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Nicio lecție confirmată</h3>
                                <p className="text-gray-500">Confirmă cererile din tab-ul „Cereri în așteptare".</p>
                                <button onClick={() => setActiveTab("pending")} className="mt-4 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                                    Vezi cereri →
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {confirmedBookings.map(b => (
                                    <div key={b.id} className="flex items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-2xl">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                            {b.topic.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900">{b.topic}</h3>
                                                <span className="px-2 py-0.5 bg-green-200 text-green-800 text-xs font-semibold rounded-full">Confirmat</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-0.5">{b.teacherSubject} · {b.level || "—"}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-bold text-gray-900">{formatDate(b.date)} · {b.hour}</p>
                                            <p className="text-sm text-gray-500">{b.duration} min · {b.total} MDL</p>
                                        </div>
                                        <button
                                            onClick={() => handleReject(b.id)}
                                            className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
                                            title="Anulează"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "students" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Elevi</h2>
                        <p className="text-gray-500">Lista completă cu toți elevii tăi și progresul lor.</p>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Setări</h2>
                        <p className="text-gray-500 mb-4">Configurează profilul, prețurile și preferințele tale.</p>
                        <Link to="/profile" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                            Mergi la Profilul meu →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherDashboard;
