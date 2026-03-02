// src/data/teachers.ts

export interface Teacher {
    id: string;
    name: string;
    subject: string;
    price: number;
    rating: number;
    avatar?: string;
    specializations: string[];
    description: string;
    students: number;
    experience: number;
    education: string;
    languages: string[];
    availability: string[];
    reviewCount: number;
}

export const teachers: Teacher[] = [
    // ========== MATEMATICĂ ==========
    {
        id: "1",
        name: "Elena Popescu",
        subject: "Matematică",
        price: 80,
        rating: 4.9,
        avatar: "https://ui-avatars.com/api/?name=Elena+Popescu&background=4F46E5&color=fff&size=200&bold=true",
        specializations: ["BAC Matematică", "Admitere Facultate", "Olimpiade", "Matematică M1/M2"],
        description: "Profesor de matematică cu 8 ani experiență în pregătirea pentru BAC și admitere. Metodă structurată, explicații clare și rezultate garantate. Rata de promovare: 98%.",
        students: 234,
        experience: 8,
        education: "Facultatea de Matematică, Universitatea București",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Miercuri", "Vineri", "Sâmbătă"],
        reviewCount: 87
    },
    {
        id: "2",
        name: "Mihai Constantinescu",
        subject: "Matematică",
        price: 90,
        rating: 5.0,
        avatar: "https://ui-avatars.com/api/?name=Mihai+Constantinescu&background=7C3AED&color=fff&size=200&bold=true",
        specializations: ["Matematică Avansată", "Analiză Matematică", "Algebră", "Admitere Politehnica"],
        description: "Doctor în matematică, fost olimpic internațional. Specializat în pregătirea pentru admiterea la Politehnica și facultăți de profil. Abordare profundă și intuitivă.",
        students: 178,
        experience: 12,
        education: "Doctorat Matematică, Politehnica București",
        languages: ["Română", "Engleză", "Franceză"],
        availability: ["Marți", "Joi", "Vineri", "Duminică"],
        reviewCount: 156
    },
    {
        id: "3",
        name: "Ana Gheorghiu",
        subject: "Matematică",
        price: 70,
        rating: 4.8,
        avatar: "https://ui-avatars.com/api/?name=Ana+Gheorghiu&background=EC4899&color=fff&size=200&bold=true",
        specializations: ["BAC Matematică", "Matematică Gimnaziu", "Evaluare Națională"],
        description: "Profesor pasionat cu metodă prietenoasă. Specializată în pregătirea pentru BAC și Evaluare Națională. Transform matematica într-o materie accesibilă și plăcută.",
        students: 156,
        experience: 6,
        education: "Facultatea de Matematică-Informatică, UBB Cluj",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Marți", "Miercuri", "Joi"],
        reviewCount: 64
    },

    // ========== ENGLEZĂ ==========
    {
        id: "4",
        name: "Andrei Ionescu",
        subject: "Engleză",
        price: 90,
        rating: 4.9,
        avatar: "https://ui-avatars.com/api/?name=Andrei+Ionescu&background=10B981&color=fff&size=200&bold=true",
        specializations: ["Cambridge C1/C2", "TOEFL", "IELTS", "Business English"],
        description: "Certificat Cambridge C2 (Proficiency), experiență internațională în UK și SUA. Pregătire pentru toate examenele Cambridge, TOEFL și IELTS. Rata de promovare: 98%.",
        students: 456,
        experience: 10,
        education: "Master Limbi Străine, University of Cambridge",
        languages: ["Română", "Engleză", "Franceză"],
        availability: ["Marți", "Joi", "Sâmbătă", "Duminică"],
        reviewCount: 312
    },
    {
        id: "5",
        name: "Diana Marinescu",
        subject: "Engleză",
        price: 85,
        rating: 4.9,
        avatar: "https://ui-avatars.com/api/?name=Diana+Marinescu&background=F59E0B&color=fff&size=200&bold=true",
        specializations: ["Cambridge B2 First", "IELTS Academic", "Conversație", "Engleză BAC"],
        description: "Native-level English speaker, 7 ani experiență în predare. Metodă comunicativă, focus pe vorbire și ascultare. Perfectă pentru cei care vor să vorbească fluent.",
        students: 298,
        experience: 7,
        education: "Filologie Engleză, Universitatea București + CELTA",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Miercuri", "Vineri", "Sâmbătă"],
        reviewCount: 187
    },
    {
        id: "6",
        name: "Robert Williams",
        subject: "Engleză",
        price: 100,
        rating: 5.0,
        avatar: "https://ui-avatars.com/api/?name=Robert+Williams&background=3B82F6&color=fff&size=200&bold=true",
        specializations: ["TOEFL iBT", "Academic English", "Essay Writing", "SAT Prep"],
        description: "Native English teacher from USA. Specialized in TOEFL and academic English for university applications. 15 years experience. Perfect for students applying to US/UK universities.",
        students: 387,
        experience: 15,
        education: "Master TESOL, Columbia University",
        languages: ["English", "Romanian (intermediate)"],
        availability: ["Marți", "Joi", "Vineri", "Sâmbătă"],
        reviewCount: 245
    },

    // ========== ROMÂNĂ ==========
    {
        id: "7",
        name: "Maria Georgescu",
        subject: "Română",
        price: 75,
        rating: 4.8,
        avatar: "https://ui-avatars.com/api/?name=Maria+Georgescu&background=EF4444&color=fff&size=200&bold=true",
        specializations: ["BAC Română", "Comentariu Literar", "Eseu Argumentativ", "Analiză Operă"],
        description: "Pasionată de literatura română cu metodă inovatoare. Specializată în comentariu literar și eseu argumentativ. Transform literatura într-o experiență captivantă.",
        students: 203,
        experience: 9,
        education: "Facultatea de Litere, Universitatea București",
        languages: ["Română"],
        availability: ["Luni", "Marți", "Joi", "Vineri"],
        reviewCount: 89
    },
    {
        id: "8",
        name: "Ion Popa",
        subject: "Română",
        price: 70,
        rating: 4.7,
        avatar: "https://ui-avatars.com/api/?name=Ion+Popa&background=8B5CF6&color=fff&size=200&bold=true",
        specializations: ["Română BAC", "Literatură Română", "Gramatică", "Ortografie"],
        description: "Profesor cu 12 ani experiență, autor de materiale didactice. Abordare sistematică, structurată. Excelent pentru elevii care vor note mari la BAC.",
        students: 267,
        experience: 12,
        education: "Doctorat Literatură Română, UBB Cluj",
        languages: ["Română", "Franceză"],
        availability: ["Miercuri", "Joi", "Sâmbătă", "Duminică"],
        reviewCount: 134
    },

    // ========== FIZICĂ ==========
    {
        id: "9",
        name: "Dan Popovici",
        subject: "Fizică",
        price: 85,
        rating: 4.9,
        avatar: "https://ui-avatars.com/api/?name=Dan+Popovici&background=06B6D4&color=fff&size=200&bold=true",
        specializations: ["BAC Fizică", "Olimpiade", "Admitere Politehnica", "Fizică Liceu"],
        description: "Profesor cu experiență vastă în pregătirea pentru olimpiade și admitere la facultăți tehnice. Abordare practică și intuitivă. Fizica devine ușoară!",
        students: 312,
        experience: 14,
        education: "Facultatea de Fizică, Universitatea Politehnica București",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Miercuri", "Joi", "Vineri"],
        reviewCount: 178
    },
    {
        id: "10",
        name: "Alexandru Dinu",
        subject: "Fizică",
        price: 80,
        rating: 4.8,
        avatar: "https://ui-avatars.com/api/?name=Alexandru+Dinu&background=14B8A6&color=fff&size=200&bold=true",
        specializations: ["Mecanică", "Electricitate", "Termodinamică", "Fizică Modernă"],
        description: "Inginer fizician cu pasiune pentru predare. Explicații clare cu multe exemple practice. Ideal pentru cei care vor să înțeleagă profund conceptele.",
        students: 189,
        experience: 8,
        education: "Master Fizică Aplicată, Politehnica București",
        languages: ["Română", "Engleză", "Germană"],
        availability: ["Marți", "Joi", "Sâmbătă", "Duminică"],
        reviewCount: 95
    },

    // ========== CHIMIE ==========
    {
        id: "11",
        name: "Ioana Dumitrescu",
        subject: "Chimie",
        price: 80,
        rating: 4.9,
        avatar: "https://ui-avatars.com/api/?name=Ioana+Dumitrescu&background=F97316&color=fff&size=200&bold=true",
        specializations: ["BAC Chimie", "Admitere Medicină", "Admitere Farmacie", "Chimie Organică"],
        description: "Specializată în pregătire pentru admiterea la medicină și farmacie. Metodă eficientă, material complet. Rezultate excelente în ultimii 8 ani: 95% rată de admitere.",
        students: 245,
        experience: 10,
        education: "Facultatea de Chimie, UMF Carol Davila",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Miercuri", "Vineri", "Sâmbătă"],
        reviewCount: 167
    },
    {
        id: "12",
        name: "Cristian Vasile",
        subject: "Chimie",
        price: 75,
        rating: 4.7,
        avatar: "https://ui-avatars.com/api/?name=Cristian+Vasile&background=84CC16&color=fff&size=200&bold=true",
        specializations: ["Chimie Anorganică", "Chimie Organică", "BAC Chimie", "Olimpiade"],
        description: "Profesor și cercetător în domeniul chimiei. Abordare teoretică și practică. Perfect pentru olimpiade și BAC. Transformă chimia într-o știință fascinantă.",
        students: 167,
        experience: 11,
        education: "Doctorat Chimie, Universitatea București",
        languages: ["Română", "Engleză"],
        availability: ["Marți", "Joi", "Vineri", "Duminică"],
        reviewCount: 94
    },

    // ========== INFORMATICĂ ==========
    {
        id: "13",
        name: "Alexandru Radu",
        subject: "Informatică",
        price: 100,
        rating: 5.0,
        avatar: "https://ui-avatars.com/api/?name=Alexandru+Radu&background=6366F1&color=fff&size=200&bold=true",
        specializations: ["Programare C++", "Python", "BAC Informatică", "Olimpiade", "Algoritmi"],
        description: "Software engineer și profesor de informatică. Medalist olimpiad, 9 ani experiență în industrie. Predare modernă, orientată spre practică și rezolvare de probleme.",
        students: 389,
        experience: 12,
        education: "Facultatea de Automatică și Calculatoare, Politehnica București",
        languages: ["Română", "Engleză"],
        availability: ["Marți", "Joi", "Sâmbătă", "Duminică"],
        reviewCount: 256
    },
    {
        id: "14",
        name: "Vlad Popescu",
        subject: "Informatică",
        price: 90,
        rating: 4.9,
        avatar: "https://ui-avatars.com/api/?name=Vlad+Popescu&background=A855F7&color=fff&size=200&bold=true",
        specializations: ["Web Development", "JavaScript", "React", "Python", "Programare Începători"],
        description: "Full-stack developer cu pasiune pentru teaching. Specializat în web development modern. Ideal pentru cei care vor să învețe programare de la zero sau să se perfecționeze.",
        students: 298,
        experience: 7,
        education: "Computer Science, Universitatea Politehnica + Bootcamp",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Miercuri", "Vineri", "Sâmbătă"],
        reviewCount: 189
    },

    // ========== BIOLOGIE ==========
    {
        id: "15",
        name: "Laura Munteanu",
        subject: "Biologie",
        price: 75,
        rating: 4.8,
        avatar: "https://ui-avatars.com/api/?name=Laura+Munteanu&background=10B981&color=fff&size=200&bold=true",
        specializations: ["BAC Biologie", "Admitere Medicină", "Anatomie", "Genetică"],
        description: "Medic și profesor de biologie. Specializată în pregătire pentru admiterea la medicină. Explicații clare, bazate pe experiență medicală. Rata de succes: 92%.",
        students: 267,
        experience: 9,
        education: "UMF Carol Davila - Medicină Generală",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Marți", "Joi", "Sâmbătă"],
        reviewCount: 143
    },
    {
        id: "16",
        name: "Andrei Stanciu",
        subject: "Biologie",
        price: 70,
        rating: 4.7,
        avatar: "https://ui-avatars.com/api/?name=Andrei+Stanciu&background=22C55E&color=fff&size=200&bold=true",
        specializations: ["Botanică", "Zoologie", "Ecologie", "BAC Biologie"],
        description: "Biolog cu doctorat în ecologie. Pasionat de natură și predare. Metodă interactivă cu multe exemple din viața reală. Biologia devine fascinantă!",
        students: 178,
        experience: 8,
        education: "Doctorat Biologie, Universitatea București",
        languages: ["Română", "Engleză", "Germană"],
        availability: ["Miercuri", "Joi", "Vineri", "Duminică"],
        reviewCount: 87
    },

    // ========== ISTORIE ==========
    {
        id: "17",
        name: "Mihaela Ionescu",
        subject: "Istorie",
        price: 65,
        rating: 4.8,
        avatar: "https://ui-avatars.com/api/?name=Mihaela+Ionescu&background=F59E0B&color=fff&size=200&bold=true",
        specializations: ["BAC Istorie", "Istorie Universală", "Istorie României", "Eseu Istoric"],
        description: "Profesor pasionat de istorie cu metodă narativă captivantă. Transform istoria într-o poveste fascinantă. Pregătire completă pentru BAC, rezultate excelente.",
        students: 198,
        experience: 10,
        education: "Facultatea de Istorie, Universitatea București",
        languages: ["Română", "Engleză", "Franceză"],
        availability: ["Luni", "Miercuri", "Vineri", "Sâmbătă"],
        reviewCount: 102
    },

    // ========== GEOGRAFIE ==========
    {
        id: "18",
        name: "Teodor Popescu",
        subject: "Geografie",
        price: 65,
        rating: 4.7,
        avatar: "https://ui-avatars.com/api/?name=Teodor+Popescu&background=3B82F6&color=fff&size=200&bold=true",
        specializations: ["BAC Geografie", "Geografie Fizică", "Geografie Umană", "Geografie România"],
        description: "Geograf cu experiență în predare și cercetare. Utilizez hărți interactive și materiale vizuale. Geografia devine ușor de învățat și de reținut.",
        students: 156,
        experience: 8,
        education: "Facultatea de Geografie, UBB Cluj",
        languages: ["Română", "Engleză"],
        availability: ["Marți", "Joi", "Sâmbătă", "Duminică"],
        reviewCount: 78
    },

    // ========== FRANCEZĂ ==========
    {
        id: "19",
        name: "Sophie Blanc",
        subject: "Franceză",
        price: 85,
        rating: 4.9,
        avatar: "https://ui-avatars.com/api/?name=Sophie+Blanc&background=EF4444&color=fff&size=200&bold=true",
        specializations: ["DELF B1/B2", "DALF C1", "Conversație Franceză", "BAC Franceză"],
        description: "Native French speaker din Paris. 8 ani experiență în România. Metodă comunicativă, focus pe vorbire. Pregătire pentru DELF/DALF și BAC. Franceză autentică!",
        students: 234,
        experience: 8,
        education: "Master FLE (Français Langue Étrangère), Sorbonne",
        languages: ["Français", "English", "Română"],
        availability: ["Luni", "Miercuri", "Joi", "Sâmbătă"],
        reviewCount: 156
    },

    // ========== GERMANĂ ==========
    {
        id: "20",
        name: "Klaus Müller",
        subject: "Germană",
        price: 90,
        rating: 4.8,
        avatar: "https://ui-avatars.com/api/?name=Klaus+Muller&background=EAB308&color=fff&size=200&bold=true",
        specializations: ["Goethe B1/B2", "Goethe C1", "Germană BAC", "Business Deutsch"],
        description: "Native German speaker from Munich. Certified Goethe Institut teacher. 10 years teaching experience. Perfect pronunciation and grammar. Prepare for Goethe exams or BAC.",
        students: 189,
        experience: 10,
        education: "DaF Teacher Training, Goethe Institut",
        languages: ["Deutsch", "English", "Română (bine)"],
        availability: ["Marți", "Joi", "Vineri", "Duminică"],
        reviewCount: 124
    },

    // ========== ECONOMIE ==========
    {
        id: "21",
        name: "Adriana Stoica",
        subject: "Economie",
        price: 70,
        rating: 4.7,
        avatar: "https://ui-avatars.com/api/?name=Adriana+Stoica&background=10B981&color=fff&size=200&bold=true",
        specializations: ["BAC Economie", "Microeconomie", "Macroeconomie", "Contabilitate"],
        description: "Economist și profesor cu experiență practică în business. Explicații clare ale conceptelor economice complexe. Legătura între teorie și practică.",
        students: 167,
        experience: 9,
        education: "ASE București - Finanțe și Bănci",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Miercuri", "Vineri", "Sâmbătă"],
        reviewCount: 89
    },

    // ========== FILOSOFIE ==========
    {
        id: "22",
        name: "Radu Dinescu",
        subject: "Filosofie",
        price: 65,
        rating: 4.6,
        avatar: "https://ui-avatars.com/api/?name=Radu+Dinescu&background=8B5CF6&color=fff&size=200&bold=true",
        specializations: ["BAC Filosofie", "Logică", "Etică", "Eseu Filosofic"],
        description: "Profesor de filosofie cu abordare modernă și accesibilă. Transform filosofia într-o materie interesantă și utilă. Pregătire completă pentru BAC.",
        students: 134,
        experience: 7,
        education: "Facultatea de Filosofie, Universitatea București",
        languages: ["Română", "Engleză"],
        availability: ["Marți", "Joi", "Sâmbătă", "Duminică"],
        reviewCount: 67
    },

    // ========== LOGICĂ ==========
    {
        id: "23",
        name: "Gabriel Marinescu",
        subject: "Logică",
        price: 70,
        rating: 4.8,
        avatar: "https://ui-avatars.com/api/?name=Gabriel+Marinescu&background=06B6D4&color=fff&size=200&bold=true",
        specializations: ["BAC Logică", "Argumentare", "Silogisme", "Raționament"],
        description: "Specialist în logică formală și informală. Metodă pas cu pas pentru rezolvarea problemelor. Logica devine o materie ușoară și plăcută.",
        students: 145,
        experience: 6,
        education: "Filosofie, specializare Logică, UBB Cluj",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Miercuri", "Joi", "Vineri"],
        reviewCount: 73
    },

    // ========== PSIHOLOGIE ==========
    {
        id: "24",
        name: "Carmen Voicu",
        subject: "Psihologie",
        price: 75,
        rating: 4.9,
        avatar: "https://ui-avatars.com/api/?name=Carmen+Voicu&background=EC4899&color=fff&size=200&bold=true",
        specializations: ["BAC Psihologie", "Psihologie Generală", "Psihologie Educației", "Admitere Psihologie"],
        description: "Psiholog clinician și profesor universitar. Abordare practică cu multe exemple din viața reală. Pregătire pentru BAC și admiterea la facultate.",
        students: 189,
        experience: 11,
        education: "Doctorat Psihologie, Universitatea București",
        languages: ["Română", "Engleză"],
        availability: ["Luni", "Marți", "Joi", "Sâmbătă"],
        reviewCount: 112
    },

    // ========== SPANIOLĂ ==========
    {
        id: "25",
        name: "Carlos Garcia",
        subject: "Spaniolă",
        price: 80,
        rating: 4.8,
        avatar: "https://ui-avatars.com/api/?name=Carlos+Garcia&background=F97316&color=fff&size=200&bold=true",
        specializations: ["DELE B1/B2", "Conversație Spaniolă", "BAC Spaniolă", "Spaniolă pentru Călătorii"],
        description: "Native Spanish speaker from Madrid. 7 years teaching in Romania. Communicative method, lots of conversation. Fun and effective lessons. ¡Vamos a aprender español!",
        students: 167,
        experience: 7,
        education: "ELE Certificate (Español Lengua Extranjera), Cervantes Institute",
        languages: ["Español", "English", "Română (bine)"],
        availability: ["Marți", "Miercuri", "Vineri", "Duminică"],
        reviewCount: 98
    }
];

// Helper functions
export const getTeacherById = (id: string): Teacher | undefined => {
    return teachers.find(teacher => teacher.id === id);
};

export const getTeachersBySubject = (subject: string): Teacher[] => {
    return teachers.filter(teacher => teacher.subject === subject);
};

export const getTopRatedTeachers = (limit: number = 6): Teacher[] => {
    return [...teachers]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
};

export const searchTeachers = (query: string): Teacher[] => {
    const lowerQuery = query.toLowerCase();
    return teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(lowerQuery) ||
        teacher.subject.toLowerCase().includes(lowerQuery) ||
        teacher.specializations.some(spec => spec.toLowerCase().includes(lowerQuery)) ||
        teacher.description.toLowerCase().includes(lowerQuery)
    );
};

export const getUniqueSubjects = (): string[] => {
    return [...new Set(teachers.map(teacher => teacher.subject))].sort();
};

export const filterTeachers = (filters: {
    subject?: string;
    minRating?: number;
    maxPrice?: number;
    minPrice?: number;
}): Teacher[] => {
    return teachers.filter(teacher => {
        if (filters.subject && teacher.subject !== filters.subject) return false;
        if (filters.minRating && teacher.rating < filters.minRating) return false;
        if (filters.maxPrice && teacher.price > filters.maxPrice) return false;
        if (filters.minPrice && teacher.price < filters.minPrice) return false;
        return true;
    });
};