import React from 'react';
import { Input } from 'semantic-ui-react';

export function AddNewTask({ idCard, addNewTask, idCardApi }) {
    const [text, setText] = React.useState('');
    const [isLoading, setLoading] = React.useState(false)

    const handleBlur = () => {
        setText('')
    }
    
    const handleChange = (evt) => {
        setText(evt.target.value)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        console.log("[X] handleSubmit ")
        setLoading(true)
        addNewTask(idCard, text, idCardApi);
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (
        <div className="box1">
            <div className="container-2">
            <form onSubmit={handleSubmit}>
                {
                    isLoading ? 
                        (<div className="ui active inline loader"></div>
                        )
                         : <span className="icon"><i className="fa fa-plus"></i></span>
                }
                
                <Input 
                    type="text" 
                    id="enter" 
                    placeholder="digite o nome novo tarefa e ENTER" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={text}
                    disabled={isLoading}
                />
            </form>
            </div>
        </div>
    )
}