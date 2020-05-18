import pubsub from 'pubsub-js';
import { toastr } from 'react-redux-toastr';
import { ADD_CARD, GET_LIST_CARD } from "../defaults/type";
import { apiBase } from './api';

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

function getItem(task) {
    return {
        ...task,
        id: `id:${task.id}`,
        idTask: task.id
    };    
}

export const getListCards = () => dispatch => {
    dispatch({type: 'LOADING'})
    const columns = {}

    apiBase().get('/cards').then(res => {
        console.log("res.data", res.data)
        const cards = res.data        

        cards.map( card => {
            const key = "column-" + card.id;
            columns[key] = {
                    ...card,
                    id: key,
                    idApi: card.id,
                    tasks: card.tasks.map( task => getItem(task))
            }
            return;        
        })
        dispatch({ type: GET_LIST_CARD, payload: { columns, columnOrder: Object.keys(columns) } })

    }).catch(err => {
        console.error(err)
        dispatch({type: 'LOADING_ERROR'})
    })  
}

export const addCard = (title) => (dispatch, getState) => {
    const { card } = getState();
    dispatch({type: 'LOADING'})
    const columns = card.columns;
    const columnOrder = card.columnOrder;

    apiBase().post('/cards', { title }).then(res => {
        console.log('res', res.data);
        const card = res.data;
        let newKey = "column-" + card.id;

        columns[newKey] = {
            ...card,
            id: newKey,
            idApi: card.id
        }
        columnOrder.push(newKey)
        dispatch({ type: ADD_CARD, payload: { columns, columnOrder } })
    }).catch(err => {
        console.error("err", err)
        dispatch({type: 'LOADING_ERROR'})
    })
}

export const saveNewOrder = newList => dispatch => {
    console.log("newList", newList)
    dispatch({ type: GET_LIST_CARD, payload: newList })
}

export const addNewTask = (idCard, title, idCardapi = null) => (dispatch, getState) => {
    dispatch({type: 'LOADING'})
    const { card } = getState();
    
    const columns = card.columns;
    
    apiBase().post('/tasks', { title, idCard: idCardapi })
    .then(res => {        
        columns[idCard].tasks.push(res.data);
        dispatch({ type: GET_LIST_CARD, payload: { ...card, columns } })
        pubsub.publish("CHANGE_LIST_TASKS", {})
    }).catch(err => {
        console.error(err)
        dispatch({type: 'LOADING_ERROR'})
    })
}

export const modifyTaskFromCard = (idTask, idCard) => dispatch => {
    apiBase().patch(`/tasks/modify-card/${idTask}`, { idCard })
    .then(res => {
        console.log("res.data", res.data);
    }).catch(err => {
        console.error("err", err);
    })
}

export const update =(id, title) => dispatch => {
    dispatch({type: 'LOADING'});
    apiBase().patch(`/cards/${id}`, {title})
    .then(res => {
        console.log("res.data", res.data);
        dispatch({type: 'LOADING_SUCCESS'});
    }).catch(err => {
        console.error(err);
    })
}

export const remove =(id, title) => dispatch => {
    dispatch({type: 'LOADING'});
    apiBase().delete(`/cards/${id}`, {title})
    .then(res => {
        console.log("res.data", res.data);
        dispatch({type: 'LOADING_SUCCESS'});
        pubsub.publish("REMOVE_CARD", {id})
    }).catch(err => {
        const msg = err.response && err.response.data && err.response.data.message ? err.response.data.message : "ocorreu um erro!";
        
        toastr.error(msg, { position: 'top-center', timeOut: 10000 });
        console.error(err.response);
    })
}