import React, {Fragment, useState, useRef, useEffect} from "react";
import { v4 as uuid } from 'uuid';
import { TodoItem } from "./TodoItem";
 const CLAVE='todolist-todos'
export function TodoList() {
  const [todos, setTodos] =useState([

  ]);
  const taskRef=useRef();
 
  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(CLAVE);
      if (!storedValue || storedValue === 'undefined') {
        return;
      }
      const storedTodos = JSON.parse(storedValue);
      if (Array.isArray(storedTodos)) {
        setTodos(storedTodos);
      }
    } catch (error) {
      console.warn('No se pudieron cargar las tareas guardadas:', error);
      localStorage.removeItem(CLAVE);
    }
  },[])

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(todos));
    } catch (error) {
      console.warn('No se pudieron guardar las tareas:', error);
    }
  },[todos])

const cantidadTareas=()=>{
  return todos.filter((todo)=>!todo.completed).length
}
const ResumenTareas=()=>{
const cant=cantidadTareas()
return <h3> la cantidad de tareas pendientes es {cant}</h3>

}
const cambiarEstadoTarea=(id)=>{
const newTodos=[...todos]
  const todo =newTodos.find((todo)=>todo.id===id)
  todo.completed=!todo.completed;
  setTodos(newTodos)

}

const eliminarTarea=()=>{
const newTodos=todos.filter((todo)=>!todo.completed)
setTodos(newTodos)
}

  const agregarTarea=()=>{
    const task=taskRef.current?.value?.trim();
    if (!task) return;

    setTodos((prevTodos)=>{
      const newTask={
        id:uuid(), task: task, completed:false
      }
      return [...prevTodos, newTask]
    })
    taskRef.current.value='';
    }
  
    return (
    <Fragment>
      <h1> Listado de Tareas</h1>
      <div className="input-group mt-4 mb-4" >
        <input type="text" placeholder="Ingrese una tarea" ref={taskRef}/>
        <button className="btn btn-success" onClick={agregarTarea}>+</button>
         <button className="btn btn-danger" onClick={eliminarTarea}>-</button>

      </div>
      <ul className="list-group">

        {todos.map((todo) => (
          
          <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea} />
        
        )
        
        )
        
        }

      </ul>
      <ResumenTareas />
    </Fragment>
  );
}
