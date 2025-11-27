// import React from "react";
// solo seria ejemplo de como importar componentes y usarlos en la página

import { Dashboard } from "@/components/Dashboard";

type ViewType = 'home' | 'settings' | 'wallet';

const handleViewChange = (view: ViewType) => {
  console.log(`Cambiando de vista a: ${view}`);
};

const handleStartTramite = (id: string, name: string) => {
  console.log(`Iniciando trámite: ${name} (ID: ${id})`);
};

export const DashboardPage = () => {
    return(
        <div>
            <Dashboard 
            onViewChange={handleViewChange} 
            onStartTramite={handleStartTramite}/>
            Dashboard Page
        </div>
    )
}