import React from 'react';
import { Input, Loader, Dimmer } from 'semantic-ui-react';

export function AddCardInput({ listId, listItems }) {
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
        
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (

        <div className="box">
            <div className="container-1">
            <form onSubmit={handleSubmit}>
                {
                    isLoading ? 
                        (<div class="ui active inline loader"></div>
                        )
                         : <span className="icon"><i className="fa fa-plus"></i></span>
                }
                
                <Input 
                    type="text" 
                    id="search" 
                    placeholder="digite o nome novo card e ENTER" 
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