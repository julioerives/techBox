import React, { useState } from 'react';
import app from '../../../../firebaseConfig';
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Error from '../../../components/Error';
import { showMessage } from '../../../../showMessage';
export default function FormInsert({setModalUser,fetchDataUsers}) {
  const [input, setInput] = useState({
    nombre: "",
    especialidad: "",
    matricula: "",
    correo:"",
    password: ""
  });
  const [error,setError]= useState(false)
  const { nombre, especialidad, matricula,correo, password } = input;
  const [errorDesc,setErrorDesc] = useState("error")
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setInput({
      ...input,
      [name]: value
    });
  };
  const insert=async ()=>{
    const auth = getAuth();
    try {
      
     if(nombre.length <1 || especialidad.length<1 || matricula.length<1 || correo.length<1 ){
      setErrorDesc("Empty field or fields");
      setError(true)
      return;
     }
     if( password.length<6){
      setErrorDesc("The password must be more than 6 characters long.");
      setError(true)
      return;
     }
     const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const idAutenticacion = userCredential.user.uid; 
      const db = getDatabase(app);
      const newDocRef = ref(db, "users/"+idAutenticacion);
      await set(newDocRef, {
        nombre,
        especialidad,
        matricula,
        correo,
        password,
        idAutenticacion
      });
      fetchDataUsers();
      setModalUser(false);
    } catch (error) {
      showMessage("An error occurred.","Fatal");
    }
  }

  return (
    <>
 <div className="relative p-4 w-full max-w-md animate-fade-up animate-twice animate-duration-[600ms] ">
    <div className="relative bg-white rounded-lg dark:bg-gray-700 ">
      <button
        type="button"
        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="popup-modal"
        onClick={() => setModalUser(false)}
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
        <span className="sr-only">Close modal</span>
      </button>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Enter a new user
          </h1>
        </div>

        <div className="flex flex-col space-y-4">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"
          />

          <label className="font-semibold">Specialty</label>
          <input
            type="text"
            name="especialidad"
            value={especialidad}
            onChange={onInputChange}
            className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"
          />

          <label className="font-semibold">School ID number</label>
          <input
            type="text"
            name="matricula"
            value={matricula}
            onChange={onInputChange}
            className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"
          />
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="correo"
            value={correo}
            onChange={onInputChange}
            className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"
          />
          <label className="font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"
          />

          <button onClick={insert} className="py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700">
            Save Data
          </button>
        </div>
        {error && <Error message={errorDesc}></Error>}
      </div>
    </div>
  </div>

    </>
  );
}