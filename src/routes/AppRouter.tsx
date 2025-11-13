import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { RoleRoute } from '@/auth/RoleRoute';

export const AppRouter = () => {

    const AppRoles = {
        ADMIN: "Admin",
        USER: "User"
    } as const;

    return (

        <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path="/" element={<div>Home Public</div>} />
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
                    <RoleRoute allowedRoles={[AppRoles.ADMIN]}>
                        <div>Ruta Protegida con vista para el admin</div>
                    </RoleRoute>
                }
            />
            <Route
                path="/rol2"
                element={
                    <RoleRoute allowedRoles={[AppRoles.USER]}>
                        <div>Ruta Protegida con vista para el usuario</div>
                    </RoleRoute>
                }
            />

        </Routes>
    )
}