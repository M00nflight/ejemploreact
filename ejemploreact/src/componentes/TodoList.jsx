import React, { useState,useRef,useEffect } from "react";
import { TodoItem } from "./TodoItem";
import {v4 as uuid} from 'uuid';

const KEY="todolist-todos";

export function TodoList(){
    const {todos,setTodos}=useState(
        /*[
            {id:1,task:"Tarea 1",complete:true},
            {id:1,task:"Tarea 1",complete:false}
        ]*/
        JSON.parse(localStorage.getItem(KEY))?[...JSON.parse(localStorage.getItem(KEY)]:[]
    );

    const taskRef=useRef();

    useEffect(()=>{
        localStorage.setItem(KEY,JSON.stringify(todos));
    },[todos]);//cuando cambie el todos los guarda en localStorage
    
    const agregarTarea=()=>{
        //console.log("Agregando Tarea");
        const task=taskRef.current.value;
        const id=uuid();
        if(task==='')return;
        setTodos((prevTodos)=>{
            const newTask = {
                id: id,
                task: task,
                complete:false
            }
            return [...prevTodos, newTask]
        });
        taskRef.current.value="";
    }

    const ResumenTareas=()=>{
        const cantidad=cantidadTareas();
        if(cantidad>1){
            return (<div className="alert alert-info mt-3">
            Te quedan {cantidad} tareas pendientes!
            </div>);
        }else if (cantidad===1){
            return (<div className="alert alert-info mt-3">
            Te queda {cantidad} tarea pendiente!
            </div>);
        }else{
            return (<div className="alert alert-info mt-3">
            No te quedan tareas pendientes!
        </div>);
        }
    }

    const cantidadTareas=()=>{
        return todos.filter((todo)=>!todo.complete).length;
    }

    const cambiarEstadoTarea=(id)=>{

        const newTodos=[...todos];
        const todo=newTodos.find((todo)=>todo.id===id);
        todo.complete=!todo.complete;
        setTodos(newTodos);
    }

    const eliminarTareasCompletadas=()=>{
        const newTodos=todos.filter((todo)=>!todo.complete);
        setTodos(newTodos);
    }
    return (
        <>
            <h1>Listado de Tareas</h1>
            <div className="input-group mb-3 mt-4">
                <input ref={taskRef} placeholder="Ingrese una tarea" className="form-control" type="text" name="" id=""></input>
                <button onClick={agregarTarea} className="btn btn-success ms-2"><i className="bi bi-plus-circle-fill"></i></button>
                <button onClick={eliminarTareasCompletadas} className="btn btn-danger ms-2"><i className="bi bi-trash"></i></button>
            </div>
            <ul className="list-group">
                {todos.map((todo)=><TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea}></TodoItem>)}
            </ul>
            <ResumenTareas/>
        </>
    );
}