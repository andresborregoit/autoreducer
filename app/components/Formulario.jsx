'use client'

import React from 'react'
import Contexto from '../context/Contexto'
import { useContext, useState, useEffect } from "react"

export default function Formulario() {
    const { traemeCosasDis, modelo, borrarAutoDis } = useContext(Contexto)
    const [modeloAuto, setModeloAuto] = useState('')
    const [ano, setAno] = useState('')

    const HandleDispatch = (e) => {
        e.preventDefault()
        const modeloForm = { 
            modeloAuto,
            ano: parseInt(ano),
        }
        traemeCosasDis(modeloForm)
        setModeloAuto('')
        setAno('')
    }

    const handleDelete = (id) => {
        borrarAutoDis(id)
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen w-full">
            <form onSubmit={HandleDispatch} className="flex justify-center flex-col items-center gap-2 mb-4">
                <input 
                    type="text" 
                    value={modeloAuto}
                    onChange={(event) => setModeloAuto(event.target.value)}
                    placeholder="Modelo de auto"
                    className="border p-2"
                />
                <input 
                    type="number" 
                    value={ano}
                    onChange={(event) => setAno(event.target.value)}
                    placeholder="Año"
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar</button>
            </form>
            <div>
                <h2 className="text-xl font-bold mb-2">Autos agregados:</h2>
                <ul>
                    {modelo.map((auto) => (
                        <li key={auto.id} className="flex items-center mb-2">
                            <span>{auto.modeloAuto} - {auto.ano}</span>
                            <button 
                                onClick={() => handleDelete(auto.id)}
                                className="ml-2 bg-red-500 text-white p-1 rounded"
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}