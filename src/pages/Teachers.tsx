import TeacherCard from "../components/TeacherCard";
import { teachers } from "../data/teachers";

const Teachers = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="p-8">
                {/* Titlu Pagina */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Profesori disponibili
                </h1>

                {/* Grid Profesori */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teachers.map((teacher) => (
                        <TeacherCard key={teacher.id} teacher={teacher} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Teachers;
