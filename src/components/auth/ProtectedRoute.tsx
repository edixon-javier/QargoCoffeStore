import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'admin' | 'supplier' | 'franchisee'>;
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Aquí podrías mostrar un spinner o pantalla de carga
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Redirige a login y guarda la ubicación anterior
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Si el usuario no tiene el rol requerido, redirige a una página de acceso denegado
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
