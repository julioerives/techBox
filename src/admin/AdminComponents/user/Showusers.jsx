import React from "react";
import { useState, useEffect } from "react";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import app from "../../../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import DeleteUsers from "./DeleteUsers";
import ModalInsertUser from './ModalInsertUser';
import UpdateUser from "./UpdateUser";

export default function Showusers() {
  const [users, setUsers] = useState(null);
  const [modalUpdateUsers, setModalUpdateUsers] = useState(false);
  const [currentFirebaseId, setCurrentFirebaseId] = useState(null);
  const [usersShow, setUsersShow] = useState(null);
  const [inputSearch, setInputSearch] = useState(null);
  const [modalUser, setModalUser] = useState(false)
  const abrirModal =()=>{
    setModalUser(true);
  } 
  const openModal = (firebaseId) => {
    setCurrentFirebaseId(firebaseId);
    setModalUpdateUsers(true);
  };
  const fetchDataUsers = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "users/");
      const snapshot = await get(dbRef);
  
      if (snapshot.exists()) {
        const myData = snapshot.val();
        const temporaryArray = Object.keys(myData).map((myFireId) => ({
          ...myData[myFireId],
          itemId: myFireId,
        }));
        setUsers(temporaryArray);
        setUsersShow(temporaryArray.filter(user=> user.itemId != "Admin"));
      } else {
        alert("Error al obtener datos");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error.message);
    }
  };
  
  const filterUsers = ({ target }) => {
    const { value } = target;
  
    if (!value) {
      setUsersShow(users);
    } else {
      setUsersShow(users.filter((user) => !parseInt(value)?user.nombre.toLowerCase().includes(value.toLowerCase()):user.matricula.toLowerCase().includes(value.toLowerCase())));
    }
  };
  
  const deleteUsersConfirm = (user) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Borrarás al usuario " + user.nombre,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Borrado",
          text: "El usuario " + user.nombre + " ha sido borrado",
          icon: "success",
        });
        DeleteUsers(user, fetchDataUsers, setUsers);
      }
    });
  };
  
  useEffect(() => {
    fetchDataUsers();
  }, []);
  return (
    <div>
    <ModalInsertUser fetchDataUsers={fetchDataUsers} modalUser={modalUser} setModalUser={setModalUser}/>
      
      <div className="w-full flex justify-center items-center gap-4 flex-col">
      <h1 className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl">Usuarios</h1>
       <button type="button" onClick={abrirModal} className="slide-out-to-left focus:outline-none text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900 flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="#ffffff" d="M6 7a5 5 0 1 1 10 0A5 5 0 0 1 6 7m-1.178 7.672C6.425 13.694 8.605 13 11 13c.447 0 .887.024 1.316.07a1 1 0 0 1 .72 1.557A5.968 5.968 0 0 0 12 18c0 .92.207 1.79.575 2.567a1 1 0 0 1-.89 1.428L11 22c-2.229 0-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C2.41 20.01 2 19.345 2 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69ZM18 14a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1"/></g></svg>Agregar usuario</button>
      </div>
      <div className="max-w-md mx-auto mb-8">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar"
          value={inputSearch}
          onChange={filterUsers}
        />
      </div>
    </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-white uppercase bg-teal-600 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                    Especialidad
                </th>
                <th scope="col" class="px-6 py-3">
                    Matricula
                </th>
                <th scope="col" class="px-6 py-3">
                    Correo
                </th>
                <th scope="col" class="px-6 py-3">
                Contraseña
                </th>
                <th scope="col" class="px-6 py-3">
                Acciones
                </th>

            </tr>
        </thead>
        <tbody >
          {usersShow &&
            usersShow.map((user) => (
              <tr key={user.itemId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">{user.itemId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.especialidad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.matricula}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.correo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.password}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openModal(user.itemId)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => deleteUsersConfirm(user)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
      
      <div className="p-5 flex justify-center items-center">
      {modalUpdateUsers && (
        <UpdateUser
          modalUpdateUsers={modalUpdateUsers}
          setModalUpdateUsers={setModalUpdateUsers}
          idFirebase={currentFirebaseId}
          fetchDataUsers={fetchDataUsers}
        />
      )}
      </div>
    </div>
  );
}
