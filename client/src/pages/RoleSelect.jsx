import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './RoleSelect.css';

const RoleSelect = () => {
  const { auth } = useContext(AuthContext);

  // already signed in? go straight into the site
  if (auth.token) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="role-container">
      <div className="container role-inner">
        <span className="role-badge">🏫 Our School</span>
        <h1>Welcome to Our School</h1>
        <p className="role-sub">Excellence in Education | Building Future Leaders</p>
        <p className="role-prompt">Sign in to continue</p>

        <div className="role-cards">
          <Link to="/teacher-login" className="role-card teacher">
            <span className="role-icon">🎓</span>
            <h2>Teacher</h2>
            <p>Upload and manage gallery photos and notes for your classes</p>
            <span className="role-cta">Teacher Login →</span>
          </Link>

          <Link to="/student-login" className="role-card student">
            <span className="role-icon">📚</span>
            <h2>Student</h2>
            <p>View the gallery and download study notes for your standard</p>
            <span className="role-cta">Student Login →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
