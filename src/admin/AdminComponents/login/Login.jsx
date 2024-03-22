import React, { useState } from "react";
import { user } from "./user";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import "./../../../../assets/styles/animaciones.css"
export default function Login({
  isModalOpen,
  setIsModalOpen,
  setLogueado,
  logueado,
}) {
  const [error, setError] = useState(false);
  const [descerror, setDescError] = useState("");

  const User = user();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    nombre: "",
    password: "",
  });
  const { input1, input2 } = input;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const isEmpty = Object.keys(input).some((key) => input[key] === "")
    if(!isEmpty){
      if (input.nombre == User.Usuario && input.password == User.password) {
        navigate("/Admin", {
          replace: true,
          state: {
            logueado: true,
          },
        });
        setIsModalOpen(false);
      } else {
        setDescError("Usuario incorrecto");
      setError(true);
      }
    }else{
      setDescError("Campo o campos vaciós");
      setError(true);
    }
  };

  if (isModalOpen) {
    return (
      <>
        <div>
          {/* Fondo gris */}
          <div
            className={`fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 ${
              isModalOpen ? "" : "hidden"
            }`}
          ></div>

          {/* Main modal */}
          <div
            id="popup-modal"
            tabIndex="-1"
            className={`flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50 ${
              isModalOpen ? "" : "hidden"
            }`}
          >
            <div className="relative animaciones p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={() => setIsModalOpen(false)}
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
                      Ingrese los datos
                    </h1>
                  </div>

                  <form
                    onSubmit={onSubmit}
                    className="mx-auto mb-0 mt-8 max-w-md space-y-4"
                  >
                    <div>
                      <label htmlFor="nombe" className="sr-only">
                        Nombre Admin
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Ingrese el nombre"
                          value={input1}
                          name="nombre"
                          onChange={onInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="sr-only">
                        Contraseña
                      </label>

                      <div className="relative">
                        <input
                          type="password"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter password"
                          value={input2}
                          name="password"
                          onChange={onInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="inline-block rounded-lg bg-teal-500 px-5 py-3 text-sm font-medium text-white"
                      >
                        Iniciar
                      </button>
                    </div>
                  </form>
                  {error && <Error mensaje={descerror}></Error>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
