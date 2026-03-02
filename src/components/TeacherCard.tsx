import type { Teacher } from "../data/teachers";
import { Link } from "react-router-dom";

interface Props {
    teacher: Teacher;
}

const TeacherCard = ({ teacher }: Props) => {
    return (
        <Link
            to={`/teachers/${teacher.id}`}
            className="group block bg-white rounded-2xl border-2 border-gray-100 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
        >
            {/* Card Header - Avatar & Rating */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {teacher.name.charAt(0)}
                        </div>
                        {/* Online Status Badge */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                    </div>

                    {/* Rating Badge */}
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                        <span className="text-amber-500 text-lg">⭐</span>
                        <span className="font-bold text-gray-900">{teacher.rating}</span>
                        <span className="text-gray-500 text-sm">(24)</span>
                    </div>
                </div>

                {/* Teacher Info */}
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
                    {teacher.description || "Profesor cu experiență în predarea online. Metodă eficientă și rezultate garantate."}
                </p>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <span className="text-base">👥</span>
                        <span>{teacher.students || 150}+ elevi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-base">🎯</span>
                        <span>{teacher.experience || 5} ani exp.</span>
                    </div>
                </div>
            </div>

            {/* Card Footer - Price & CTA */}
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
                    <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    );
};

export default TeacherCard;
