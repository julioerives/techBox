import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import app from '../../../../firebaseConfig';

import { getDatabase, ref, set, get } from "firebase/database";
import "./../../../../../assets/styles/animaciones.css"

import Error from '../../../components/Error';
export default function UpdateUser({modalUpdateUsers,setModalUpdateUsers, idFirebase, fetchDataUsers}) {
    const [input, setInput] =useState({
        nombre: "",
    especialidad: "",
    matricula: ""
    })
    const [error,setError] =useState(false);
    const [errorDesc,setErrorDesc] =useState("Error")
    useEffect(() => {
        const fetchData = async () => 
        {
            const db = getDatabase(app);
            const dbRef = ref(db,"users/"+idFirebase);
            const snapshot = await get(dbRef);
            if(snapshot.exists()){
                const targetObject = snapshot.val();
                console.log("Target ",targetObject)
                setInput(targetObject)
                console.log(input)
            }else{
                console.log("Error")
            }
        }
        fetchData();
    }, [idFirebase])

  const { nombre, especialidad, matricula } = input;
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    console.log(value);
    setInput({
      ...input,
      [name]: value
    });
  };
  const overwriteData = () => {
    console.log("MAtricula "+matricula.length+" especialidad "+especialidad.length+" nombre "+nombre.length);
    if(nombre.length <1 || especialidad.length<1 || matricula.length<1){
      setErrorDesc("Empty fields or field");
      setError(true);
      return
    }
    const db = getDatabase(app);
    const newDocRef = ref(db,"users/"+idFirebase);
    set(newDocRef, {
      ...input,
      nombre: nombre,
      especialidad: especialidad,
      matricula: matricula
    }).then( () => {
      setModalUpdateUsers(false);
      fetchDataUsers();
Swal.fire({
  title: "Updated",
  text: "The user has been updated",
  icon: "success"
  });
    }).catch( (error) => {
      console.error(error);
    })
  }
  if (modalUpdateUsers){
    return (
      <div className="fixed animation z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <button onClick={() => setModalUpdateUsers(false)} className="absolute top-2 right-2 bg-transparent text-gray-700 hover:bg-gray-50 sm:text-sm">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
        <div className="inline-block animaciones align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full relative">
    
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
    
    <h1 className="text-2xl  font-bold mb-4">User information to update</h1>

    <label className="font-semibold">Name</label>
    <input type='text' name='nombre' value={nombre} onChange={onInputChange} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>

    <label className="font-semibold">Specialty</label>
    <input type='text' name='especialidad' value={especialidad} onChange={onInputChange} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>

    <label className="font-semibold">ID Number</label>
    <input type='text' name='matricula' value={matricula} onChange={onInputChange} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>

    <button onClick={overwriteData} className="py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700">
        Update
    </button>
    {error &&  <Error message={errorDesc}></Error>}

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
