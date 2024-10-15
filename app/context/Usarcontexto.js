'use client'
import { useReducer, useEffect } from "react";
import Contexto from "./Contexto";
import Reducerdepapu from "./Reducer"
import { db } from '../firebase';
import { ref, push, onValue, remove, set } from 'firebase/database';

function Usarcontexto(props) {
    const {children} = props;

    let initialState = {
        modelo: [],
        usuario: "",
    }
        
    const [state, dispatch] = useReducer(Reducerdepapu, initialState);
    
    useEffect(() => {
        const autosRef = ref(db, 'autos');
        const unsubscribe = onValue(autosRef, (snapshot) => {
            const data = snapshot.val();
            const autosList = data ? Object.entries(data).map(([id, values]) => ({id, ...values})) : [];
            dispatch({type: "SET_AUTOS", payload: autosList});
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    const traemeCosasDis = async (parametro) => {
        try {
            const autosRef = ref(db, 'autos');
            const newAutoRef = push(autosRef);
            await set(newAutoRef, parametro);
            // No need to dispatch here as the onValue listener will update the state
        } catch (error) {
            console.error("Error adding auto:", error);
        }
    }

    const borrarAutoDis = async (id) => {
        try {
            const autoRef = ref(db, `autos/${id}`);
            await remove(autoRef);
            // No need to dispatch here as the onValue listener will update the state
        } catch (error) {
            console.error("Error deleting auto:", error);
        }
    }

    return ( 
        <Contexto.Provider value={{modelo: state.modelo, usuario: state.usuario, traemeCosasDis, borrarAutoDis}}>
            {children}
        </Contexto.Provider>
    );
}

export default Usarcontexto;