import React, { useEffect, useState } from 'react'
import app from '../../firebaseConfig';
import RecordPedidos from './stats/RecordPedidos';
import { getDatabase, ref, get, remove } from "firebase/database";
import RecordPedidosMes from './stats/RecordPedidosMes';
import PedidosSemana from './stats/PedidosSemana';
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
        console.log(historial)
        
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
  return (
    <div className='flex gap-8 flex-col'>
       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
       <RecordPedidos historial={historial}></RecordPedidos>
  
    
    <RecordPedidosMes historial={historial}></RecordPedidosMes>
</div>
<div className="w-full h-54 flex items-center justify-center">
  
  <PedidosSemana historial={historial}></PedidosSemana></div>

<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg flex items-center justify-center">Hora con mas trafico</div>
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg flex items-center justify-center">materiales en activo</div>
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg flex items-center justify-center">Pensar</div>
</div>
<div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
  <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center shadow-lgr">Dias mas demandados</div>
  <div className="h-32 rounded-lg bg-gray-200 lg:col-span-2 flex items-center justify-center shadow-lg"> usuarios mas frecuentes</div>
  <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center shadow-lg">dias menos demandados</div>
</div>
    </div>
  )
}
