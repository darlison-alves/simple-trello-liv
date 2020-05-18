import React from 'react';
import EdiText from 'react-editext';
import { toastr } from 'react-redux-toastr';

export function EditTitleTask({ text, update, id, remove }) {
    const onSave = (newText) => {
        update(id, newText)
    }
    return (
        <div className="container-3">
        <EdiText
            showButtonsOnHover
            viewProps={{ className: 'task-list edit-title-card'}}
            type='text'
            value={text}
            onSave={onSave}
        />
            <span className="icon-trash" onClick={() => {
                toastr.confirm(`remover tarefa ${ text }`, {
                    onOk: () => {
                        remove(id);
                    }                })
            }}><i className="fa fa-times"></i></span>
        </div>

    )
}