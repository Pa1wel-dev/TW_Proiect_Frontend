import { useParams } from "react-router-dom";
import { teachers } from "../data/teachers";

const TeacherProfile = () => {
    const { id } = useParams<{ id: string }>();
    const teacher = teachers.find((t) => t.id === id);

    // Date mock pentru recenzii
    const reviews = [
        {
            id: 1,
            studentName: "Mihai S.",
            avatar: "M",
            rating: 5,
            date: "Acum 2 zile",
            comment: "Profesor excelent! Am înțeles totul foarte clar. Explică cu răbdare și are o metodă foarte eficientă. Am luat 9.80 la BAC datorită lui!"
        },
        {
            id: 2,
            studentName: "Ana P.",
            avatar: "A",
            rating: 5,
            date: "Acum 1 săptămână",
            comment: "Recomand cu încredere! M-a ajutat enorm pentru admiterea la facultate. Material bine structurat și explicații clare."
        },
        {
            id: 3,
            studentName: "Diana L.",
            avatar: "D",
            rating: 5,
            date: "Acum 2 săptămâni",
            comment: "Foarte profesionist! Am progresat mult mai repede decât mă așteptam. Merită fiecare leu investit."
        },
        {
            id: 4,
            studentName: "Cristian M.",
            avatar: "C",
            rating: 4,
            date: "Acum 3 săptămâni",
            comment: "Foarte bun profesor, explicații clare. Singura observație este că uneori orele depășesc timpul alocat, dar în rest totul perfect!"
        },
        {
            id: 5,
            studentName: "Elena V.",
            avatar: "E",
            rating: 5,
            date: "Acum 1 lună",
            comment: "Am avut o experiență excelentă! Profesorul este dedicat și își adaptează metoda de predare la nevoile fiecărui elev."
        }
    ];

    if (!teacher) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-16">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Profesor negăsit</h2>
                    <p className="text-gray-600 mb-6">
                        Profesorul pe care îl cauți nu există sau a fost șters
                    </p>
                    <a
                        href="/teachers"
                        className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        ← Înapoi la Profesori
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-16">
            <div className="w-full px-8 lg:px-16 py-12">
                {/* Back Button */}
                <a
                    href="/teachers"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-6 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Înapoi la profesori
                </a>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* LEFT SIDEBAR - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                            {/* Avatar */}
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg mb-4">
                                    {teacher.name.charAt(0)}
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900">
                                    {teacher.name}
                                </h2>
                                <p className="text-indigo-600 font-semibold text-lg mt-1">
                                    {teacher.subject}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mt-4 bg-amber-50 px-4 py-2 rounded-full">
                                    <span className="text-amber-400 text-xl">⭐</span>
                                    <span className="font-bold text-gray-900 text-lg">
                                        {teacher.rating}
                                    </span>
                                    <span className="text-gray-500 text-sm">({teacher.reviewCount} recenzii)</span>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                        ● Online Acum
                                    </span>
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
                                        ✓ Verificat
                                    </span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <span className="text-lg">👥</span> Elevi:
                                    </span>
                                    <span className="font-bold text-gray-900">{teacher.students}+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <span className="text-lg">🎯</span> Experiență:
                                    </span>
                                    <span className="font-bold text-gray-900">{teacher.experience} ani</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <span className="text-lg">📚</span> Lecții:
                                    </span>
                                    <span className="font-bold text-gray-900">1:1 Personalizate</span>
                                </div>
                            </div>

                            {/* Price & CTA */}
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-4">
                                <p className="text-sm text-gray-600 font-medium mb-1">
                                    Preț pe lecție
                                </p>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-4xl font-bold text-indigo-600">
                                        {teacher.price}
                                    </span>
                                    <span className="text-gray-600 font-semibold">RON</span>
                                </div>
                                <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                                    Programează lecție
                                </button>
                            </div>

                            <button className="w-full py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
                                Trimite mesaj
                            </button>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">👨‍🏫</span>
                                Despre mine
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {teacher.description}
                            </p>
                        </div>

                        {/* Specializations */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🎓</span>
                                Specializări
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {teacher.specializations.map((spec, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors"
                                    >
                                        ✓ {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Education & Languages */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">🎓</span>
                                    Educație
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {teacher.education}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">🌍</span>
                                    Limbi vorbite
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {teacher.languages.map((lang, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 font-medium rounded-full text-sm"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">📅</span>
                                Disponibilitate
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {teacher.availability.map((day, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-lg border border-green-200"
                                    >
                                        {day}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <span className="text-2xl">⭐</span>
                                    Recenzii ({reviews.length})
                                </h3>
                                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg">
                                    <span className="text-amber-400 text-xl">⭐</span>
                                    <span className="font-bold text-gray-900 text-lg">{teacher.rating}</span>
                                    <span className="text-gray-500 text-sm">din 5</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                {review.avatar}
                                            </div>

                                            <div className="flex-1">
                                                {/* Header */}
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">
                                                            {review.studentName}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">{review.date}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <span key={i} className="text-amber-400 text-lg">⭐</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Comment */}
                                                <p className="text-gray-700 leading-relaxed">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Show More Button */}
                            <button className="w-full mt-6 py-3 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-200">
                                Vezi toate recenziile ({teacher.reviewCount})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
