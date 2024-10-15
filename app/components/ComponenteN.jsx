'use client'
import React from 'react'
import { useContext } from 'react'
import Contexto from '../context/Contexto'

export default function Kakuza() {
    const {saludame, seteos , traemeCosas} = useContext(Contexto)

    console.log(seteos)
    const Handlesaludame = ()=>{
        traemeCosas()
    console.log(seteos)
      }

  return (
    <div className=" h-40 w-40 bg-orange-300 " ><h1 className=" text-blue-500"> Componente normal</h1>
    <button onClick={Handlesaludame}>trae cosas</button>
    </div>
  )
}
