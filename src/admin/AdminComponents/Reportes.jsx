import React, { useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, remove, onValue } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function Reportes() {
  // Estado para almacenar los reportes y la visibilidad de los reportes completados
  const [reports, setReports] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  // Al cargar el componente, cargar los reportes desde localStorage si existen
  useEffect(() => {
    const storedReports = localStorage.getItem("reports");
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  // Al cargar el componente, cargar la visibilidad de los reportes completados desde localStorage si existe
  useEffect(() => {
    const storedShowCompleted = localStorage.getItem("showCompleted");
    if (storedShowCompleted) {
      setShowCompleted(JSON.parse(storedShowCompleted));
    }
  }, []);

  // Cargar los reportes desde Firebase al cargar el componente o cuando cambien los datos
  useEffect(() => {
    const db = getDatabase(app);
    const reportsRef = ref(db, "reports/");
    onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reportsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setReports(reportsArray);
        localStorage.setItem("reports", JSON.stringify(reportsArray)); // Guardar cambios en localStorage
      } else {
        setReports([]);
      }
    });
  }, []);

  const deleteReport = async (id) => {
    const db = getDatabase(app);
    const reportRef = ref(db, `reports/${id}`);
    await remove(reportRef);
  };

  // Cambiar la visibilidad de los reportes completados y guardar en localStorage
  const toggleCompletedVisibility = () => {
    const newShowCompleted = !showCompleted;
    setShowCompleted(newShowCompleted);
    localStorage.setItem("showCompleted", JSON.stringify(newShowCompleted));
  };

  const toggleReportCompleted = async (id) => {
    const updatedReports = reports.map((report) => {
      if (report.id === id) {
        return { ...report, completed: !report.completed };
      }
      return report;
    });

    // Actualizar el estado
    setReports(updatedReports);

    // Guardar los cambios en localStorage después de actualizar el estado
    localStorage.setItem("reports", JSON.stringify(updatedReports));
  };

  return (
    <section className="min-h-screen flex items-start justify-center">
      <div className="max-w-5xl p-4 rounded-lg shadow-lg bg-white mt-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-900 flex items-center justify-between p-3">
          Reportes existentes
          <button onClick={toggleCompletedVisibility} className="ml-4 p-3">
            {showCompleted ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </h2>
        <table className="w-full  table-auto">
          <thead>
            <tr className="bg-teal-600  text-white">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Matrícula</th>
              <th className="px-4 py-2">Especialidad</th>
              <th className="px-4 py-2">Reporte</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) =>
              !report.completed || showCompleted ? (
                <tr key={report.id} className="border-b">
                  <td className="px-4 py-2">{report.nombre}</td>
                  <td className="px-4 py-2">{report.apellido}</td>
                  <td className="px-4 py-2">{report.matricula}</td>
                  <td className="px-4 py-2">{report.especialidad}</td>
                  <td className="px-4 py-2">{report.reporte}</td>
                  <td className="px-4 py-2 flex items-center justify-between">
                    <button
                      onClick={() => toggleReportCompleted(report.id)}
                      className="mr-6"
                    >
                      {report.completed ? (
                        <FontAwesomeIcon icon={faCheckSquare} size="2x" />
                      ) : (
                        <FontAwesomeIcon icon={faSquare} size="2x" />
                      )}
                    </button>

                    <button
                      onClick={() => deleteReport(report.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}