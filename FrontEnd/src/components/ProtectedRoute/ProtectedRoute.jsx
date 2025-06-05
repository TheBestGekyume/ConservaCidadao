import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { usuarioId, usuarioRole, isLoaded } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (!isLoaded) return null;

  if (!token || !usuarioId)  return <Navigate to="/auth/login" replace />;
  
  if (adminOnly && usuarioRole !== 'admin')  return <Navigate to="/posts" replace />;
  
  return children;
};

export default ProtectedRoute;
