import React, { useState } from "react";
import ValidationMatricula from "../hooks/ValidationMatricula";
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Error from "./Error";

export default function Reports() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [descerror, setDescError] = useState("");
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    reporte: "",
    matricula: "",
    especialidad: "",
  });
  const { nombre, apellido, reporte, matricula, especialidad } = input;
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const insert = () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "reports/"));
    set(newDocRef, {
      nombre: input.nombre,
      apellido: input.apellido,
      reporte: input.reporte,
      matricula: input.matricula,
      especialidad: input.especialidad,
    })
      .then(() => console.log("Bien Hecho"))
      .catch((error) => console.log(error));
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    let bandera = await ValidationMatricula(input.matricula);

    const isEmpty = Object.keys(input).some((key) => input[key] === "");
    if (isEmpty) {
      setDescError("Campo o campos vacíos");
      setError(true);
      return;
    }
    if (input.reporte.length < 10) {
      setDescError("Sea más explícito en su informe.");
      setError(true);
      return;
    }
    if (bandera) {
      insert();
      Swal.fire({
        title: "Tu reporte ha sido enviado",
        text: "Muchas gracias!",
        icon: "success",
      });
      navigate("/");
    } else {
      setDescError("Matricula no valida.");
      setError(true);
    }
  };
  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-4 rounded-lg shadow-lg">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <Link
                to="/"
                className="inline-block rounded-full border border-teal-600 bg-teal-600 p-3 text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-teal-500 rotate-180"
                href="#"
              >
                <span className="sr-only"> Regresar</span>

                <svg
                  className="size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Reportes
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Ingrese los datos necesarios para poder recibir el informe y
              realizar mejoras.
            </p>

            <form
              onSubmit={handleSumbit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  for="Username"
                  class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600"
                >
                  <input
                    type="text"
                    id="Username"
                    class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-10"
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={onInputChange}
                  />

                  <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Nombre
                  </span>
                </label>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="Username"
                  class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600"
                >
                  <input
                    type="text"
                    id="Username"
                    class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-10"
                    placeholder="Username"
                    name="apellido"
                    value={apellido}
                    onChange={onInputChange}
                  />

                  <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Apellido
                  </span>
                </label>
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reporte
                </label>
                <textarea
                  id="message"
                  rows="4"
                  maxLength={300}
                  style={{ resize: "none" }}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white-50 rounded-lg border border-gray-300 focus:ring-teal-600 focus:border-teal-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ingrese su reporte"
                  name="reporte"
                  value={reporte}
                  onChange={onInputChange}
                ></textarea>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    for="Username"
                    class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600"
                  >
                    <input
                      type="text"
                      id="Username"
                      class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-10"
                      placeholder="Matricula"
                      name="matricula"
                      value={matricula}
                      onChange={onInputChange}
                    />

                    <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Matricula
                    </span>
                  </label>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    for="Username"
                    class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600"
                  >
                    <input
                      type="text"
                      id="Username"
                      class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-10"
                      placeholder="Especialidad"
                      name="especialidad"
                      value={especialidad}
                      onChange={onInputChange}
                    />

                    <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Especialidad
                    </span>
                  </label>
                </div>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-blue-500">
                  Enviar reporte
                </button>
              </div>
            </form>
            {error && <Error mensaje={descerror}></Error>}
          </div>
        </main>
      </div>
    </section>
  );
}
