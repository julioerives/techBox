import React, { useEffect,useState } from 'react'
import app from '../../firebaseConfig';
import { getDatabase, ref, get, remove } from "firebase/database";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import UserFind from '../../hooks/UserFind';
import ModalHistorial from './historial/ModalHistorial';
export default function Historial() {
  const [historial, setHistorial] = useState(null);
  const [cantidad,setCantidad] = useState(10)
  const [modalHistorial,setModalHistorial] = useState(false);
  const [user,setUser] = useState(null)
  const [historialShow,setHistorialShow] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
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
          setHistorial(temporaryArray);
        } else {
          console.error("Error al obtener los datos")
        }
      } catch (error) {
        console.error("Error al obtener datos:", error.message);
      }
    };
  
    fetchData();
    
  }, []);
  const sortear = () => {
    if (historial) {
      // Función para convertir el formato de fecha a un objeto de fecha
      const getSortableDate = (dateString) => {
         // Separar la cadena de fecha en partes
  const parts = dateString.split('-');
  
  // Verificar si hay tres partes (DD-MM-YY)
  if (parts.length === 3) {
    // Convertir a números
    const [day, month, year] = parts.map(Number);

    // Verificar si las partes son válidas
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      // Crear un objeto de fecha con el formato YYYY-MM-DD
      return new Date(`20${year}-${month}-${day}`);
    }
  }

  // Si la fecha no es válida, devolver null
  return null;
      };
  
      // Función para combinar y ordenar los elementos del historial por fecha de creación
      const combineAndSortByDate = (historial) => {
        const combinedArray = [];
  
        // Recorrer el historial y combinar todos los pedidos en un solo array
        historial.forEach((item) => {
          const itemId = item.itemId;
          Object.entries(item.orders).forEach(([orderId, order]) => {
            order.itemId = itemId;
            combinedArray.push(order);
          });
        });
  
        // Ordenar el array combinado por fecha de creación
        combinedArray.sort((a, b) => {
          const dateA = getSortableDate(a.createdAt);
          const dateB = getSortableDate(b.createdAt);
          return dateB - dateA; // Orden descendente por fecha
        });
  
        return combinedArray;
      };
  
      // Llamar a la función para combinar y ordenar el historial
      const sortedHistorial = combineAndSortByDate(historial);
      sortedHistorial.sort((a, b) => {
        const dateA = getSortableDate(a.createdAt);
        const dateB = getSortableDate(b.createdAt);
        return dateB - dateA; // Orden descendente por fecha
      });
      setHistorialShow(sortedHistorial);
    }
  };
  useEffect(()=>{
    sortear()
    // let example = historial.map(user=>user.orders)
    // console.log(example)
    // example = example.map(user=>user)
    // console.log(Object.values(example));
  },[historial])
  const showUser=async (matricula)=>{
    let result
    try {
       result = await UserFind(matricula);
    } catch (error) {
      console.error('Error al buscar usuario:', error.message);
    }
    setUser(result)

    setModalHistorial(true);
  }
  const aumentar =()=>{
    if(cantidad > historialShow.length-10) setCantidad(historialShow.length);
    else setCantidad(previo=> previo+10)
  }
  const reducir =()=>{
    if(cantidad >10 )setCantidad(previo => previo-10)
    else setCantidad(0)
    


  }
  return (
    <div className='w-full flex justify-center'>
      {modalHistorial && 
      <ModalHistorial setModal={setModalHistorial} user={user} setUser={setUser}></ModalHistorial>
      }
      {historialShow.length>1?(<div className="w-full sm:w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-white uppercase bg-teal-600 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID usuario
                </th>
                <th scope="col" class="px-6 py-3">
                    Fecha
                </th>
                <th scope="col" class="px-6 py-3">
                   Material
                </th>
                <th scope="col" class="px-6 py-3">
                   Estado
                </th>
                <th scope="col" class="px-6 py-3">
                   Ver
                </th>


            </tr>
        </thead>
        <tbody>
        {historialShow &&
  historialShow.slice(0, cantidad).map((order, index) => (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">{order.itemId}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.createdAt}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.details}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <button onClick={() => showUser(order.itemId)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path fill="#ffffff" d="M14 12c-1.095 0-2-.905-2-2c0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3c1.641 0 3-1.358 3-3c0-.092-.02-.178-.027-.268c-.29.165-.619.268-.973.268"/><path fill="#ffffff" d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5m0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5c-.504 1.158-2.578 5-7.926 5"/></svg>
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
      <div className='w-full p-4 flex items-center justify-center gap-5'>
        <button onClick={aumentar} type="button" class=" flex gap-3 focus:outline-none text-white bg-green-800 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Ver mas <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 13v3q0 .425.288.713T12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.712T16 11h-3V8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8v3H8q-.425 0-.712.288T7 12q0 .425.288.713T8 13zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/></svg></button>
<button onClick={reducir} type="button" class="flex gap-3 focus:outline-none text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Ver menos <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 12 12"><path fill="#ffffff" d="M4 5.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zM6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1M2 6a4 4 0 1 1 8 0a4 4 0 0 1-8 0"/></svg></button>
<button onClick={()=> setCantidad(historialShow.length)} type="button"  class="flex gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Todos <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#ffffff" d="M14 12c-1.095 0-2-.905-2-2c0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3c1.641 0 3-1.358 3-3c0-.092-.02-.178-.027-.268c-.29.165-.619.268-.973.268"/><path fill="#ffffff" d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5m0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5c-.504 1.158-2.578 5-7.926 5"/></svg></button>
        </div>
</div>):(<>Cargando...</>)}
</div>
    
      
  )
}
