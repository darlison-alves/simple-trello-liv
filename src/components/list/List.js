import React from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Card } from '../card/Card';
import { AddCardInput } from '../board/AddCardInput';

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : '',
    margin: '0 10px 10px',
    width: 200,
  })

export function List({ id, name, index, items }) {

    const toggleFold = () => {
        console.log('toggle')
        //setFolded(prev => !prev)
    }
    return (
        <div style={ { maxWidth: '300px' } } data-testid="list" >
            <Draggable  draggableId={id} index={index} >
                {(provided, snapshot) => {
                    return (
                        <div ref={provided.innerRef} >
                            <Droppable droppableId={id} >
                                {(droppableProvided, droppableSnapshot) => {
                                    return (
                                        <div className="flex flex-col items-center">
                                            <div
                                                ref={droppableProvided.innerRef}
                                                style={getListStyle(droppableSnapshot.isDraggingOver)}
                                            >
                                                {items &&
                                                items
                                                    .sort((a, b) => a.position - b.position)
                                                    .map((item, idx) => (
                                                    <Card
                                                        item={item}
                                                        key={item.id}
                                                        index={idx}
                                                        listId={id}
                                                    />
                                                    ))}
                                                {droppableProvided.placeholder}
                                            </div>
                                            <AddCardInput listId={id} listItems={items} />
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    )
                }}
            </Draggable>
        </div>
    )
}