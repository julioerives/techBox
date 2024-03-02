//Es el create, añade cosas a la base de datos

import React, { useState } from 'react'
import app from "../../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Write({closeModal}) {
    <h1>Pagina de inicio componente Write</h1>
  
    //const navigate = useNavigate(); //Permite la navegación entre páginas
  
    let [inputValue1, setInputValue1] = useState(""); //nombre
    let [inputValue2, setInputValue2] = useState(""); // categoria
    let [inputValue3, setInputValue3] = useState(""); //  cantidad
  
    const saveData = () => {
      const db = getDatabase(app); //Obtiene la base de datos
      const newDocRef = push(ref(db,"inventory/items")); //Añade un nuevo documento a la colección fruits
      set(newDocRef, {
        name: inputValue1, //Añade un campo llamado name con el valor de inputValue1
        category: inputValue2, //Añade un campo llamado categoria con el valor de inputValue2
        amount: inputValue3
      }).then( () => {
        closeModal() //Si se guardan los datos, muestra un mensaje
      }).catch( (error) => {
        alert("Error: " + error.message)
      })
    }
  
    return (
      <div className="flex flex-col space-y-4">
  
        <h1 className="text-2xl font-bold mb-4">Información del nuevo material</h1>
  
        <label className="font-semibold">Nombre</label>
        <input type='text' value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input> 
  
        <label className="font-semibold">Categoria</label>
        <input type='text' value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>
  
        <label className="font-semibold">Cantidad</label>
       <input type='number' value={inputValue3} onChange={(e) => setInputValue3(e.target.value)} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>
  
        <button onClick={saveData} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Guardar Datos</button>
  
      </div>
    );
  }

export default Write