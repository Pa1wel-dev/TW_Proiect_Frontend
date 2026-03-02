import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../context/AuthContext";

const SUBJECTS = [
    "Matematică", "Engleză", "Română", "Fizică", "Chimie",
    "Informatică", "Biologie", "Istorie", "Geografie",
    "Franceză", "Germană", "Spaniolă", "Economie", "Filosofie",
    "Psihologie", "Logică"
];

type Tab = "login" | "register";

const AuthPage = () => {
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [tab, setTab] = useState<Tab>("login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Login fields
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLoginPw, setShowLoginPw] = useState(false);

    // Register fields
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regPassword2, setRegPassword2] = useState("");
    const [regRole, setRegRole] = useState<UserRole>("student");
    const [regSubject, setRegSubject] = useState("");
    const [showRegPw, setShowRegPw] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        const result = await login(loginEmail, loginPassword);
        setIsLoading(false);
        if (result.success) {
            // redirect based on role — we read from localStorage since state updates async
            const session = localStorage.getItem("learnhub_session");
            if (session) {
                const user = JSON.parse(session);
                navigate(user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student", { replace: true });
            }
        } else {
            setError(result.error || "Eroare la autentificare.");
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (regPassword !== regPassword2) {
            setError("Parolele nu coincid.");
            return;
        }
        if (regPassword.length < 6) {
            setError("Parola trebuie să aibă cel puțin 6 caractere.");
            return;
        }
        if (regRole === "teacher" && !regSubject) {
            setError("Alege materia pe care o predai.");
            return;
        }

        setIsLoading(true);
        const result = await register({
            name: regName,
            email: regEmail,
            password: regPassword,
            role: regRole,
            subject: regSubject || undefined,
        });
        setIsLoading(false);

        if (result.success) {
            navigate(regRole === "teacher" ? "/dashboard/teacher" : "/dashboard/student", { replace: true });
        } else {
            setError(result.error || "Eroare la înregistrare.");
        }
    };

    const pwStrength = (pw: string) => {
        if (pw.length === 0) return null;
        if (pw.length < 6) return { label: "Slabă", color: "bg-red-500", w: "w-1/4" };
        if (pw.length < 9) return { label: "Medie", color: "bg-amber-500", w: "w-2/4" };
        if (!/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return { label: "Bună", color: "bg-blue-500", w: "w-3/4" };
        return { label: "Puternică", color: "bg-green-500", w: "w-full" };
    };
    const strength = pwStrength(regPassword);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16 flex items-center justify-center px-4 py-12">

            {/* Decorative blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 group">
                        <span className="text-4xl">🎓</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            LearnHub
                        </span>
                    </Link>
                    <p className="text-gray-500 mt-2 text-sm">
                        {tab === "login" ? "Bine ai revenit!" : "Creează-ți contul gratuit"}
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Tab switcher */}
                    <div className="flex border-b border-gray-100">
                        {(["login", "register"] as Tab[]).map(t => (
                            <button
                                key={t}
                                onClick={() => { setTab(t); setError(""); }}
                                className={`flex-1 py-4 text-sm font-bold transition-all duration-200 ${
                                    tab === t
                                        ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {t === "login" ? "🔑 Autentificare" : "✨ Înregistrare"}
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        {/* Error */}
                        {error && (
                            <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                                <span className="text-base">⚠️</span>
                                {error}
                            </div>
                        )}

                        {/* ── LOGIN FORM ── */}
                        {tab === "login" && (
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                                    <input
                                        required type="email"
                                        value={loginEmail}
                                        onChange={e => setLoginEmail(e.target.value)}
                                        placeholder="adresa@email.com"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-sm font-semibold text-gray-700">Parolă</label>
                                        <button type="button" className="text-xs text-indigo-600 hover:underline">
                                            Ai uitat parola?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            required
                                            type={showLoginPw ? "text" : "password"}
                                            value={loginPassword}
                                            onChange={e => setLoginPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowLoginPw(v => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
                                        >
                                            {showLoginPw ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Se autentifică...
                                        </>
                                    ) : "Intră în cont →"}
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    Nu ai cont?{" "}
                                    <button type="button" onClick={() => setTab("register")} className="text-indigo-600 font-semibold hover:underline">
                                        Înregistrează-te gratuit
                                    </button>
                                </p>

                                {/* Demo accounts hint */}
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                                    <p className="text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wide">💡 Cont demo rapid</p>
                                    <div className="space-y-1.5">
                                        <button
                                            type="button"
                                            onClick={() => { setLoginEmail("elev@demo.com"); setLoginPassword("demo123"); }}
                                            className="w-full text-left text-xs px-3 py-2 bg-white border border-indigo-200 rounded-lg hover:border-indigo-400 transition-colors text-indigo-800 font-medium"
                                        >
                                            👨‍🎓 Elev demo — elev@demo.com / demo123
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setLoginEmail("profesor@demo.com"); setLoginPassword("demo123"); }}
                                            className="w-full text-left text-xs px-3 py-2 bg-white border border-indigo-200 rounded-lg hover:border-indigo-400 transition-colors text-indigo-800 font-medium"
                                        >
                                            👨‍🏫 Profesor demo — profesor@demo.com / demo123
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {/* ── REGISTER FORM ── */}
                        {tab === "register" && (
                            <form onSubmit={handleRegister} className="space-y-5">
                                {/* Role selector */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mă înregistrez ca</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(["student", "teacher"] as UserRole[]).map(r => (
                                            <button
                                                key={r}
                                                type="button"
                                                onClick={() => setRegRole(r)}
                                                className={`flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border-2 transition-all duration-200 ${
                                                    regRole === r
                                                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                                                        : "border-gray-200 hover:border-indigo-300 text-gray-600"
                                                }`}
                                            >
                                                <span className="text-3xl">{r === "student" ? "👨‍🎓" : "👨‍🏫"}</span>
                                                <div className="text-center">
                                                    <div className="font-bold text-sm">{r === "student" ? "Elev" : "Profesor"}</div>
                                                    <div className="text-xs text-gray-400 font-normal mt-0.5">
                                                        {r === "student" ? "Vreau să învăț" : "Vreau să predau"}
                                                    </div>
                                                </div>
                                                {regRole === r && (
                                                    <span className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        {regRole === "teacher" ? "Nume complet" : "Nume și prenume"}
                                    </label>
                                    <input
                                        required
                                        value={regName}
                                        onChange={e => setRegName(e.target.value)}
                                        placeholder={regRole === "teacher" ? "Ex: Ion Popescu" : "Ex: Maria Ion"}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                                    <input
                                        required type="email"
                                        value={regEmail}
                                        onChange={e => setRegEmail(e.target.value)}
                                        placeholder="adresa@email.com"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                {/* Subject — only for teachers */}
                                {regRole === "teacher" && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Materia pe care o predai</label>
                                        <select
                                            value={regSubject}
                                            onChange={e => setRegSubject(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors bg-white"
                                        >
                                            <option value="">Alege materia...</option>
                                            {SUBJECTS.map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Parolă</label>
                                    <div className="relative">
                                        <input
                                            required
                                            type={showRegPw ? "text" : "password"}
                                            value={regPassword}
                                            onChange={e => setRegPassword(e.target.value)}
                                            placeholder="Minim 6 caractere"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRegPw(v => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
                                        >
                                            {showRegPw ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                    {strength && (
                                        <div className="mt-2">
                                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div className={`h-full ${strength.color} ${strength.w} transition-all duration-300 rounded-full`} />
                                            </div>
                                            <p className={`text-xs mt-1 font-medium ${strength.color.replace("bg-", "text-")}`}>
                                                Parolă {strength.label.toLowerCase()}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirmă parola</label>
                                    <input
                                        required
                                        type="password"
                                        value={regPassword2}
                                        onChange={e => setRegPassword2(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
                                            regPassword2 && regPassword !== regPassword2
                                                ? "border-red-400 focus:border-red-500"
                                                : "border-gray-200 focus:border-indigo-500"
                                        }`}
                                    />
                                    {regPassword2 && regPassword !== regPassword2 && (
                                        <p className="text-xs text-red-500 mt-1">Parolele nu coincid.</p>
                                    )}
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input required type="checkbox" className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <span className="text-xs text-gray-500 leading-relaxed">
                                        Sunt de acord cu{" "}
                                        <a href="#" className="text-indigo-600 hover:underline font-medium">Termenii și Condițiile</a>
                                        {" "}și{" "}
                                        <a href="#" className="text-indigo-600 hover:underline font-medium">Politica de Confidențialitate</a>.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Se creează contul...
                                        </>
                                    ) : (
                                        <>
                                            {regRole === "student" ? "👨‍🎓" : "👨‍🏫"} Creează cont de {regRole === "student" ? "elev" : "profesor"}
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    Ai deja cont?{" "}
                                    <button type="button" onClick={() => setTab("login")} className="text-indigo-600 font-semibold hover:underline">
                                        Autentifică-te
                                    </button>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
