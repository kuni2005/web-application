export const ROLES = {
    ADMIN: "Admin",
    SUPERADMIN: "User",
    CIUDADANO: "Ciudadano",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
