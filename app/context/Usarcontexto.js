'use client'
import { useReducer, useEffect } from "react";
import Contexto from "./Contexto";
import Reducerdepapu from "./Reducer"
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

function Usarcontexto(props) {
    const {children} = props;

    let initialState = {
        modelo: [],
        usuario: "",
    }
        
    const [state, dispatch] = useReducer(Reducerdepapu, initialState);
    
    useEffect(() => {
        fetchAutos();
    }, []);

    const fetchAutos = async () => {
        try {
            const autosCollection = collection(db, 'autos');
            const autosSnapshot = await getDocs(autosCollection);
            const autosList = autosSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            dispatch({type: "SET_AUTOS", payload: autosList});
        } catch (error) {
            console.error("Error fetching autos:", error);
        }
    }

    const traemeCosasDis = async (parametro) => {
        try {
            const docRef = await addDoc(collection(db, 'autos'), parametro);
            dispatch({type: "AGREGADO", payload: {...parametro, id: docRef.id}});
        } catch (error) {
            console.error("Error adding auto:", error);
        }
    }

    const borrarAutoDis = async (id) => {
        try {
            await deleteDoc(doc(db, 'autos', id));
            dispatch({type: "BORRADO", payload: id});
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