import React, { useEffect, useState } from 'react';
import app from '../../firebaseConfig';
import RecordPedidos from './stats/RecordPedidos';
import { getDatabase, ref, get } from "firebase/database";
import RecordPedidosMes from './stats/RecordPedidosMes';
import PedidosSemana from './stats/PedidosSemana';
import UsuariosFrecuentes from './stats/UsuariosFrecuentes';
import RegistroHistoria from './stats/RegistroHistoria';
import UsuariosMes from './stats/UsuariosMes';
import { showMessage } from '../../showMessage';

export default function Estadisticas() {
  const [data, setData] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [responsivo,setResponsivo] = useState(true);
  const fetchHistorial = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "loans/");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const myData = snapshot.val();
        const temporaryArray = Object.keys(myData).map((myFireId) => ({
          ...myData[myFireId],
          itemId: myFireId,
        }));
        setData(temporaryArray);
      } else {
        showMessage("No se pudieron obtener los datos intente mas tarde","Fatal");
      }
    } catch (error) {
      showMessage("No se pudieron obtener los datos intente mas tarde","Fatal");
    }
  };

  const formatear = async () => {
    let nuevoHistorial = [];
    await Promise.all(data.map(async (elements) => {
      for (const orderId in elements.orders) {
        const orderDetails = elements.orders[orderId];
        const detallesOrden = orderDetails.details.split(",");
        detallesOrden.forEach(element => {
          
          for (let index = 0; index < element.slice(3); index++) {
            nuevoHistorial.push({
              date: orderDetails.createdAt,
              item: element.slice(0, -2),
              userRegistration: elements.itemId
            });
          }
          
        });
      }
    }));
    setHistorial(nuevoHistorial);
  
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  useEffect(() => {
    formatear();
  }, [data]); // Ejecutar formatear() cada vez que data cambie
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    if(windowSize.width < 400)setResponsivo(false)
    else setResponsivo(true);
    return () => window.removeEventListener('resize', handleResize);
  }, []); 
  return (
    <>{responsivo ? (<div className='flex gap-8 flex-col'>
    <h1 className='text-center font-medium text-3xl'>Material</h1>
    <hr />
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <RecordPedidos historial={historial} />
      <RecordPedidosMes historial={historial} />
      <PedidosSemana historial={historial} />

    </div>
    <div className="w-full h-54 flex items-center justify-center">
    </div>
    <h1 className='text-center font-medium text-3xl'>General</h1>
    <hr />
    <div className="grid h-screen grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8">
      <RegistroHistoria historial={historial} />
    </div>
    <h1 className='text-center font-medium text-3xl'>Usuarios</h1>
    <hr />
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
      <UsuariosFrecuentes historial={historial} />
      <UsuariosMes historial={historial} />
    </div>
  </div>):(<>Graficas no disponibles en movil</>)}</>
  );
}
