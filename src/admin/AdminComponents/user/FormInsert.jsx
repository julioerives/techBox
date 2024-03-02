import React, { useState } from 'react';
import app from "../../../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
export default function FormInsert({setModalUser,fetchDataUsers}) {
  const [input, setInput] = useState({
    nombre: "",
    especialidad: "",
    matricula: "",
    password: ""
  });

  const { nombre, especialidad, matricula, password } = input;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    console.log(value);
    setInput({
      ...input,
      [name]: value
    });
  };
  const insert=()=>{
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "users/users/"));
    set(newDocRef,{
        nombre: input.nombre,
        especialidad: input.especialidad,
        matricula: input.matricula,
        password: input.password
    }).then(()=> fetchDataUsers()
    ).catch((error)=> console.log(error))
    setModalUser(false)
  }

  return (
    <>
      <div className="relative p-4 w-full max-w-md">
    <div className="relative bg-white rounded-lg  dark:bg-gray-700">
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
            Ingrese un nuevo usuario
          </h1>
        </div>

        <div className="flex flex-col space-y-4">
          <label className="font-semibold">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"
          />

          <label className="font-semibold">Especialidad</label>
          <input
            type="text"
            name="especialidad"
            value={especialidad}
            onChange={onInputChange}
            className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"
          />

          <label className="font-semibold">Matrícula</label>
          <input
            type="text"
            name="matricula"
            value={matricula}
            onChange={onInputChange}
            className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"
          />

          <label className="font-semibold">Contraseña</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={onInputChange}
            className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"
          />

          <button onClick={insert} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
            Guardar Datos
          </button>
        </div>
      </div>
    </div>
  </div>

    </>
  );
}