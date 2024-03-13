//Parte de actualización del CRUD

import React, { useState, useEffect } from 'react'
import app from "../../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function UpdateWrite({closeModal, firebaseId,fetchData}) {

  //const navigate = useNavigate(); //Permite la navegación entre páginas
    //const {firebaseId} = useParams(); //Obtiene el id del documento de la URL

  let [inputValue1, setInputValue1] = useState(""); //Crea un estado para el valor del input
  let [id,setId ] = useState(""); //Crea un estado para el valor del input
  let [inputValue3, setInputValue3] = useState("");

    useEffect(() => {
        const fetchData = async () => 
        {
            const db = getDatabase(app);
            const dbRef = ref(db, "material/"+firebaseId); //Obtiene la referencia de la colección fruits
            const snapshot = await get(dbRef); //Obtiene los datos de la colección fruits
            console.log(firebaseId, snapshot);
            if(snapshot.exists()){
                const targetObject = snapshot.val();
                setId(targetObject.id);
                setInputValue1(targetObject.name);
                setInputValue3(targetObject.parts);
            }else{
                alert("error");
            }
        }
        fetchData();
    }, [firebaseId])
    

  const overwriteData = () => {
    const db = getDatabase(app); //Obtiene la base de datos
    //const newDocRef = ref(db, firebaseId); //Añade un nuevo documento a la colección fruits
    const newDocRef = ref(db,"material/"+firebaseId);
    set(newDocRef, {
      id:id,
      name: inputValue1, //Añade un campo llamado name con el valor de inputValue1 //Añade un campo llamado category con el valor de inputValue2
      parts: inputValue3
    }).then( () => {
      closeModal();
      Swal.fire({
        title: "Actualizado",
        text: "Se ha actualizado el material",
        icon: "success"
      }); //Si se guardan los datos, muestra un mensaje
      fetchData();
    }).catch( (error) => {
      alert("Error: " + error.message)
    })
  }

  return (
<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
<button onClick={closeModal} className="absolute top-2 right-2 bg-transparent text-gray-700 hover:bg-gray-50 sm:text-sm"><FontAwesomeIcon icon={faTimes} /></button>
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full relative">

                <button onClick={closeModal} className="absolute top-2 right-2 bg-transparent text-gray-700 hover:bg-gray-50 sm:text-sm"><FontAwesomeIcon icon={faTimes} /></button>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <div className="flex flex-col space-y-4">
  
                                <h1 className="text-2xl font-bold mb-4">Actualización de información de material</h1>

                                <label className="font-semibold">Nombre</label>
                                <input type='text' value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input> 

                                <label className="font-semibold">Cantidad</label>
                                <input type='number' value={inputValue3} onChange={(e) => setInputValue3(e.target.value)} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>

                                <button className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700' onClick={overwriteData} >Actualizar</button>

                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>
  );


}

export default UpdateWrite