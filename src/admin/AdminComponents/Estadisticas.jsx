import React, { useEffect, useState } from 'react'
import app from '../../firebaseConfig';
import RecordPedidos from './stats/RecordPedidos';
import { getDatabase, ref, get, remove } from "firebase/database";
import RecordPedidosMes from './stats/RecordPedidosMes';
import PedidosSemana from './stats/PedidosSemana';
import UsuariosFrecuentes from './stats/UsuariosFrecuentes';
import RegistroHistoria from './stats/RegistroHistoria';
import UsuariosMes from './stats/UsuariosMes';
export default function Estadisticas() {
  const [historial, setHistorial] = useState([])
  const fetchHistorial = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "loans/history");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const myData = snapshot.val();
        console.log(myData);
        const temporaryArray = Object.keys(myData).map((myFireId) => ({
          ...myData[myFireId],
          itemId: myFireId,
        }));
        console.log(temporaryArray);
        setHistorial(temporaryArray);
        
      } else {
        console.log("No se pudo conectar");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error.message);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);
  useEffect(() => {
    console.log("Historial actualizado:", historial);
  }, [historial]);
  return (
    <div className='flex gap-8 flex-col'>
      <h1 className='text-center font-medium text-3xl'>Material</h1>
      <hr />
       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
       <RecordPedidos historial={historial}></RecordPedidos>
  
    
    <RecordPedidosMes historial={historial}></RecordPedidosMes>
</div>
<div className="w-full h-54 flex items-center justify-center">
  
  <PedidosSemana historial={historial}></PedidosSemana></div>
  <h1 className='text-center font-medium text-3xl'>General</h1>
      <hr />
<div className="grid h-screen grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
<RegistroHistoria historial={historial}></RegistroHistoria>
</div>
<h1 className='text-center font-medium text-3xl'>Usuarios</h1>
      <hr />
<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
 <UsuariosFrecuentes historial={historial}></UsuariosFrecuentes>
 <UsuariosMes historial={historial}></UsuariosMes>
</div>
    </div>
  )
}
