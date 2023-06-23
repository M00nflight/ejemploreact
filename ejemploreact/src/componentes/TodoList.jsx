import React from "react";
import { TodoItem } from "./TodoItem";

export function TodoList(){
    return (
        <>
            <h1>Lista de tareas</h1>
            <ul class="list-group">
                <TodoItem/>
            </ul>
        </>
    );
}