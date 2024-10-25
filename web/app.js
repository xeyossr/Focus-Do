const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        update_stats();
        saveTodos();
        todoInput.value = "";
    }  
}
function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
        `
        const deleteButton = todoLI.querySelector(".delete-button");
        deleteButton.addEventListener("click", ()=>{
            deleteTodoItem(todoIndex);
        })
        const checkbox = todoLI.querySelector("input");
        checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        
        update_stats();
        saveTodos();
    })



    checkbox.checked = todo.completed;
    return todoLI;
}
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
    update_stats();
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

// Verileri kaydeden fonksiyon
function saveStats(completedX, currentMotivation) {
    localStorage.setItem('completedX', completedX);
    localStorage.setItem('motivText', currentMotivation);
}

// Verileri localStorage'dan alan fonksiyon
function loadStats() {
    const savedCompletedX = localStorage.getItem('completedX');
    const savedMotivText = localStorage.getItem('motivText');
    
    // Eğer veriler mevcutsa, sayfadaki alanlara yaz
    if (savedCompletedX !== null) {
        document.getElementById('stat').innerHTML = `${savedCompletedX}%`;
        document.getElementById('progress').style.width = `${savedCompletedX}%`;
    }
    if (savedMotivText !== null) {
        document.getElementById('text').innerHTML = savedMotivText;
    }
}

function update_stats() {
    var completedX = 0;
    var completedY = 0;
    allTodos.filter(e => {
        (e.completed == true) ? completedY += 1 : completedY;
    });
    
    var motiv = [
        "Get started! 🚀 Every step counts.",
        "Keep going, you've got this! 💪",
        "Great start! Let’s keep the momentum! 🌟",
        "You're making progress! Keep pushing! 🏃‍♂️",
        "Almost halfway there! Stay focused. 🎯",
        "You’re doing amazing! Just a bit more. 💥",
        "Halfway! You’re unstoppable! 🔥",
        "You’re crushing it! Don’t stop now. 🚴‍♂️",
        "So close! Finish strong! 💥",
        "Almost there! You’re a rockstar! 🌟",
        "Just a few more tasks to gooo! 🏁",
        "Victory is within reach! Keep going! 🏆",
        "That's right, you win!! 🏅🏅",
    ];
    
    if (allTodos.length > 0) completedX = Math.round((completedY / allTodos.length) * 100);
    document.getElementById('stat').innerHTML = `${completedX}%`; 
    document.getElementById('progress').style.width = `${completedX}%`;

    let currentMotivText = "";  // Şuanki motivasyon yazısı
    if (completedX >= 0 && completedX <= 4) currentMotivText = motiv[0];
    if (completedX >= 5 && completedX <= 9) currentMotivText = motiv[1];
    if (completedX >= 10 && completedX <= 19) currentMotivText = motiv[2];
    if (completedX >= 20 && completedX <= 29) currentMotivText = motiv[3];
    if (completedX >= 30 && completedX <= 39) currentMotivText = motiv[4];
    if (completedX >= 40 && completedX <= 49) currentMotivText = motiv[5];
    if (completedX >= 50 && completedX <= 59) currentMotivText = motiv[6];
    if (completedX >= 60 && completedX <= 69) currentMotivText = motiv[7];
    if (completedX >= 70 && completedX <= 79) currentMotivText = motiv[8];
    if (completedX >= 80 && completedX <= 89) currentMotivText = motiv[9];
    if (completedX >= 90 && completedX <= 94) currentMotivText = motiv[10];
    if (completedX >= 95 && completedX <= 99) currentMotivText = motiv[11];
    if (completedX == 100) currentMotivText = motiv[12];

    // Şuanki motivasyonu güncelle
    document.getElementById('text').innerHTML = currentMotivText;

    // Verileri localStorage'a kaydet
    saveStats(completedX, currentMotivText);
}

// Sayfa yüklendiğinde localStorage'dan verileri çek
window.onload = function() {
    loadStats();
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}