import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import app from "../../../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";
export default function UpdateUser({modalUpdateUsers,setModalUpdateUsers, idFirebase, fetchDataUsers}) {
    const [input, setInput] =useState({
        nombre: "",
    especialidad: "",
    matricula: "",
    password: ""
    })
    useEffect(() => {
        const fetchData = async () => 
        {
            const db = getDatabase(app);
            const dbRef = ref(db,"users/"+idFirebase);
            const snapshot = await get(dbRef);
            if(snapshot.exists()){
                const targetObject = snapshot.val();
                setInput({
                    nombre: targetObject.nombre,
                    especialidad: targetObject.especialidad,
                    matricula: targetObject.matricula,
                    password: targetObject.password
                })
            }else{
                console.log("Error")
            }
        }
        fetchData();
    }, [idFirebase])

  const { nombre, especialidad, matricula, password } = input;
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    console.log(value);
    setInput({
      ...input,
      [name]: value
    });
  };
  const overwriteData = () => {
    const db = getDatabase(app);
    const newDocRef = ref(db,"users/"+idFirebase);
    set(newDocRef, {
      nombre: nombre,
      especialidad: especialidad,
      matricula: matricula,
      password: password
    }).then( () => {
      setModalUpdateUsers(false);
      fetchDataUsers();
      Swal.fire({
        title: "Actualizado",
        text: "Se ha actualizado el usuario",
        icon: "success"
      });
    }).catch( (error) => {
      alert("Error: " + error.message)
    })
  }
  if (modalUpdateUsers){
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <button onClick={() => setModalUpdateUsers(false)} className="absolute top-2 right-2 bg-transparent text-gray-700 hover:bg-gray-50 sm:text-sm">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full relative">
    
        <button
        type="button"
        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="popup-modal"
        onClick={() => setModalUpdateUsers(false)}
      >
         <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="flex flex-col space-y-4">
    
                  <h1 className="text-2xl font-bold mb-4">Actualización de información del usuario</h1>
    
                  <label className="font-semibold">Nombre</label>
                  <input type='text' name='nombre' value={nombre} onChange={onInputChange} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>
    
                  <label className="font-semibold">Especialidad</label>
                  <input type='text' name='especialidad' value={especialidad} onChange={onInputChange} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>
    
                  <label className="font-semibold">Matrícula</label>
                  <input type='text' name='matricula' value={matricula} onChange={onInputChange} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>
    
                  <label className="font-semibold">Contraseña</label>
                  <input type='text' name='password' value={password} onChange={onInputChange} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>
    
                  <button onClick={overwriteData} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Actualizar
                  </button>
    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      )
  }
}
