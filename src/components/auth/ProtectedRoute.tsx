// components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getSession } from '@/helpers/local-storage';

interface ProtectedRouteProps {
    allowedRoles?: ('admin' | 'pharmacy')[];
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    allowedRoles,
    children,
}) => {
    const session = getSession();

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(session.userType as 'admin' | 'pharmacy')) {
        return <Navigate to="/" replace />;
    }

    // Accès autorisé
    return <>{children}</>;
};

export default ProtectedRoute;
