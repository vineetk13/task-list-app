//Defining UI variables
const form=document.querySelector('#task-form');
const filter=document.querySelector('#filter');
const list=document.querySelector('.collection');
const task=document.querySelector('#task');
const clear=document.querySelector('.clear-tasks');

//Load all event listeners
loadEventListeners();

//Event listeners
function loadEventListeners(){
    document.addEventListener('DOMContentLoaded',loadTasks);
    form.addEventListener('submit',addTask);
    list.addEventListener('click',removeTask);
    clear.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
}

//Loading the DOM
function loadTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[]
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
        //Create a list element
        const li=document.createElement('li');
        //Specify the UI class name
        li.className='collection-item';
        //Add the text node as its child with the task value
        li.appendChild(document.createTextNode(task));
        
        //Create a delete link
        const link=document.createElement('a');
        //Specify the UI class name
        link.className='delete-item secondary-content';
        //Add icon tag
        link.innerHTML='<i class="material-icons">cancel</i>';
        //Append the link
        li.appendChild(link);

        //Append li to ul
        list.appendChild(li);
    })
}

//Add Task
function addTask(e){
    if(task.value===''){
        alert('Add a task!');
    }
    else{
        //Create a list element
        const li=document.createElement('li');
        //Specify the UI class name
        li.className='collection-item';
        //Add the text node as its child with the task value
        li.appendChild(document.createTextNode(task.value));
        
        //Create a delete link
        const link=document.createElement('a');
        //Specify the UI class name
        link.className='delete-item secondary-content';
        //Add icon tag
        link.innerHTML='<i class="material-icons">cancel</i>';
        //Append the link
        li.appendChild(link);

        //Append li to ul
        list.appendChild(li);

        //Add task to local storage
        addTaskToLS(task.value);

        //clear the input after adding
        task.value='';
    }

    e.preventDefault();
}

//Adding task to local storage
function addTaskToLS(task){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
             e.target.parentElement.parentElement.remove();
             removeFromLS(e.target.parentElement.parentElement);
        //console.log(e.target);
        }
    }
    
}

function removeFromLS(taskitem){
   //console.log(taskitem);
    const task=taskitem.textContent.slice(0,-6);
    console.log(task);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(t,index){
        if(task === t){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear tasks
function clearTasks(e){
   // list.innerHTML='';
   while(list.firstChild){
       list.removeChild(list.firstChild);
   }
   clearFromLS();
}

//clearing tasks from local storage
function clearFromLS(){
    localStorage.clear();
}

//Filter tasks
function filterTasks(e){
    //console.log(e.target.value);
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display='block';
        }else{
            task.style.display='none';
        }
    })
}