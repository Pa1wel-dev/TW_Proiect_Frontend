import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import Home from "../pages/Home";
import Subjects from "../pages/Subjects";
import Teachers from "../pages/Teachers";
import TeacherProfile from "../pages/TeacherProfile";
import TeacherDashboard from "../pages/TeacherDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import AuthPage from "../pages/AuthPage";
import ProfilePage from "../pages/ProfilePage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { AuthProvider, useAuth } from "../context/AuthContext";

// ─── Protected Route ─────────────────────────────────────────────────────────
const ProtectedRoute = ({
                            children,
                            requiredRole,
                        }: {
    children: ReactNode;
    requiredRole?: "student" | "teacher";
}) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-16">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <p className="text-gray-500 font-medium">Se încarcă...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        // Wrong role — redirect to their correct dashboard
        return (
            <Navigate
                to={user?.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"}
                replace
            />
        );
    }

    return <>{children}</>;
};

// ─── Auth redirect (if already logged in, skip auth page) ────────────────────
const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, user } = useAuth();
    if (isAuthenticated && user) {
        return <Navigate to={user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"} replace />;
    }
    return <>{children}</>;
};

// ─── Routes wrapped inside BrowserRouter + AuthProvider ──────────────────────
const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/teachers/:id" element={<TeacherProfile />} />

                {/* Auth */}
                <Route
                    path="/auth"
                    element={
                        <AuthGuard>
                            <AuthPage />
                        </AuthGuard>
                    }
                />

                {/* Profile */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* Protected dashboards */}
                <Route
                    path="/dashboard/student"
                    element={
                        <ProtectedRoute requiredRole="student">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/teacher"
                    element={
                        <ProtectedRoute requiredRole="teacher">
                            <TeacherDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </>
    );
};

const AppRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRouter;
