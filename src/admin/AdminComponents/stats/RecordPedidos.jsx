
import React, { useState, useEffect } from 'react'
import { Bar, Pie,Radar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    RadialLinearScale,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineElement,
    ArcElement
);
export default function RecordPedidos({ historial }) {
    const [conteo, setConteo] = useState({});
    const [tipo,setTipo] = useState("bar");
    const [midata,setMidata] = useState({
      labels: ["Adaptador","Ethernet","Extension","HDMI"],
      datasets: [ 
          {
              label: 'Prestamos totales',
              data: Object.values(conteo),
              tension: 0.5,
              fill : true,
              borderColor: ["blue","#0fbab7","#301860","darkRed"],
              backgroundColor: ["blue","#0fbab7","#301860","darkRed"],
              pointRadius: 3,
              pointBorderColor: 'rgba(255, 99, 132)',
              pointBackgroundColor: 'rgba(255, 99, 132)',
              barThickness:80
          },
      ],
  })
    const items=()=>{
        const nuevoConteo = {};
        const history = historial
      history.forEach((item) => {
        const valor = item.item;
        if (!nuevoConteo[valor]) {
          nuevoConteo[valor] = 1;
        } else {
          nuevoConteo[valor]++;
        }
      });
      setConteo(nuevoConteo);
      setMidata({
        labels: Object.keys(nuevoConteo),
        datasets: [ 
            {
                label: 'Prestamos totales',
                data: Object.values(nuevoConteo),
                fill : true,
                borderColor: ["darkRed","#0fbab7","#301860","blue"],
                backgroundColor: ["darkRed","#0fbab7","#301860","blue"],
                pointRadius: 3,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
                barThickness:80
            },
        ],
    })
    }
    useEffect(() => {
      items()
    }, [historial]);

  
  var misoptions = {
      scales : {
          y : {
              min : 0
          },
          x: {
              ticks: { color: 'black'}
          }
      },
      responsive: true
  };
  const cambiar=({target})=>{
    const {name} = target;
    if(name =="izquierda"){
      setTipo((tipoAnterio)=>{
        if(tipoAnterio=="bar") {
          return"radar";
        }
        else if(tipoAnterio=="radar") return "pie";
        else return "bar";
      })
    }else{
      setTipo((tipoAnterio)=>{
        if(tipoAnterio=="bar") return "pie";
        else if(tipoAnterio=="pie") return "radar";
        else return "bar";
      })
    }
  }
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    console.log("Windows size: ",windowSize)

    return () => window.removeEventListener('resize', handleResize);
  }, []); 
  return (
    <div className="h-200 sm:h-70 rounded-lg shadow-lg  px-24 py-4 flex flex-col sm:px-4 sm:h-150 items-center justify-center">
    <div className='flex gap-4'>
    <button type="button" onClick={cambiar} name='izquierda' className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M12.707 17.293L8.414 13H18v-2H8.414l4.293-4.293l-1.414-1.414L4.586 12l6.707 6.707z"/></svg>
    </button>
      <h1 className='text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl'>Pedidos historia</h1>
      <button type="button" onClick={cambiar} name='derecha'className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="m11.293 17.293l1.414 1.414L19.414 12l-6.707-6.707l-1.414 1.414L15.586 11H6v2h9.586z"/></svg>
      </button>
      </div>
      {Object.keys(conteo).length==0 ?(<>Cargando...</>) :tipo === 'bar' ? (
        <Bar data={midata} options={misoptions} />
      ) : tipo === 'radar' ? (
        <Radar data={midata}  />
      ) : (
        <Pie data={midata} />
      )}
   </div>

  )
}
