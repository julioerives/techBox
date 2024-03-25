import React from 'react'
import { getDatabase, ref, query, orderByChild, get, set } from 'firebase/database';
import app from '../../firebaseConfig';
const UserFind = async(matricula)=> {
  console.log(matricula);
    try {
        const db = getDatabase(app);
        const usuariosRef = ref(db, 'users/'+matricula);
        const snapshot = await get(usuariosRef);
        if (snapshot.exists()) {
    
          const usuarios = snapshot.val();
          console.log(usuarios)
          return usuarios
        } else {
          return null;
        }
      } catch (err) {
        console.error(err);
      }

}
export default UserFind