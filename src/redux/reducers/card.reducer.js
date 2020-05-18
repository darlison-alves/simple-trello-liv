import { LIST_CARDS, GET_LIST_CARD, ADD_CARD } from "../defaults/type"

let uniqueId = 0;

function getItems(count) {
  return Array.from({ length: count }, (v, k) => {
    const id = uniqueId++;
    return {
      id: `id:${id}`,
      text: `item ${id}`
    };
  });
}

const INITIAL_STATE = {
    columns: {},
    columnOrder: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "LOADING": 
        return {
            ...state,
            loading: true
        }
        case "LOADING_SUCCESS": 
            return {
                ...state,
                loading: false
            }
        case "LOADING_ERROR": 
            return {
                ...state,
                loading: false
            }
        case GET_LIST_CARD:
            console.log("action", action.payload)
            return {
                ...state,
                columns: action.payload.columns,
                columnOrder: action.payload.columnOrder,
                loading: false
        }
        case ADD_CARD:
            return {
                ...state,
                columns: action.payload.columns,
                columnOrder: action.payload.columnOrder,
                loading: false
            }
        case LIST_CARDS:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}