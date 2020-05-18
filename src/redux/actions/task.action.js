import { toastr } from 'react-redux-toastr';
import pubsub from 'pubsub-js';

import { apiBase } from "./api";

export const update =(id, title) => dispatch => {
    dispatch({type: 'LOADING'});
    apiBase().patch(`/tasks/${id}`, {title})
    .then(res => {
        console.log("res.data", res.data);
    }).catch(err => {
        console.error(err);
    })
}

export const remove =(id) => dispatch => {
    dispatch({type: 'LOADING'});
    apiBase().delete(`/tasks/${id}`)
    .then(res => {
        console.log("res.data", res.data);
        dispatch({type: 'LOADING_SUCCESS'});
        pubsub.publish("REMOVE_TASK", {id})
    }).catch(err => {
        const msg = err.response && err.response.data && err.response.data.message ? err.response.data.message : "ocorreu um erro!";
        
        toastr.error(msg, { position: 'top-center', timeOut: 10000 });
        console.error(err.response);
    })
}