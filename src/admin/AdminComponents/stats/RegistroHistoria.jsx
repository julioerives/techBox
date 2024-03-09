import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function RegistroHistoria({ historial }) {
  const [usuarios, setUsuarios] = useState([]);
  const [registrosMasRepetidos, setRegistrosMasRepetidos] = useState([]);
  const [registroFrecuencia, setRegistroFrecuencia] = useState([]);
  const [tipo, setTipo] = useState("bar");
  const [fechas,setFechas] = useState({});

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
    const fechasOrdenadas = Object.entries(frecuenciaRegistros)
    .map(([clave]) => clave.substring(0, 5)) // Obtener las primeras cinco letras de la clave
    .sort();
  
  setFechas(fechasOrdenadas);

    const registrosOrdenados = Object.keys(frecuenciaRegistros).sort();
    setRegistrosMasRepetidos(registrosOrdenados);
  };

  useEffect(() => {
    recorrerAlumnos();
  }, [historial]);

  useEffect(() => {
    obtenerRegistrosMasRepetidos();
  }, [usuarios]);

  useEffect(() => {
  }, [usuarios]);
  const todos = Object.entries(registroFrecuencia)
  .map(([clave, valor]) => {
    return clave.substring(6) !== null ? valor : null;
  })
  .filter(valor => valor !== null);
  var midata = {
    labels: ["Marzo","Abril","Mayo","Junio","Julio"],
    datasets: [ 
        {
            label: 'HDMI',
            data:registrosMasRepetidos.map((element) => {
              return element.substring(6) === "HDMI" ? registroFrecuencia[element] : null;
            }).filter(valor => valor !== null),
            borderColor: 'rgb(15, 186, 183)',
            backgroundColor: 'rgba(15, 186, 183)',
          
        }, {
          label: 'Ethernet',
          data: registrosMasRepetidos.map((element) => {
            return element.substring(6) === "Ethernet" ? registroFrecuencia[element] : null;
          }).filter(valor => valor !== null),

          borderColor: 'blue',
          backgroundColor: 'blue',
      },{
        label: 'Extension',
        data: registrosMasRepetidos.map((element) => {
          return element.substring(6) === "Extension" ? registroFrecuencia[element] : null;
        }).filter(valor => valor !== null),
        borderColor: 'rgb(139, 0, 0)',
        backgroundColor: 'rgb(139, 0, 0)',
        
    },{
      label: 'Adaptador',
      data: registrosMasRepetidos.map((element) => {
        return element.substring(6) === "Adaptador" ? registroFrecuencia[element] : null;
      }).filter(valor => valor !== null),
      borderColor: '#301860',
      backgroundColor: '#301860',
  },
    ],
    
};
  var misoptions = {
    scales : {
        y : {
            min : 0
        },
        x: {
            max:5
        }
    }
};
  return (
    <div className="h-54 rounded-lg  shadow-lg  px-24 py-4 flex flex-col items-center justify-center">
    <div className='flex gap-4'>
    
      <h1 className='text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl'>Pedidos mes a mes</h1>
     
      </div>
      <Line options={misoptions} data={midata} />
   </div>
  );
} 