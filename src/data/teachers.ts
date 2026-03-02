export interface Teacher {
    id: number;
    name: string;
    subject: string;
    rating: number;
    price: number;
    specializations: string[];
    description?: string;
    students?: number;
    experience?: number;
}

export const teachers: Teacher[] = [
    {
        id: 1,
        name: "Elena Popescu",
        subject: "Matematică",
        rating: 4.9,
        price: 80,
        specializations: ["BAC Matematică", "Olimpiade", "Admitere Politehnică"],
        description: "Profesor cu peste 10 ani de experiență în pregătirea elevilor pentru examenele naționale și internaționale.",
        students: 180,
        experience: 10
    },
    {
        id: 2,
        name: "Dan Ionescu",
        subject: "Fizică",
        rating: 4.8,
        price: 90,
        specializations: ["BAC Fizică", "Admitere Facultate", "Olimpiade"],
        description: "Explic conceptele complexe prin exemple intuitive și aplicații practice.",
        students: 140,
        experience: 8
    },
    {
        id: 3,
        name: "Ana Marinescu",
        subject: "Engleză",
        rating: 5.0,
        price: 75,
        specializations: ["Cambridge C1", "IELTS", "Conversație"],
        description: "Pregătesc elevi pentru examene internaționale și îi ajut să vorbească fluent engleză.",
        students: 220,
        experience: 7
    },
    {
        id: 4,
        name: "Radu Georgescu",
        subject: "Informatică",
        rating: 4.9,
        price: 100,
        specializations: ["C++", "Algoritmică", "BAC Informatică"],
        description: "Fost olimpic național, pasionat de predare și programare.",
        students: 160,
        experience: 6
    }
];

