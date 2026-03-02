import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Subjects from "../pages/Subjects";
import Teachers from "../pages/Teachers";
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;

