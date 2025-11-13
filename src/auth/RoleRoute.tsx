import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";


interface RoleRouteProps {
    children: ReactNode;
    allowedRoles: string[];
}

export const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
    const auth = useAuth();

    if (!auth.isAuthenticated) return <Navigate to="/" replace />;

    const groups = auth.user?.profile["cognito:groups"] as string[] || [];
    const hasAccess = allowedRoles.some(role => groups.includes(role));

    return hasAccess ? children : <Navigate to="/" replace />;
};
