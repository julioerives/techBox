import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRouter({ children }) {
    const { pathname, state } = useLocation();
    // Verifica si la ruta actual está dentro de /Admin
    const isInsideAdmin = pathname.startsWith('/English/Admin');
  
    return isInsideAdmin && !state?.logueado ? <Navigate to="/error" /> : children;
  }