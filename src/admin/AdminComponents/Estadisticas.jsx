import React, { useEffect, useState } from 'react'
import app from '../../firebaseConfig';
import RecordPedidos from './stats/RecordPedidos';
import { getDatabase, ref, get, remove } from "firebase/database";
import RecordPedidosMes from './stats/RecordPedidosMes';
import PedidosSemana from './stats/PedidosSemana';
import UsuariosFrecuentes from './stats/UsuariosFrecuentes';
import RegistroHistoria from './stats/RegistroHistoria';
export default function Estadisticas() {
  const [historial, setHistorial] = useState([])
  const fetchHistorial = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "loans/history");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const myData = snapshot.val();
        const temporaryArray = Object.keys(myData).map((myFireId) => ({
          ...myData[myFireId],
          itemId: myFireId,
        }));
        
        setHistorial(temporaryArray);
        
      } else {
        alert("Error al obtener datos");
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
       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
       <RecordPedidos historial={historial}></RecordPedidos>
  
    
    <RecordPedidosMes historial={historial}></RecordPedidosMes>
</div>
<div className="w-full h-54 flex items-center justify-center">
  
  <PedidosSemana historial={historial}></PedidosSemana></div>

<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg flex items-center justify-center"><RegistroHistoria historial={historial}></RegistroHistoria></div>
</div>
<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
 <UsuariosFrecuentes historial={historial}></UsuariosFrecuentes>
</div>
    </div>
  )
}
