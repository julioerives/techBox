import React from 'react'
import "./../../../../assets/styles/animaciones.css"
export default function ModalHistorial({setModal,user,setUser}) {
    const cerrarModal=()=>{
        setUser(null);
        setModal(false)
    }
  return (
    <div className="animaciones fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full relative">
          
          <button
        type="button"
        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="popup-modal"
        onClick={cerrarModal}
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
      <div className="block rounded-lg bg-white text-center text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
      <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">
       Usuario
      </div>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight">
          Nombre
        </h5>
        <p className="mb-4 text-base">
          {user[0].nombre}
        </p>
        <h5 className="mb-2 text-xl font-medium leading-tight">
          Especialidad
        </h5>
        <p className="mb-4 text-base">
         {user[0].especialidad}
        </p>
        <h5 className="mb-2 text-xl font-medium leading-tight">
         Contraseña
        </h5>
        <p className="mb-4 text-base">
          {user[0].password}
        </p>
      </div>
      <div className="border-t-2 border-neutral-100 px-6 py-3 text-surface/75 dark:border-white/10 dark:text-neutral-300">
        {user[0].matricula}
      </div>
    </div>
      
            
          </div>
        </div>
      </div>
  )
}
