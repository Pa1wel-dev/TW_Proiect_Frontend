import { useParams, Link } from "react-router-dom";
import { teachers } from "../data/teachers";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Modal = "none" | "book" | "book-success";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

const getNext14Days = () => {
    const days: { label: string; value: string; dayName: string }[] = [];
    const dayNames = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"];
    const monthNames = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

// ─── Booking Modal ────────────────────────────────────────────────────────────
const BookModal = ({
                       teacher,
                       onClose,
                       onSuccess,
                   }: {
    teacher: NonNullable<ReturnType<typeof teachers.find>>;
    onClose: () => void;
    onSuccess: () => void;
}) => {
    const days = getNext14Days();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedHour, setSelectedHour] = useState("");
    const [duration, setDuration] = useState<60 | 90>(60);
    const [topic, setTopic] = useState("");
    const [level, setLevel] = useState("");

    const availableDays = days.filter(d =>
        teacher.availability.some(a =>
            ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"][
                new Date(d.value).getDay() === 0 ? 6 : new Date(d.value).getDay() - 1
                ] === a
        )
    );

    const total = teacher.price * (duration / 60);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const BOOKINGS_KEY = "learnhub_bookings";
        const existing = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
        const booking = {
            id: `booking_${Date.now()}`,
            teacherId: teacher.id,
            teacherName: teacher.name,
            teacherSubject: teacher.subject,
            date: selectedDay,
            hour: selectedHour,
            duration,
            topic,
            level,
            total: teacher.price * (duration / 60),
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...existing, booking]));
        onSuccess();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-3xl text-white">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-2xl font-bold">📅 Programează lecție</h2>
                        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-bold text-lg">×</button>
                    </div>
                    <p className="text-indigo-200 text-sm">cu {teacher.name} · {teacher.subject}</p>

                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mt-4">
                        {[1, 2, 3].map(s => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-white text-indigo-600" : "bg-white/20 text-white/60"}`}>{s}</div>
                                {s < 3 && <div className={`h-0.5 w-10 rounded transition-all ${step > s ? "bg-white" : "bg-white/20"}`} />}
                            </div>
                        ))}
                        <span className="ml-2 text-indigo-200 text-sm">
                            {step === 1 ? "Dată & oră" : step === 2 ? "Detalii lecție" : "Confirmare"}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Alege data</label>
                                <div className="grid grid-cols-7 gap-1.5">
                                    {availableDays.map(d => (
                                        <button
                                            type="button"
                                            key={d.value}
                                            onClick={() => setSelectedDay(d.value)}
                                            className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all text-center ${selectedDay === d.value ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-100 hover:border-indigo-300 text-gray-700"}`}
                                        >
                                            <span className="text-[10px] font-semibold text-gray-400">{d.dayName}</span>
                                            <span className="text-sm font-bold leading-tight">{d.label.split(" ")[0]}</span>
                                            <span className="text-[10px] text-gray-400">{d.label.split(" ")[1]}</span>
                                        </button>
                                    ))}
                                </div>
                                {availableDays.length === 0 && (
                                    <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                                        ⚠️ Verifică disponibilitatea profesorului pentru săptămânile viitoare.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Alege ora</label>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                    {HOURS.map(h => (
                                        <button
                                            type="button"
                                            key={h}
                                            onClick={() => setSelectedHour(h)}
                                            className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${selectedHour === h ? "border-indigo-600 bg-indigo-600 text-white" : "border-gray-100 hover:border-indigo-300 text-gray-700"}`}
                                        >
                                            {h}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Durata lecției</label>
                                <div className="flex gap-3">
                                    {([60, 90] as const).map(d => (
                                        <button
                                            type="button"
                                            key={d}
                                            onClick={() => setDuration(d)}
                                            className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${duration === d ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}
                                        >
                                            {d} min
                                            <span className="block text-xs font-normal mt-0.5">{teacher.price * d / 60} MDL</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                disabled={!selectedDay || !selectedHour}
                                onClick={() => setStep(2)}
                                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-lg"
                            >
                                Continuă →
                            </button>
                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Subiectul lecției *</label>
                                <input
                                    required
                                    value={topic}
                                    onChange={e => setTopic(e.target.value)}
                                    placeholder={`Ex: Ecuații de gradul II, ${teacher.specializations[0]}`}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Nivelul tău</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Începător", "Intermediar", "Avansat"].map(l => (
                                        <button
                                            type="button"
                                            key={l}
                                            onClick={() => setLevel(l)}
                                            className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${level === l ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-200 hover:border-indigo-300 text-gray-600"}`}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Mesaj pentru profesor (opțional)</label>
                                <textarea
                                    rows={3}
                                    placeholder="Descrie pe scurt ce vrei să înveți sau ce dificultăți ai..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors">← Înapoi</button>
                                <button
                                    type="button"
                                    disabled={!topic}
                                    onClick={() => setStep(3)}
                                    className="flex-[2] py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                                >
                                    Continuă →
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 3 – Confirmare */}
                    {step === 3 && (
                        <>
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 space-y-3">
                                <h3 className="font-bold text-gray-900 text-lg mb-4">Rezumat rezervare</h3>

                                {[
                                    { icon: "👨‍🏫", label: "Profesor", value: teacher.name },
                                    { icon: "📚", label: "Materie", value: teacher.subject },
                                    { icon: "📅", label: "Data", value: new Date(selectedDay).toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long" }) },
                                    { icon: "🕐", label: "Ora", value: `${selectedHour} – ${HOURS[HOURS.indexOf(selectedHour) + (duration === 60 ? 1 : 2)] || "~"}` },
                                    { icon: "⏱️", label: "Durata", value: `${duration} minute` },
                                    { icon: "🎯", label: "Subiect", value: topic },
                                ].map(row => (
                                    <div key={row.label} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">{row.icon} {row.label}</span>
                                        <span className="font-semibold text-gray-800 text-right max-w-[55%]">{row.value}</span>
                                    </div>
                                ))}

                                <div className="border-t border-indigo-200 pt-3 flex items-center justify-between">
                                    <span className="font-bold text-gray-700">Total de plătit</span>
                                    <span className="text-2xl font-bold text-indigo-600">{total} MDL</span>
                                </div>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                                <strong>ℹ️ Notă:</strong> Plata se face direct profesorului la începutul lecției. Poți anula gratuit cu cel puțin 24h înainte.
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors">← Înapoi</button>
                                <button
                                    type="submit"
                                    className="flex-[2] py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                                >
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

// ─── Success Modal ─────────────────────────────────────────────────────────────
const SuccessModal = ({
                          teacherName,
                          onClose,
                      }: {
    teacherName: string;
    onClose: () => void;
}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-4 animate-bounce">
                🎉
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cerere trimisă!</h2>
            <p className="text-gray-500 mb-2">
                {teacherName.split(" ")[0]} a primit cererea ta și o va confirma în curând.
            </p>
            <p className="text-sm text-indigo-600 font-medium mb-6">
                📋 Lecția apare în dashboard-ul profesorului ca „În așteptare".
            </p>
            <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
                Înapoi la profil
            </button>
        </div>
    </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
const TeacherProfile = () => {
    const { id } = useParams<{ id: string }>();
    const teacher = teachers.find(t => t.id === id);
    const [modal, setModal] = useState<Modal>("none");

    const reviews = [
        { id: 1, studentName: "Mihai S.", avatar: "M", rating: 5, date: "Acum 2 zile", comment: "Profesor excelent! Am înțeles totul foarte clar. Explică cu răbdare și are o metodă foarte eficientă. Am luat 9.80 la BAC datorită lui!" },
        { id: 2, studentName: "Ana P.", avatar: "A", rating: 5, date: "Acum 1 săptămână", comment: "Recomand cu încredere! M-a ajutat enorm pentru admiterea la facultate. Material bine structurat și explicații clare." },
        { id: 3, studentName: "Diana L.", avatar: "D", rating: 5, date: "Acum 2 săptămâni", comment: "Foarte profesionist! Am progresat mult mai repede decât mă așteptam. Merită fiecare leu investit." },
        { id: 4, studentName: "Cristian M.", avatar: "C", rating: 4, date: "Acum 3 săptămâni", comment: "Foarte bun profesor, explicații clare. Singura observație este că uneori orele depășesc timpul alocat, dar în rest totul perfect!" },
        { id: 5, studentName: "Elena V.", avatar: "E", rating: 5, date: "Acum 1 lună", comment: "Am avut o experiență excelentă! Profesorul este dedicat și își adaptează metoda de predare la nevoile fiecărui elev." },
    ];

    if (!teacher) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-16">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Profesor negăsit</h2>
                    <p className="text-gray-600 mb-6">Profesorul pe care îl cauți nu există sau a fost șters</p>
                    <Link to="/teachers" className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                        ← Înapoi la Profesori
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16">
                <div className="w-full px-8 lg:px-16 py-12">
                    {/* Back */}
                    <Link to="/teachers" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-6 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Înapoi la profesori
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* ── LEFT SIDEBAR ── */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                                {/* Avatar */}
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg mb-4 overflow-hidden">
                                        {teacher.avatar
                                            ? <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                                            : teacher.name.charAt(0)
                                        }
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
                                    <p className="text-indigo-600 font-semibold text-lg mt-1">{teacher.subject}</p>

                                    <div className="flex items-center gap-2 mt-4 bg-amber-50 px-4 py-2 rounded-full">
                                        <span className="text-amber-400 text-xl">⭐</span>
                                        <span className="font-bold text-gray-900 text-lg">{teacher.rating}</span>
                                        <span className="text-gray-500 text-sm">({teacher.reviewCount} recenzii)</span>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">● Online Acum</span>
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">✓ Verificat</span>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 flex items-center gap-2"><span>👥</span> Elevi:</span>
                                        <span className="font-bold text-gray-900">{teacher.students}+</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 flex items-center gap-2"><span>🎯</span> Experiență:</span>
                                        <span className="font-bold text-gray-900">{teacher.experience} ani</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 flex items-center gap-2"><span>📚</span> Lecții:</span>
                                        <span className="font-bold text-gray-900">1:1 Personalizate</span>
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-4">
                                    <p className="text-sm text-gray-600 font-medium mb-1">Preț pe lecție</p>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-4xl font-bold text-indigo-600">{teacher.price}</span>
                                        <span className="text-gray-600 font-semibold">MDL</span>
                                    </div>
                                    <button
                                        onClick={() => setModal("book")}
                                        className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Programează lecție
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT CONTENT ── */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* About */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><span>👨‍🏫</span> Despre mine</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{teacher.description}</p>
                            </div>

                            {/* Specializations */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><span>🎓</span> Specializări</h3>
                                <div className="flex flex-wrap gap-3">
                                    {teacher.specializations.map((spec, i) => (
                                        <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">
                                            ✓ {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Education & Languages */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><span>🎓</span> Educație</h3>
                                    <p className="text-gray-700 leading-relaxed">{teacher.education}</p>
                                </div>
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><span>🌍</span> Limbi vorbite</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {teacher.languages.map((lang, i) => (
                                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 font-medium rounded-full text-sm">{lang}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><span>📅</span> Disponibilitate</h3>
                                    <button
                                        onClick={() => setModal("book")}
                                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
                                    >
                                        Rezervă acum →
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {teacher.availability.map((day, i) => (
                                        <span key={i} className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-lg border border-green-200">{day}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><span>⭐</span> Recenzii ({reviews.length})</h3>
                                    <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg">
                                        <span className="text-amber-400 text-xl">⭐</span>
                                        <span className="font-bold text-gray-900 text-lg">{teacher.rating}</span>
                                        <span className="text-gray-500 text-sm">din 5</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {reviews.map(review => (
                                        <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                    {review.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-bold text-gray-900">{review.studentName}</h4>
                                                            <p className="text-sm text-gray-500">{review.date}</p>
                                                        </div>
                                                        <div className="flex items-center gap-0.5">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <span key={i} className="text-amber-400 text-lg">⭐</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-6 py-3 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-200">
                                    Vezi toate recenziile ({teacher.reviewCount})
                                </button>
                            </div>

                            {/* Bottom CTA strip */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <div className="font-bold text-lg">Gata să începi?</div>
                                    <div className="text-indigo-200 text-sm">Prima lecție cu {teacher.name.split(" ")[0]} poate fi chiar mâine.</div>
                                </div>
                                <button
                                    onClick={() => setModal("book")}
                                    className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors text-sm shadow-lg"
                                >
                                    📅 Rezervă lecție
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {modal === "book" && (
                <BookModal
                    teacher={teacher}
                    onClose={() => setModal("none")}
                    onSuccess={() => setModal("book-success")}
                />
            )}
            {modal === "book-success" && (
                <SuccessModal
                    teacherName={teacher.name}
                    onClose={() => setModal("none")}
                />
            )}
        </>
    );
};

export default TeacherProfile;
