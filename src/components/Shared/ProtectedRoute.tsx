import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { user } = useAuth();
  const location = useLocation();

  // if (!initialized || loading) {
  //   return <Loader />;
  // }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.role && location.pathname !== "/role-assignment") {
    return <Navigate to="/role-assignment" replace />;
  }

  if (user.role && location.pathname === "/role-assignment") {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
