import React from 'react';
import EdiText from 'react-editext';
import { toastr } from 'react-redux-toastr';

export function EditTitle({ text, id , update, remove }) {
    const onSave = (newText) => {
        update(id, newText)
    }
    return (
        <div className="container-3">
        <EdiText
            showButtonsOnHover
            viewProps={{ className: 'column-title edit-title-card'}}
            type='text'
            value={text}
            onSave={onSave}
        />
            <span className="icon-trash" onClick={() => {
               toastr.confirm(`remover card ${text}`, {
                   onOk: () => {
                        remove(id);
                   }
               })

            }}><i className="fa fa-times"></i></span>
        </div>

    )
}