import React from 'react'
import { getDatabase, ref, query, orderByChild, get, set } from 'firebase/database';
import app from '../firebaseConfig';

const ValidationMatricula = async (matriculaParam) => {
  try {
    const db = getDatabase(app);
    const usuariosRef = ref(db, 'users/');
    const snapshot = await get(usuariosRef);
    if (snapshot.exists()) {

      const usuarios = snapshot.val();
      const usuariosFiltrados = Object.values(usuarios).filter(usuario => usuario.matricula === matriculaParam);

      if (usuariosFiltrados.length > 0) {

        return true;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default ValidationMatricula;