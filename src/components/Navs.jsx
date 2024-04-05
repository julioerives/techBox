import { Link } from "react-router-dom";
import Login from "../admin/AdminComponents/login/Login";
import AdminApp from "../admin/AdminApp";
import { useState } from "react";

export function Navs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logueado, setLogueado] = useState(false);
  return (
    <>
      <header className="text-gray-600 bg-white w-full  body-font fixed top-0">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img
              src="./../public/img/logo-1.png"
              className="w-auto h-11"
              alt=""
            />
            <span className="ml-3 text-xl">TechBox</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <Link to={"/English"} className="mr-5 hover:text-gray-900">
             Ingles
            </Link>
            <Link to={"/Reportes"} className="mr-5 hover:text-gray-900">
              Reportes
            </Link>
          </nav>
          <a
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center text-white bg-teal-500 border-0 py-1 px-3 focus:outline-none hover:bg-teal-600 rounded text-base mt-4 md:mt-0"
          >
            Admin
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
        <Login
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setLogueado={setLogueado}
          logueado={logueado}
        ></Login>
      </header>
    </>
  );
}
