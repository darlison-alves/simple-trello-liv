// @flow
import React, { useState, useLayoutEffect, useRef } from "react";
import { FixedSizeList, areEqual } from "react-window";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import pubsub from 'pubsub-js';

import "./style.css";
import { reorderList } from "./reorder";

import CardInputContainer from "./containers/cardInput.container";
import AddNewTaskContainer from "../task/container/AddNewTask.container";
import { Loader, Popup, Button } from "semantic-ui-react";
import { EditTitle } from "../card/EditTitle";
import {EditTitleTask } from '../task/EditTitleTask'
import EditTitleTaskContainer from "../task/container/EditTitleTask.container";
import EditTitleContainer from "../card/container/EditTitle.container";

function getStyle({ draggableStyle, virtualStyle, isDragging }) {
  
  const combined = {
    ...virtualStyle,
    ...draggableStyle
  };
  
  const grid = 8;
  
  const result = {
    ...combined,
    height: isDragging ? combined.height : combined.height - grid,
    left: isDragging ? combined.left : combined.left + grid,
    width: isDragging
      ? draggableStyle.width
      : `calc(${combined.width} - ${grid * 2}px)`,
    marginBottom: grid
  };

  return result;
}

function Item({ provided, item, style, isDragging }) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging
      })}
      className={`item ${isDragging ? "is-dragging" : ""}`}
    >
      <EditTitleTaskContainer text={item.title} id={item.idTask} />
    </div>
  );
}

const Row = React.memo(function Row(props) {
  const { data: tasks, index, style } = props;
  const item = tasks[index];
  
  if (!item) {
    return null;
  }

  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {provided => <Item provided={provided} item={item} style={style} />}
    </Draggable>
  );
}, areEqual);

const ItemList = React.memo(function ItemList({ column, index }) {
  const listRef = useRef();
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTo(0);
    }
  }, [index]);

  return (
    <Droppable
      droppableId={column.id}
      mode="virtual"
      renderClone={(provided, snapshot, rubric) => (
        <Item
          provided={provided}
          isDragging={snapshot.isDragging}
          item={column.tasks[rubric.source.index]}
        />
      )}
    >
      {(provided, snapshot) => {
        const itemCount = snapshot.isUsingPlaceholder
          ? column.tasks.length + 1
          : column.tasks.length;

        return (
          <FixedSizeList
            height={400}
            itemCount={itemCount}
            itemSize={80}
            width={300}
            outerRef={provided.innerRef}
            itemData={column.tasks}
            className="task-list"
            ref={listRef}
          >
            {Row}
            
          </FixedSizeList>
        );
      }}
    </Droppable>
  );
});

const Column = React.memo(function Column({ column, index, isDeleting }) {
  console.log("column", column)
  if(!column) return
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <div
          style={{ display: 'flex', textAlign: 'center' }}
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >          
            <EditTitleContainer text={column.title} id={column.idApi} />          
          <ItemList column={column} index={index} />
          <AddNewTaskContainer idCard={column.id} idCardApi={column.idApi} />
        </div>
      )}
      
    </Draggable>
  );
});

export function Board({ cards, getListCards, saveNewOrder, cardLoading, modifyTaskFromCard}) {
  const [state, setState] = useState(cards);
  console.log("cards", cardLoading)
  React.useEffect(() => {
    getListCards();
    
    pubsub.subscribe("REMOVE_CARD", () => {
      getListCards()
    })

    pubsub.subscribe("REMOVE_TASK", () => {
      getListCards()
    })
  }, [])  

  React.useEffect(() => {
    setState(cards)
    console.log("state", state)
  }, [cards])

  pubsub.subscribe("CHANGE_LIST_TASKS", () => {
    setState(cards)
    console.log("dwdwdw")
  }) 


  function onDragEnd(result) {
   
    if (!result.destination) {
      return;
    }

    if (result.type === "column") {
      console.log("result", "column")
      const columnOrder = reorderList(
        state.columnOrder,
        result.source.index,
        result.destination.index
      );
      // setState({
      //   ...state,
      //   columnOrder
      // });
      saveNewOrder({...state, columnOrder});
      return;
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      console.log("result", "list")
      const column = state.columns[result.source.droppableId];
      const tasks = reorderList(
        column.tasks,
        result.source.index,
        result.destination.index
      );

      // updating column entry
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            tasks
          }
        }
      };      
     
      // setState(newState);
      saveNewOrder(newState);
      
      return;
    }

    // moving between lists
    const sourceColumn = state.columns[result.source.droppableId];
    const destinationColumn = state.columns[result.destination.droppableId];
    const task = sourceColumn.tasks[result.source.index];

    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      tasks: [...sourceColumn.tasks]
    };
    newSourceColumn.tasks.splice(result.source.index, 1);

    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      tasks: [...destinationColumn.tasks]
    };
    // in line modification of items
    newDestinationColumn.tasks.splice(result.destination.index, 0, task);

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn
      }
    };
    const idTask = result.draggableId.split(":")
    const idCard = result.destination.droppableId.split("-")
    console.log("idTask", idTask)
    // const idTask = 
    console.log("result", result)
    // setState(newState);
    saveNewOrder(newState);
    modifyTaskFromCard( parseInt(idTask[1]),parseInt(idCard[1]))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <Droppable
          droppableId="all-droppables"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <div
              className="columns"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {state.columnOrder.map((columnId, index) => (
                <Column
                  key={columnId}
                  column={state.columns[columnId]}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <CardInputContainer />
            </div>            
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
