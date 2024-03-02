// AdminApp.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideMenu from './AdminComponents/SideMenu';
import Usuarios from './AdminComponents/Usuarios';
import Material from './AdminComponents/Material';
import Reportes from './AdminComponents/Reportes';
import Estadisticas from './AdminComponents/Estadisticas';
import MaterialActivo from './AdminComponents/MaterialActivo';
import Historial from './AdminComponents/Historial';
import ErrorPagina from '../components/ErrorPagina';

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<SideMenu Component={Usuarios} />} />
      <Route path="/Material" element={<SideMenu Component={Material} />} />
      <Route path="/Reportes" element={<SideMenu Component={Reportes} />} />
      <Route path="/Estadisticas" element={<SideMenu Component={Estadisticas} />} />
      <Route path="/MaterialActivo" element={<SideMenu Component={MaterialActivo} />} />
      <Route path="/Historial" element={<SideMenu Component={Historial} />} />
      <Route path="/*" element={<ErrorPagina />} />
    </Routes>
  );
}
