import React, { useState, useEffect } from 'react'
import app from "../../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
//import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdateWriteModal from './UpdateWriteModal.jsx'


function UpdateRead() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFirebaseId, setCurrentFirebaseId] = useState(null);
  
    const openModal = (firebaseId) => {
      setCurrentFirebaseId(firebaseId);
      setIsModalOpen(true);
    }

    //const navigate = useNavigate();
    let [data, setData] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "material/");
        const snapshot = await get(dbRef);
        if(snapshot.exists()){
            const myData = snapshot.val();
            const temporaryArray = Object.keys(myData).map( myFireId => {
                return {
                    ...myData[myFireId],
                    itemId: myFireId
                }
            })
            console.log(temporaryArray)
            setData(temporaryArray);
        }else{
            alert("error");
        }
    }

    const deleteData = async (itemIdParam) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "Borraras el material",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008080",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
          }).then(async (result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Borrado",
                text: "El material ha sido borrado",
                icon: "success",
              });
              const db = getDatabase(app);
              const dbRef = ref(db, "material/"+itemIdParam);
              await remove(dbRef);
              fetchData();
            }

          });
       
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
<div className='w-full flex justify-center'>
<div className="w-full sm:w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-white uppercase bg-teal-600 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
               
                <th scope="col" class="px-6 py-3">
                    Cantidad
                </th>
                <th scope="col" class="px-6 py-3">
                Acciones
                </th>

            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-xs">
            {data.map((item) => (
                <tr key={item.itemId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.parts}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={ () => openModal(item.itemId)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>

                        <button 
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={ () => deleteData(item.itemId)}><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                </tr>
            ))}
            {isModalOpen && <UpdateWriteModal closeModal={() => setIsModalOpen(false)} firebaseId={currentFirebaseId} fetchData={fetchData} />}
        </tbody>
    </table>
    </div>

</div>
    )
}

export default UpdateRead