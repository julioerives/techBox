//Es el create, añade cosas a la base de datos

import React, { useEffect, useState } from 'react'
import app from '../../../firebaseConfig';

import { getDatabase, ref, set, get, push  } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Error from '../../components/Error';
function Write({closeModal}) {
  
    //const navigate = useNavigate(); //Permite la navegación entre páginas
  
    let [inputValue1, setInputValue1] = useState(""); //nombre
    let [inputValue3, setInputValue3] = useState(""); //  cantidad
    let [data, setData] = useState([]);
    const [error,setError] = useState(false);
    const [errorDesc,setErrorDesc] = useState("Error")
    useEffect(() => {
      const fetchData = async () => {
          const db = getDatabase(app);
          const dbRef = ref(db, "material/");
          const snapshot = await get(dbRef);
          if (snapshot.exists()) {
              const myData = snapshot.val();
              const temporaryArray = Object.keys(myData).map(myFireId => ({
                  ...myData[myFireId],
                  itemId: myFireId
              }));
              console.log(temporaryArray.length+1);
              setData(temporaryArray);
          } else {
              alert("error");
          }
      };
      fetchData(); // Llamada a fetchData dentro del efecto
  }, []);
    const saveData = () => {
      console.log("input 1 "+inputValue1.length+" input 2 "+inputValue3.length)
      const idOlder = data.map(element => parseInt(element.id)).sort((a,b)=> b-a)

      if(inputValue1.length<1 || inputValue3.length<1){
        setError(true);
        setErrorDesc("Empty fields or field")
        return;
      }
      if(isNaN(parseInt(inputValue3))){
        setError(true);
        setErrorDesc("A number was not entered in the material")
        return
      }
      const db = getDatabase(app); //Obtiene la base de datos
      const newDocRef = push(ref(db,"material/")); //Añade un nuevo documento a la colección fruits
      set(newDocRef, {
        avalaible:inputValue3,
        id: (idOlder[0]+1).toString(),
        name: inputValue1, //Añade un campo llamado name con el valor de inputValue1 //Añade un campo llamado categoria con el valor de inputValue2
        parts: inputValue3
      }).then( () => {
        closeModal() //Si se guardan los datos, muestra un mensaje
      }).catch( (error) => {
        alert("Error: " + error.message)
      })
      closeModal(false)
    }
  
    return (
      <div className="flex flex-col space-y-4">
  
        <h1 className="text-2xl font-bold mb-4">Add new material information</h1>
        
        <label className="font-semibold">Name</label>
        <input type='text' value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input> 
  
        
  
        <label className="font-semibold">Amount</label>
       <input type='number' value={inputValue3} onChange={(e) => setInputValue3(e.target.value)} className="border-2 border-gray-200 rounded p-2 shadow-sm focus:outline-none focus:border-blue-500"></input>
  
        <button onClick={saveData} className="py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700">Save data</button>
  
      </div>
    );
  }

export default Write