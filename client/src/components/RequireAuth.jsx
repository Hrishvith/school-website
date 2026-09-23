import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
