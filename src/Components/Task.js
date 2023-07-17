import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import React from "react";


if(!JSON.parse(localStorage.getItem('todolist'))){
    localStorage.setItem('todolist', JSON.stringify([]))
}

export default function Task() {

    var myList = JSON.parse(localStorage.getItem('todolist'));
    
    const [todos, setTodos] = React.useState(myList);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editingId, setEditingId] = React.useState(-1);
    
    function addTodo(value){
        
        
        if(!isEditing){
            var myList = JSON.parse(localStorage.getItem('todolist'));
            myList.push({val: value, isCompleted: false, id: uuidv4()});
            localStorage.setItem('todolist', JSON.stringify(myList));
            
            setTodos(prevTodo => {
                return [...prevTodo, {val: value, isCompleted: false, id: uuidv4()}]
        })
        }
        else{
            const myList = []
            for(var i = 0; i<todos.length;i++){
                if(todos[i].id !== editingId){
                    myList.push(todos[i])
                }
                else{
                    todos[i].val = value
                    myList.push(todos[i])
                }
            }
            localStorage.setItem('todolist', JSON.stringify(myList));
            setTodos(myList)
            setIsEditing(false)
            setEditingId(-1)
        }


        
        
    }
    
    function handleCheck(obj) {
        
        obj.isCompleted = !obj.isCompleted
        
        var myList = [...todos]
        localStorage.setItem('todolist', JSON.stringify(myList));
        console.log(myList)

    }
    function handleDelete(obj) {
        
        setTodos(todos.filter((todo) => todo.id !== obj.id));
        
        var myList = []
        for(var i = 0; i<todos.length;i++){
            if(todos[i].id !== obj.id){
                myList.push(todos[i])
            }
        }
        localStorage.setItem('todolist', JSON.stringify(myList));

        
    }
    function handleEdit(obj){
        const inputBox = document.querySelector("Input")
        const objVal = obj.val
        
        setIsEditing(true)
        setEditingId(obj.id)

        inputBox.value = objVal
     
        

    }
    const todolist = todos.map(todo => {
        
        var checked = todo.isCompleted
        
        return (
                <div className="list-item" key={todo.id}>
                    
                    <h3 className = "task" >{todo.val}</h3>
                    <input className="check-box" type="checkbox" defaultChecked = {checked}  onChange = {() => {
                        handleCheck(todo)
                    } }  />
                    <button className="btn" onClick={()=> handleEdit(todo)}>Edit</button>
                    <button className="btn" onClick={() => handleDelete(todo)}>Delete</button>
                </div>
            
        )
        
    })

    return (
        
        <div className="todos">
            <Input addTodo = {addTodo} className="input-box" />
            <div className="todolist">{todolist}</div>
            
        </div>
    )
}