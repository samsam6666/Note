const ul = document.querySelector('ul');
let textInput = document.querySelector('.footer input');
const link = document.querySelector('.footer a');
const spanDelete = `<span class="delete">حذف</span>`
let searchInput = document.querySelector('.header input');
link.addEventListener('click', function (e) {
    if (textInput.value != '') {
        const spanNote = document.createElement('span');
    spanNote.className = 'note';
    spanNote.textContent = textInput.value;
    const li = document.createElement('li');
    li.appendChild(spanNote);
    li.innerHTML += spanDelete;
    ul.appendChild(li);
    storeToLocalStorage(textInput.value)
    }


    textInput.value = '';
    e.preventDefault();
})

ul.addEventListener('click',function(e) {
    if (e.target.className == 'delete'){
       e.target.parentElement.remove()
       removeFromLocalStorage(e.target.parentElement.children[0].textContent)
    }
})

searchInput.addEventListener('keyup', function(e){ 
    for (const note of ul.children) {
        if (note.firstElementChild.textContent.indexOf(searchInput.value) !== -1)  {
            note.style.display = 'flex'
        }else{
            note.style.display = 'none'
        }
        
    }
    
})
document.addEventListener('DOMContentLoaded', function(e){
    let tasks;
    if (localStorage.getItem('tasks')===null ) {
        tasks = []
    }else{
        tasks =localStorage.getItem('tasks').split(',')
    }
    for (let item of tasks) {
        const spanNote = document.createElement('span');
        spanNote.className = 'note';
        spanNote.textContent = item;
        const li = document.createElement('li');
        li.appendChild(spanNote);
        li.innerHTML += spanDelete;
        ul.appendChild(li);
    }

    
})

function storeToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks')===null ) {
        tasks = []
    }else{
        tasks =localStorage.getItem('tasks').split(',')
    }
    tasks.push(task)
    localStorage.setItem('tasks', tasks)
}

function removeFromLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks')===null ) {
        tasks = []
    }else{
        tasks =localStorage.getItem('tasks').split(',')
    }
    for (let i=0; i<tasks.length; i++){
        if (tasks[i]===task) {
           tasks.splice(i, 1) 
        }
    }

    if (tasks.length == 0) {
        localStorage.clear()
    }else{
        localStorage.setItem('tasks',tasks)
    }
    
}
