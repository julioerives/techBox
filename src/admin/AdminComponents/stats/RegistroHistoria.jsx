import React, { useState, useEffect } from 'react';

export default function RegistroHistoria({ historial }) {
  const [usuarios, setUsuarios] = useState([]);
  const [registrosMasRepetidos, setRegistrosMasRepetidos] = useState([]);
  const [registroFrecuencia, setRegistroFrecuencia] = useState([]);
  const [tipo, setTipo] = useState("bar");

  console.log("Historial ", historial);

  const recorrerAlumnos = () => {
    setUsuarios(historial.map((element) => [element.date.substring(3), element.item]));
  };

  const obtenerRegistrosMasRepetidos = () => {
    const frecuenciaRegistros = usuarios.reduce((contador, [fecha, registro]) => {
      const clave = `${fecha}|${registro}`;
      contador[clave] = (contador[clave] || 0) + 1;
      return contador;
    }, {});

    setRegistroFrecuencia(frecuenciaRegistros);

    const registrosOrdenados = Object.values(frecuenciaRegistros).sort((a, b) => b - a);
    console.log(registrosOrdenados);
    setRegistrosMasRepetidos(registrosOrdenados);
  };

  useEffect(() => {
    recorrerAlumnos();
  }, [historial]);

  useEffect(() => {
    obtenerRegistrosMasRepetidos();
    console.log("Registro ", registroFrecuencia);
  }, [usuarios]);

  useEffect(() => {
    console.log("Usuarios Nuevo:", usuarios);
  }, [usuarios]);

  return (
    <div>
      RegistroHistoria
      {/* Agrega aquí la representación de tus datos según sea necesario */}
    </div>
  );
}