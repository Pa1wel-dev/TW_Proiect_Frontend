// src/utils/seedDemoAccounts.ts
// Apelează această funcție o singură dată la inițializare (în main.tsx)

const STORAGE_KEY = "learnhub_users";

export const seedDemoAccounts = () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return; // already seeded

    const demoUsers = [
        {
            id: "demo_student",
            name: "Alex Ionescu",
            email: "elev@demo.com",
            password: "demo123",
            role: "student",
            createdAt: new Date().toISOString(),
        },
        {
            id: "demo_teacher",
            name: "Elena Popescu",
            email: "profesor@demo.com",
            password: "demo123",
            role: "teacher",
            subject: "Matematică",
            createdAt: new Date().toISOString(),
        },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUsers));
};