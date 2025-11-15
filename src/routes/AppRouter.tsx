import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { RoleRoute } from '@/auth/RoleRoute';

import { ROLES } from '@/utils/roles';


// Páginas públicas ===================================
import { Login } from "@/pages/Login";
// import Login from "../pages/Login";
// import Info from "../pages/Info";

// Páginas de administración ===============================
// import AdminPage from "../pages/AdminPage";
// import EditorPage from "../pages/EditorPage";

// Páginas de error / no autorizado ===========================
// import NotAuthorized from "../pages/NotAuthorized";
// import NotFound from "../pages/NotFound";

export const AppRouter = () => {
    return (

        <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path="/" element={<div>Home Public</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/rutapublica2" element={<div>Home Public 2</div>} />


            {/* RUTAS PROTEGIDAS */}
            <Route
                path="/dadwa"
                element={
                    <ProtectedRoute>
                        <div>Ruta Protegida</div>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dadwa"
                element={
                    <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}>
                        <div>Ruta Protegida con vista para el admin</div>
                    </RoleRoute>
                }
            />
            <Route
                path="/rol2"
                element={
                    <RoleRoute allowedRoles={[ROLES.CIUDADANO]}>
                        <div>Ruta Protegida con vista para el usuario</div>
                    </RoleRoute>
                }
            />

            <Route path="*" element={<Navigate to="/not-found" replace />} />


        </Routes>
    )
}