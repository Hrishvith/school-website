import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import RoleSelect from './pages/RoleSelect';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Notes from './pages/Notes';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <Routes>
        {/* landing = role selection gate */}
        <Route path="/" element={<RoleSelect />} />

        {/* login pages (redirect into the site if already signed in) */}
        <Route
          path="/teacher-login"
          element={auth.token ? <Navigate to="/gallery" replace /> : <TeacherLogin />}
        />
        <Route
          path="/student-login"
          element={auth.token ? <Navigate to="/notes" replace /> : <StudentLogin />}
        />

        {/* signed-in site */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/about"
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          }
        />
        <Route
          path="/gallery"
          element={
            <RequireAuth>
              <Gallery />
            </RequireAuth>
          }
        />
        <Route
          path="/notes"
          element={
            <RequireAuth>
              <Notes />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
