import React from 'react'

export default function Estadisticas() {
  return (
    <div className='flex gap-8 flex-col'>
       <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg  flex items-center justify-center">record de pedidos</div>
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg  flex items-center justify-center">record de pedidos en el mes</div>
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg  flex items-center justify-center">materiales en activo</div>
</div>
<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg flex items-center justify-center">grafica material mas pedido</div>
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg flex items-center justify-center"> grafica material mas pedido semana actual</div>
</div>
<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg flex items-center justify-center">Hora con mas trafico</div>
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg flex items-center justify-center">Pensar</div>
  <div className="h-32 rounded-lg bg-gray-200 shadow-lg flex items-center justify-center">Pensar</div>
</div>
<div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
  <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center shadow-lgr">Dias mas demandados</div>
  <div className="h-32 rounded-lg bg-gray-200 lg:col-span-2 flex items-center justify-center shadow-lg"> usuarios mas frecuentes</div>
  <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center shadow-lg">dias menos demandados</div>
</div>
    </div>
  )
}
