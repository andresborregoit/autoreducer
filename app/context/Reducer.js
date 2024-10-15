const AGREGADO = "AGREGADO"
const USUARIO = "USUARIO"
const DELETE = "DELETE"
const BORRADO = "BORRADO"
const SET_AUTOS = "SET_AUTOS"

function Reducer(state, action) {
    const {payload, type} = action

    switch(type){
        case AGREGADO: 
            return {...state, modelo: [...state.modelo, payload]};
        case USUARIO: 
            return {...state, usuario: payload};
        case DELETE:
            return {...state, usuario: payload};
        case BORRADO:
            return {...state, modelo: state.modelo.filter(auto => auto.id !== payload)};
        case SET_AUTOS:
            return {...state, modelo: payload};
        default:
            return state;
    }
}

export default Reducer;