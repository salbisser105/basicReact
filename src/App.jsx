//React component  thats what JSX files mean
import React, {
    useState,
    Fragment,
    useRef,
    useEffect,
} from 'react';
import { v4 as uuidv4 } from "uuid";
import {
    TodoList
} from './components/TodoList';
// We will use caps so we understand those are components created by us. 
const KEY='todoApp.todos';
export function App() {
    const [todos, setTodos] = useState([{
        id: 1,
        task: 'Estudiar React',
        completed: true
    }]);
    const todoTaskRef = useRef();

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);
    useEffect(() =>{
        const storedTodos= JSON.parse(localStorage.getItem(KEY));
        if(storedTodos){
            setTodos(storedTodos);
        }
    }, [])

    const toggleTodo = (id)=> {
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=> todo.id === id);
        todo.completed= !todo.completed;
        setTodos(newTodos);
    };
    

    const handleTodoAdd=() => {
        const task= todoTaskRef.current.value;
        if(task === '') return;
        //Hook use State, we can access to the last state
        setTodos((prevTodos)=> {
            return [...prevTodos, {id: uuidv4(), task, completed:true}]
        });
        todoTaskRef.current.value = null;
    };
    const handleClearAll= () => {
        const newTodos = todos.filter((todo)=> todo.completed);
        setTodos(newTodos);
    }


    return (
    <Fragment>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
        <button onClick={handleTodoAdd}>+</button>
        <button onClick={handleClearAll}>-</button>
        <div>Te quedan {todos.filter((todo)=> todo.completed).length}tareas por terminar</div>
    </Fragment>
    );

}