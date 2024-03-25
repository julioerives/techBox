//Parte de actualización del CRUD

import React, { useState, useEffect } from 'react'
import app from '../../../firebaseConfig';
import { getDatabase, ref, set, get } from "firebase/database";
import { showMessage } from '../../../showMessage';
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./../../../../assets/styles/animaciones.css"

import Error from '../../components/Error';
function UpdateWrite({closeModal, firebaseId,fetchData}) {

  //const navigate = useNavigate(); //Permite la navegación entre páginas
    //const {firebaseId} = useParams(); //Obtiene el id del documento de la URL
    const [error,setError] = useState(false);
    const [errorDesc,setErrorDesc] = useState("Error");
  let [inputValue1, setInputValue1] = useState(""); //Crea un estado para el valor del input
  let [id,setId ] = useState(""); //Crea un estado para el valor del input
  let [inputValue3, setInputValue3] = useState("");

    useEffect(() => {
        const fetchData = async () => 
        {
            const db = getDatabase(app);
            const dbRef = ref(db, "material/"+firebaseId); //Obtiene la referencia de la colección fruits
            const snapshot = await get(dbRef); //Obtiene los datos de la colección fruits
            if(snapshot.exists()){
                const targetObject = snapshot.val();
                setId(targetObject.id);
                setInputValue1(targetObject.name);
                setInputValue3(targetObject.parts);
            }else{
        showMessage("Could not get data try later","Fatal");
                
            }
        }
        fetchData();
    }, [firebaseId])
    

  const overwriteData = () => {
    if(inputValue1 <1 || inputValue3 <1){
      setError(true);
      setErrorDesc("Empty fields or field");
      return;
    }
    const db = getDatabase(app); //Obtiene la base de datos
    //const newDocRef = ref(db, firebaseId); //Añade un nuevo documento a la colección fruits
    const newDocRef = ref(db,"material/"+firebaseId);
    set(newDocRef, {
      available:inputValue3,
      id:id,
      name: inputValue1, //Añade un campo llamado name con el valor de inputValue1 //Añade un campo llamado category con el valor de inputValue2
      parts: inputValue3
    }).then( () => {
      closeModal();
      Swal.fire({
        title: "Updated",
        text: "The material has been updated",
        icon: "success"
      });//Si se guardan los datos, muestra un mensaje
      fetchData();
    }).catch( (error) => {
      alert("Error: " + error.message)
    })
  }

  return (
<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block animaciones align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full relative">

                <button onClick={closeModal} className="absolute top-2 right-2 bg-transparent text-gray-700 hover:bg-gray-50 sm:text-sm"><FontAwesomeIcon icon={faTimes} /></button>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <div className="flex flex-col space-y-4">
  
                                <h1 className="text-2xl font-bold mb-4">Material information update</h1>

                                <label className="font-semibold">Name</label>
                                <input type='text' value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input> 

                                <label className="font-semibold">Amount</label>
                                <input type='number' value={inputValue3} onChange={(e) => setInputValue3(e.target.value)} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>

                                <button className='py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700' onClick={overwriteData} >Update</button>
                                {error && <Error mensaje={errorDesc}></Error>}
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