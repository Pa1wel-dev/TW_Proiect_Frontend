import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SUBJECTS = [
    "Matematică", "Engleză", "Română", "Fizică", "Chimie",
    "Informatică", "Biologie", "Istorie", "Geografie",
    "Franceză", "Germană", "Spaniolă", "Economie", "Filosofie",
    "Psihologie", "Logică"
];

const AVAILABILITY_OPTIONS = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"];

const AVATAR_COLORS = [
    "from-indigo-500 to-purple-600",
    "from-pink-500 to-rose-500",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-500",
    "from-blue-500 to-cyan-500",
    "from-violet-500 to-fuchsia-600",
];

type Tab = "general" | "security" | "teacher-profile" | "danger";

// ─── Save helper ─────────────────────────────────────────────────────────────
const updateUserInStorage = (userId: string, updates: Record<string, unknown>) => {
    const USERS_KEY = "learnhub_users";
    const SESSION_KEY = "learnhub_session";

    // update users array
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const idx = users.findIndex((u: { id: string }) => u.id === userId);
    if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    // update session
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");
    const updated = { ...session, ...updates };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));

    return updated;
};

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type }: { message: string; type: "success" | "error" }) => (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-semibold text-sm transition-all animate-slideUp ${
        type === "success" ? "bg-emerald-500" : "bg-red-500"
    }`}>
        <span className="text-lg">{type === "success" ? "✓" : "✕"}</span>
        {message}
    </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [tab, setTab] = useState<Tab>("general");
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // General fields
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState((user as any)?.phone || "");
    const [city, setCity] = useState((user as any)?.city || "");
    const [bio, setBio] = useState((user as any)?.bio || "");
    const [avatarColor, setAvatarColor] = useState((user as any)?.avatarColor || AVATAR_COLORS[0]);

    // Teacher-specific fields
    const [subject, setSubject] = useState((user as any)?.subject || "");
    const [price, setPrice] = useState((user as any)?.price || "");
    const [experience, setExperience] = useState((user as any)?.experience || "");
    const [education, setEducation] = useState((user as any)?.education || "");
    const [specializations, setSpecializations] = useState<string[]>((user as any)?.specializations || []);
    const [newSpec, setNewSpec] = useState("");
    const [availability, setAvailability] = useState<string[]>((user as any)?.availability || []);
    const [languages, setLanguages] = useState((user as any)?.languages || "Română");

    // Security fields
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw] = useState(false);

    // Delete account
    const [deleteConfirm, setDeleteConfirm] = useState("");

    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    // ── Save general ──
    const handleSaveGeneral = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 500));
        updateUserInStorage(user!.id, { name, email, phone, city, bio, avatarColor });
        setIsSaving(false);
        showToast("Profil actualizat cu succes!");
    };

    // ── Save teacher profile ──
    const handleSaveTeacher = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 500));
        updateUserInStorage(user!.id, {
            subject, price: Number(price), experience: Number(experience),
            education, specializations, availability,
            languages: languages.split(",").map((l: string) => l.trim()),
        });
        setIsSaving(false);
        showToast("Profil de profesor actualizat!");
    };

    // ── Change password ──
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // verify current password
        const users = JSON.parse(localStorage.getItem("learnhub_users") || "[]");
        const currentUser = users.find((u: any) => u.id === user!.id);
        if (currentUser?.password !== currentPassword) {
            showToast("Parola curentă este incorectă.", "error");
            return;
        }
        if (newPassword.length < 6) {
            showToast("Parola nouă trebuie să aibă cel puțin 6 caractere.", "error");
            return;
        }
        if (newPassword !== confirmPassword) {
            showToast("Parolele noi nu coincid.", "error");
            return;
        }

        setIsSaving(true);
        await new Promise(r => setTimeout(r, 500));
        updateUserInStorage(user!.id, { password: newPassword });
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
        setIsSaving(false);
        showToast("Parola a fost schimbată!");
    };

    // ── Delete account ──
    const handleDeleteAccount = () => {
        if (deleteConfirm !== user?.email) {
            showToast("Email-ul introdus nu coincide.", "error");
            return;
        }
        const users = JSON.parse(localStorage.getItem("learnhub_users") || "[]");
        const filtered = users.filter((u: any) => u.id !== user!.id);
        localStorage.setItem("learnhub_users", JSON.stringify(filtered));
        logout();
        navigate("/");
    };

    const toggleAvailability = (day: string) => {
        setAvailability(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const addSpec = () => {
        const trimmed = newSpec.trim();
        if (trimmed && !specializations.includes(trimmed)) {
            setSpecializations(prev => [...prev, trimmed]);
            setNewSpec("");
        }
    };

    if (!user) {
        navigate("/auth");
        return null;
    }

    const tabs: { id: Tab; label: string; icon: string }[] = [
        { id: "general", label: "Informații generale", icon: "👤" },
        { id: "security", label: "Parolă & securitate", icon: "🔒" },
        ...(user.role === "teacher" ? [{ id: "teacher-profile" as Tab, label: "Profil profesor", icon: "👨‍🏫" }] : []),
        { id: "danger", label: "Zona periculoasă", icon: "⚠️" },
    ];

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16">
                {/* Header banner */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <div className="w-full px-8 lg:px-16 py-10">
                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0`}>
                                {initials || "?"}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{user.name}</h1>
                                <p className="text-indigo-200 mt-1 flex items-center gap-2">
                                    <span>{user.role === "teacher" ? "👨‍🏫 Profesor" : "👨‍🎓 Elev"}</span>
                                    {user.role === "teacher" && (user as any).subject && (
                                        <><span className="opacity-40">·</span><span>{(user as any).subject}</span></>
                                    )}
                                    <span className="opacity-40">·</span>
                                    <span>{user.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-8 lg:px-16 py-10">
                    <div className="flex gap-8 items-start">
                        {/* Sidebar tabs */}
                        <aside className="w-64 flex-shrink-0 sticky top-24">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {tabs.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTab(t.id)}
                                        className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition-all border-l-3 text-left ${
                                            tab === t.id
                                                ? t.id === "danger"
                                                    ? "bg-red-50 text-red-600 border-l-4 border-red-500"
                                                    : "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                                                : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
                                        }`}
                                    >
                                        <span className="text-base">{t.icon}</span>
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            {/* Account created */}
                            <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">Cont creat</p>
                                <p className="text-sm font-medium text-gray-700">
                                    {new Date((user as any).createdAt || Date.now()).toLocaleDateString("ro-RO", {
                                        day: "numeric", month: "long", year: "numeric"
                                    })}
                                </p>
                            </div>
                        </aside>

                        {/* Main content */}
                        <div className="flex-1 min-w-0">

                            {/* ── GENERAL ── */}
                            {tab === "general" && (
                                <form onSubmit={handleSaveGeneral} className="space-y-6">
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <span>👤</span> Informații generale
                                        </h2>

                                        {/* Avatar color picker */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Culoare avatar</label>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-xl font-bold shadow-md`}>
                                                    {initials || "?"}
                                                </div>
                                                <div className="flex gap-2 flex-wrap">
                                                    {AVATAR_COLORS.map(c => (
                                                        <button
                                                            key={c} type="button"
                                                            onClick={() => setAvatarColor(c)}
                                                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${c} transition-all ${
                                                                avatarColor === c ? "ring-2 ring-offset-2 ring-indigo-500 scale-110" : "opacity-70 hover:opacity-100"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nume complet *</label>
                                                <input
                                                    required value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                                                <input
                                                    required type="email" value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefon</label>
                                                <input
                                                    type="tel" value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                    placeholder="+373 6X XXX XXX"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Oraș</label>
                                                <input
                                                    value={city}
                                                    onChange={e => setCity(e.target.value)}
                                                    placeholder="Ex: Chișinău"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {user.role === "teacher" ? "Descriere scurtă (afișată pe profil)" : "Despre mine"}
                                            </label>
                                            <textarea
                                                rows={4} value={bio}
                                                onChange={e => setBio(e.target.value)}
                                                placeholder={user.role === "teacher"
                                                    ? "Descrie-te pe scurt. Ce te diferențiază? Ce rezultate au obținut elevii tăi?"
                                                    : "Ce vrei să înveți? Care sunt obiectivele tale?"}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                            />
                                            <div className="text-right text-xs text-gray-400 mt-1">{bio.length} / 500</div>
                                        </div>
                                    </div>

                                    {/* Rol badge */}
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Tipul contului</h3>
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
                                            user.role === "teacher"
                                                ? "bg-indigo-100 text-indigo-700"
                                                : "bg-emerald-100 text-emerald-700"
                                        }`}>
                                            <span>{user.role === "teacher" ? "👨‍🏫" : "👨‍🎓"}</span>
                                            {user.role === "teacher" ? "Profesor" : "Elev"}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">Tipul contului nu poate fi schimbat.</p>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60 flex items-center gap-2"
                                        >
                                            {isSaving ? (
                                                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Se salvează...</>
                                            ) : "💾 Salvează modificările"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* ── SECURITY ── */}
                            {tab === "security" && (
                                <form onSubmit={handleChangePassword} className="space-y-6">
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                            <span>🔒</span> Schimbă parola
                                        </h2>
                                        <p className="text-sm text-gray-500 mb-6">Alege o parolă puternică pe care nu o folosești în altă parte.</p>

                                        <div className="space-y-5 max-w-md">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Parola curentă</label>
                                                <div className="relative">
                                                    <input
                                                        required
                                                        type={showPw ? "text" : "password"}
                                                        value={currentPassword}
                                                        onChange={e => setCurrentPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors pr-12"
                                                    />
                                                    <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">
                                                        {showPw ? "🙈" : "👁️"}
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Parola nouă</label>
                                                <input
                                                    required type="password" value={newPassword}
                                                    onChange={e => setNewPassword(e.target.value)}
                                                    placeholder="Minim 6 caractere"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirmă parola nouă</label>
                                                <input
                                                    required type="password" value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                                                        confirmPassword && newPassword !== confirmPassword
                                                            ? "border-red-400 focus:border-red-500"
                                                            : "border-gray-200 focus:border-indigo-500"
                                                    }`}
                                                />
                                                {confirmPassword && newPassword !== confirmPassword && (
                                                    <p className="text-xs text-red-500 mt-1">Parolele nu coincid.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
                                        <span className="text-xl flex-shrink-0">⚠️</span>
                                        <div className="text-sm text-amber-800">
                                            <strong>Atenție:</strong> Parola este stocată local în browser. Nu folosi parole sensibile sau aceleași parole ca pe alte platforme.
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60 flex items-center gap-2"
                                        >
                                            {isSaving ? "Se salvează..." : "🔒 Schimbă parola"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* ── TEACHER PROFILE ── */}
                            {tab === "teacher-profile" && user.role === "teacher" && (
                                <form onSubmit={handleSaveTeacher} className="space-y-6">
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <span>👨‍🏫</span> Profil public profesor
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Materia principală</label>
                                                <select
                                                    value={subject}
                                                    onChange={e => setSubject(e.target.value)}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors bg-white"
                                                >
                                                    <option value="">Alege materia...</option>
                                                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preț per lecție (MDL)</label>
                                                <input
                                                    type="number" min={0} value={price}
                                                    onChange={e => setPrice(e.target.value)}
                                                    placeholder="Ex: 80"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ani de experiență</label>
                                                <input
                                                    type="number" min={0} value={experience}
                                                    onChange={e => setExperience(e.target.value)}
                                                    placeholder="Ex: 5"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Limbi vorbite</label>
                                                <input
                                                    value={languages}
                                                    onChange={e => setLanguages(e.target.value)}
                                                    placeholder="Ex: Română, Engleză"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                                <p className="text-xs text-gray-400 mt-1">Separă prin virgulă</p>
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Educație / Diplome</label>
                                            <input
                                                value={education}
                                                onChange={e => setEducation(e.target.value)}
                                                placeholder="Ex: Facultatea de Matematică, Universitatea București"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Specializations */}
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h3 className="text-base font-bold text-gray-900 mb-4">🎯 Specializări</h3>
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                value={newSpec}
                                                onChange={e => setNewSpec(e.target.value)}
                                                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSpec(); } }}
                                                placeholder="Ex: BAC Matematică, Olimpiade..."
                                                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                            />
                                            <button
                                                type="button" onClick={addSpec}
                                                className="px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm"
                                            >
                                                + Adaugă
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {specializations.map(spec => (
                                                <span key={spec} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">
                                                    {spec}
                                                    <button
                                                        type="button"
                                                        onClick={() => setSpecializations(prev => prev.filter(s => s !== spec))}
                                                        className="text-indigo-400 hover:text-indigo-700 font-bold leading-none"
                                                    >×</button>
                                                </span>
                                            ))}
                                            {specializations.length === 0 && (
                                                <p className="text-sm text-gray-400">Nicio specializare adăugată încă.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                        <h3 className="text-base font-bold text-gray-900 mb-4">📅 Disponibilitate</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {AVAILABILITY_OPTIONS.map(day => (
                                                <button
                                                    key={day} type="button"
                                                    onClick={() => toggleAvailability(day)}
                                                    className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                                                        availability.includes(day)
                                                            ? "border-green-500 bg-green-50 text-green-700"
                                                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                                                    }`}
                                                >
                                                    {availability.includes(day) ? "✓ " : ""}{day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60 flex items-center gap-2"
                                        >
                                            {isSaving ? "Se salvează..." : "💾 Salvează profilul"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* ── DANGER ZONE ── */}
                            {tab === "danger" && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8">
                                        <h2 className="text-xl font-bold text-red-600 mb-2 flex items-center gap-2">
                                            <span>⚠️</span> Zona periculoasă
                                        </h2>
                                        <p className="text-sm text-gray-500 mb-8">Acțiunile de mai jos sunt ireversibile. Procedează cu atenție.</p>

                                        {/* Logout all */}
                                        <div className="flex items-center justify-between py-5 border-b border-gray-100">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Deconectare</h3>
                                                <p className="text-sm text-gray-500 mt-0.5">Ieși din contul tău pe acest dispozitiv.</p>
                                            </div>
                                            <button
                                                onClick={() => { logout(); navigate("/"); }}
                                                className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all text-sm"
                                            >
                                                🚪 Deconectare
                                            </button>
                                        </div>

                                        {/* Delete account */}
                                        <div className="pt-5">
                                            <h3 className="font-semibold text-red-600 mb-1">Șterge contul</h3>
                                            <p className="text-sm text-gray-500 mb-4">
                                                Odată șters, contul tău și toate datele asociate vor fi eliminate permanent. Această acțiune nu poate fi anulată.
                                            </p>
                                            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                                                <label className="block text-sm font-semibold text-red-700 mb-2">
                                                    Confirmă prin scrierea adresei de email: <code className="bg-red-100 px-1.5 py-0.5 rounded">{user.email}</code>
                                                </label>
                                                <input
                                                    value={deleteConfirm}
                                                    onChange={e => setDeleteConfirm(e.target.value)}
                                                    placeholder={user.email}
                                                    className="w-full px-4 py-3 border-2 border-red-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-colors bg-white mb-3"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleDeleteAccount}
                                                    disabled={deleteConfirm !== user.email}
                                                    className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                                                >
                                                    🗑️ Șterge contul definitiv
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {toast && <Toast message={toast.message} type={toast.type} />}

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slideUp { animation: slideUp 0.3s ease both; }
            `}</style>
        </>
    );
};

export default ProfilePage;
