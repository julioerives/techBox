import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SideMenu({ Component }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Puedes mantener la función de manejo de clic si decides cambiar la visibilidad más adelante
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleRedirect = (ruta) => {
    navigate(`/English/Admin/${ruta}`, {
        replace: true,
        state: {
          logueado: true
        }
      });
  };
  const salir=()=>{
    navigate("/English",{
      replace:true,
      state:{
        logueado:false
      }
    })
  }
  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        onClick={handleSidebarToggle}
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } `}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <button onClick={() => handleRedirect("")}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0891b2"
                  stroke-width="2"
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                >
                  <path
                    fill="none"
                    stroke-linecap="round"
                    d="M4.5 17H4a1 1 0 0 1-1-1a3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"
                  />
                </svg>

                <span class="ms-3">Users</span>
              </button>
            </li>
            <li>
              <button  onClick={() => handleRedirect("Material")}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0891b2"
                  stroke-width="2"
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                >
                  <g>
                    <path
                      fill="none"
                      stroke-linejoin="round"
                      d="m3 7l7-4l11 4M3 7v5l11 4l7-4V7M3 7l11 4l7-4"
                    />
                    <path
                      fill="none"
                      stroke-linejoin="round"
                      d="M3 12v5l11 4l7-4v-5"
                    />
                  </g>
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Material</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleRedirect("Reportes")}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="#0891b2"
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                >
                  <path d="M12 17q-.425 0-.712-.288T11 16q0-.425.288-.712T12 15q.425 0 .713.288T13 16q0 .425-.288.713T12 17m-1-4V3h2v10zm-6 8q-.825 0-1.412-.587T3 19v-3h2v3h14v-3h2v3q0 .825-.587 1.413T19 21z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleRedirect("Estadisticas")}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="21"
                  viewBox="0 0 16 16"
                  fill="#0891b2"
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 14v-4h1v4h5V5h1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2h1v2zm4.853-10.146l-2.999 3a1.5 1.5 0 0 1-2.538 1.568l-2.714.904L4 9.527a1.5 1.5 0 1 1-.316-.948L7 7.473a1.5 1.5 0 0 1 2.146-1.327l3-3a1.5 1.5 0 1 1 .707.707"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Stats</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleRedirect("MaterialActivo")}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="#0891b2"
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                >
                  <path d="M4.115 11q-.666 0-1.14-.475q-.475-.474-.475-1.14v-3.27q0-.666.475-1.14q.474-.475 1.14-.475H13V11zm0 8.5q-.666 0-1.14-.475q-.475-.474-.475-1.14v-3.27q0-.666.475-1.14Q3.449 13 4.115 13H15v6.5zM17 19.5V11h-2V4.5h6.27l-2 5.115h1.96zM5 17h1.5v-1.5H5zm0-8.5h1.5V7H5z" />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">
                Active material

                </span>
              </button>
            </li>
          </ul>
          <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <button onClick={() => handleRedirect("Historial")}
                class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="21"
                  viewBox="0 0 1025 1024"
                  fill="#0891b2"
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                >
                  <path d="M896.428 1024h-768q-53 0-90.5-37.5T.428 896V128q0-53 37.5-90.5t90.5-37.5h768q53 0 90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5m64-768q0-26-19-45t-45-19h-768q-26 0-45 19t-19 45v640q0 27 19 45.5t45 18.5h768q26 0 45-18.5t19-45.5zm-96 640h-512q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h512q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5m0-256h-512q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h512q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5m0-256h-512q-13 0-22.5-9.5t-9.5-22.5t9.5-22.5t22.5-9.5h512q13 0 22.5 9.5t9.5 22.5t-9.5 22.5t-22.5 9.5m-640 512h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5v64q0 13-9.5 22.5t-22.5 9.5m0-256h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5v64q0 13-9.5 22.5t-22.5 9.5m0-256h-64q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5v64q0 13-9.5 22.5t-22.5 9.5" />
                </svg>

                <span class="ms-3">Record</span>
              </button>
            </li>
            <li>
              <button onClick={()=> salir()}
                href="#"
                class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0891b2"
                  stroke-width="2"
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                >
                  <path
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5l-5-5m5 5H9"
                  />
                </svg>
                <span class="ms-3">Log out</span>
              </button>
            </li>
            <li>
              <button onClick={handleSidebarToggle}
                href="#"
                class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 24 24"><path fill="#0891b2" d="M3.4 22L2 20.6L8.6 14H4v-2h8v8h-2v-4.6zM12 12V4h2v4.6L20.6 2L22 3.4L15.4 10H20v2z"/></svg>
                <span class="ms-3">Close</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className={`p-4 ${isSidebarOpen ? 'ml-64' : 'w-full'}`}>
  <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <Component />
  </div>
</div>
    </>
  );
}
