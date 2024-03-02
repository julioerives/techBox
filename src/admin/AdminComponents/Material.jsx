//Es el create, añade cosas a la base de datos
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import WriteModal from './WriteModal';
import UpdateRead from './UpdateRead.jsx';

export default function Material() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  }




  return (
    <div>
      <div className="w-full flex justify-center items-center gap-4 flex-col">
      <h1 className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl">Material</h1>
       <button type="button"  onClick={() => setModalOpen(true)} className="focus:outline-none text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900 flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M18 20v-3h-3v-2h3v-3h2v3h3v2h-3v3zM3 21q-.825 0-1.412-.587T1 19V5q0-.825.588-1.412T3 3h14q.825 0 1.413.588T19 5v5h-2V8H3v11h13v2zM3 6h14V5H3zm0 0V5z"/></svg>Agregar material</button>
      </div>
      {modalOpen && <WriteModal closeModal={closeModal} />}


      {<UpdateRead />}
    </div>
  );
}







