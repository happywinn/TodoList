// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todoList');



// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

// Functions
count = 0;   // for pending tasks counting
var clicked = false;
var alertDanger;
function addTodo(event){
    // Prevent form from submitting
    event.preventDefault();
    
    //Todo DIV
    if(!(todoInput.value === "")) {
        if(alertDanger){
            alertDanger.remove();
        }

        count +=1;
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // ADD TODO TO LOCALSTORAGE
        saveLocalTodos(todoInput.value);
        //Check mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Check trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Append to List
        todoList.appendChild(todoDiv);

        //Clear Todo Input Value
        todoInput.value = "";
        document.querySelector('.tasks').innerHTML = "You have "+"<b>"+count+"</b>"+" pending tasks.";
    }
    else {
        if(!clicked) {  
            event.preventDefault();
            alertDanger = document.createElement('div');
            alertDanger.classList.add("alert","alert-danger");   
            alertDanger.innerText = "Please Enter ToDoList";
            // Append to List
            todoList.appendChild(alertDanger);
            console.log(count);
            clicked = true;
        }
    }
      
}


function deleteCheck(e) {
    const item = e.target;
    // DELETE TODO
    if(item.classList[0] === "trash-btn") {
        count -=1;
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        
    }


    //CHECK MARK
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    document.querySelector('.tasks').innerHTML = "You have "+"<b>"+count+"</b>"+" pending tasks.";
}



var todos;
function saveLocalTodos(todo) {
    console.log("hello");
    // CHECK --- HEY DO I already have thing in there?
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // CHECK --- HEY DO I already have thing in there?
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Check trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Append to List
        todoList.appendChild(todoDiv);
    });
    count = todos.length;
    
}


function removeLocalTodos(todo) {
    // CHECK --- HEY DO I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //console.log(todo.children[0].innerText);
    //console.log(todos.indexOf("hello"));
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));

    /* example
        const todos = ["apple","john","banana"];
        const johnIndex = todos.indexOf("john");
        todos.splice(johnIndex, 1);
        console.log(todo);
    */
}


//Clear Event 
document.querySelector(".clearbtn").addEventListener("click", e => {
    // reload page
    location.reload();
    while(todos.length > 0) {   // delete all items from localstorage
        removeLocalTodos(todoList);
        todos.pop();
    }
    todoList.remove();
});