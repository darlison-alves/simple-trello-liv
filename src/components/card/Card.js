import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Loader, Popup, Button } from 'semantic-ui-react';

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    maxWidth: '200px',
  
    // styles we need to apply on draggables
    ...draggableStyle,
    cursor: 'pointer',
});

const getItemClasses = (isDragging, draggableStyle) =>
  `${
    isDragging ? 'bg-green-500 shadow-lg' : 'bg-white hover:bg-gray-200 shadow'
  } rounded p-2 mt-2`

export function Card({ item, index }) {
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = () => {
        setIsDeleting(true);

        setTimeout(() => {
            setIsDeleting(false)
        }, 10000);
    }

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                    )}
                    className={getItemClasses(
                    snapshot.isDragging,
                    provided.draggableProps.style
                    )}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <span
                        style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        }}
                    >
                        {item.content || item.name}
                    </span>
                    <span onClick={handleDelete}>
                        {isDeleting ? (
                        <Loader active inline />
                        ) : (
                        <Popup
                            trigger={
                            <Button style={{ background: 'inherit' }} icon="delete" />
                            }
                            content="delete this card"
                        />
                        )}
                    </span>
                    </div>
                </div>
                )
            }}
        </Draggable>
    )
}