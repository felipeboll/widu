import {createProject, saveProject, projects} from "./projects";
import { createTask, saveTask } from "./todos";
import { format, parseISO } from 'date-fns'

const project1 = createProject('All Tasks');
const project2 = createProject('Inbox');
const project3 = createProject('Projeto C');

saveProject(project1);
saveProject(project2);
saveProject(project3);

const btnNewProject = document.querySelector('.sidebar-add-project');
const addProjectModal = document.querySelector('.sidebar-add-project-modal');
const addTaskModal = document.querySelector('.task-add-modal');
const btnCloseAddProjectModal = document.querySelector('.add-project-cancel-btn');
const newProjectForm = document.querySelector('.sidebar-add-project-modal form')
const sidebarProjectList = document.querySelector('.sidebar-project-list');
const projectTitle = document.querySelector('.project-title');

//new task modal
const priorityInputList = document.querySelectorAll('#priority-options .option input'),
btnPrioritySelectText = document.getElementById('task-selected-button-text'),
prioritySelectCheckBox = document.getElementById('priority-select'),
projectSelectedText = document.getElementById('project-selected-button'),
projectList = document.querySelector('#project-options'),
projectSelectCheckBox = document.getElementById('project-select'),
newTaskForm = document.querySelector('.task-add-modal form'),
btnCloseAddTaskModal = document.querySelector('.task-add-modal form .cancel-button');

const taskList = document.querySelector('.task-list');


const addTaskButton = document.querySelectorAll('.project-add-task');

btnNewProject.addEventListener('click', ()=>{
    addProjectModal.showModal();
});

btnCloseAddProjectModal.onclick = (event) => {
    event.preventDefault();
    addProjectModal.close();
};

btnCloseAddTaskModal.onclick = (event) =>{
    event.preventDefault();
    addTaskModal.close();
}

newProjectForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const formData = new FormData(newProjectForm);

    const project = createProject();
    project.name = formData.get("new-project-name");

    saveProject(project);
    addProjectModal.close();
    newProjectForm.reset();

    console.log(projects);

    displayProjects(project);
});

function displayProjects (project){

    const li = document.createElement('li');
    li.setAttribute('data-index', projects.indexOf(project));
    li.classList.add('sidebar-project-item');
    li.innerHTML = project.name;

    if(projects.indexOf(project) == 0){
        li.setAttribute('aria-selected', true);
        displayProjectTasks(0);
        li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.8801 7.84127L15.9023 3.8457C15.5627 3.14648 14.8635 2.70697 14.0644 2.70697H3.91565C3.11654 2.70697 2.43729 3.1265 2.07769 3.8457L0.099889 7.82129C0.0399556 7.94115 0 8.081 0 8.20087V13.5749C0 14.5139 0.759157 15.293 1.71809 15.293H16.2819C17.2209 15.293 18 14.5338 18 13.5749V8.22084C17.98 8.081 17.9401 7.94115 17.8801 7.84127ZM12.4661 7.3618C12.0666 7.3618 11.727 7.64149 11.6271 8.04104C11.6071 8.12096 11.1476 10.2586 8.97003 10.2586C6.85239 10.2586 6.37292 8.28078 6.31299 8.04104C6.23307 7.64149 5.89345 7.3618 5.47392 7.3618H2.23751L3.61598 4.60486C3.67592 4.50497 3.79578 4.40508 3.91565 4.40508H14.0644C14.1842 4.40508 14.3041 4.46502 14.364 4.60486L15.7225 7.3618H12.4661Z" fill="#FC0005"/>
        </svg>
        <span> ${project.name}</span>`;
    }else{
        li.setAttribute('aria-selected', false);
    }

    sidebarProjectList.append(li);
}

function refreshScreen(){
    projects.forEach(element => {
        displayProjects(element);
    });
}



sidebarProjectList.addEventListener('click', (element) =>{

    const activeItem = element.target.closest('.sidebar-project-item');
    if(activeItem){
        activeItem.setAttribute('aria-selected', true);
        const index = activeItem.getAttribute('data-index');
        
        Array.from(sidebarProjectList.children).forEach((item) => {
            item.setAttribute('aria-selected', false);
        });
        
        activeItem.setAttribute('aria-selected', true);
        displayProjectTasks(index);
    }

});

function displayProjectTasks(index){
    projectTitle.innerHTML = projects[index].name;
    displayTasks(index);
}

function displayTasks(index){

    taskList.innerHTML = '';

    projects[index].tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-list-item')
        li.setAttribute('data-index', projects[index].tasks.indexOf(task));

        const checkBox = document.createElement('button');
        checkBox.classList.add('task-checkbox');

        const p = document.createElement('p');
        p.classList.add('task-name');
        p.innerHTML = task.name;

        const div = document.createElement('div');
        div.append(p);
        
        const date = document.createElement('p');
        date.innerHTML = format(task.dueDate, "dd MMM");
        date.classList.add('task-date');
        div.append(date);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('task-delete');
        deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
          <g clip-path="url(#clip0_178_2)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.3375 0.944402C5.33752 0.8267 5.38427 0.713822 5.46748 0.630573C5.55069 0.547325 5.66354 0.500516 5.78125 0.500433L10.2185 0.500183C10.3362 0.500456 10.449 0.547394 10.5322 0.63071C10.6154 0.714025 10.6621 0.826921 10.6622 0.944652V2.04206H5.3375V0.944402ZM12.6332 15.8645C12.6218 16.0375 12.5448 16.1997 12.4178 16.3178C12.2909 16.4359 12.1236 16.501 11.9502 16.4998H3.99856C3.8252 16.4993 3.65844 16.4333 3.53176 16.315C3.40508 16.1966 3.32787 16.0347 3.31562 15.8618L2.63518 5.90812H13.3594L12.6333 15.8644L12.6332 15.8645ZM14.4009 5.00662H1.59909V3.97537C1.59928 3.70186 1.708 3.43961 1.90138 3.24619C2.09476 3.05277 2.35699 2.94399 2.6305 2.94375L13.3694 2.9434C13.6429 2.94382 13.905 3.05269 14.0983 3.24613C14.2917 3.43958 14.4004 3.70179 14.4006 3.97528V5.00653L14.4009 5.00662ZM5.93872 14.127C5.93872 14.1861 5.95037 14.2448 5.97302 14.2994C5.99567 14.3541 6.02887 14.4038 6.07072 14.4456C6.11257 14.4875 6.16225 14.5207 6.21693 14.5433C6.27161 14.566 6.33022 14.5777 6.3894 14.5777C6.44859 14.5777 6.50719 14.566 6.56187 14.5433C6.61655 14.5207 6.66624 14.4875 6.70809 14.4456C6.74994 14.4038 6.78313 14.3541 6.80578 14.2994C6.82843 14.2448 6.84009 14.1861 6.84009 14.127V7.80675C6.83914 7.68789 6.79127 7.57421 6.7069 7.49049C6.62253 7.40676 6.5085 7.35975 6.38964 7.35971C6.27077 7.35967 6.15671 7.4066 6.07228 7.49027C5.98785 7.57394 5.9399 7.68757 5.93887 7.80643V14.127H5.93872ZM9.15434 14.127C9.15434 14.2465 9.20183 14.3612 9.28636 14.4457C9.37089 14.5302 9.48554 14.5777 9.60509 14.5777C9.72464 14.5777 9.83929 14.5302 9.92382 14.4457C10.0084 14.3612 10.0558 14.2465 10.0558 14.127V7.80675C10.0549 7.68787 10.007 7.57418 9.92263 7.49044C9.83825 7.4067 9.7242 7.35969 9.60532 7.35965C9.48644 7.35961 9.37236 7.40654 9.28792 7.49022C9.20348 7.5739 9.15553 7.68756 9.1545 7.80643L9.15434 14.127Z" fill="#FC0005"/>
          </g>
          <defs>
            <clipPath id="clip0_178_2">
              <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
            </clipPath>
          </defs>
        </svg>`;
        
        let priorityColor;

        switch (task.priority){
            case "Regular":
                priorityColor = "#0076FF";
                break;
            case "Medium":
                priorityColor = "#FC7900";
                break;
            case "High":
                priorityColor = "#CA0004";
                break;
        }

        const secondSVG = document.createElement('span');
        secondSVG.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
          <g clip-path="url(#clip0_126_226)">
            <path d="M0.666667 16.5C0.489856 16.5 0.320286 16.4298 0.195262 16.3047C0.0702379 16.1797 0 16.0101 0 15.8333V3.16667C0 1.696 1.196 0.500003 2.66667 0.500003H14.6653C15.732 0.463337 16.4013 1.80534 15.7307 2.63534L13.5727 5.5L15.7307 8.36467C16.402 9.19467 15.7327 10.5367 14.6653 10.5H1.33333V15.8333C1.33333 16.0101 1.2631 16.1797 1.13807 16.3047C1.01305 16.4298 0.843478 16.5 0.666667 16.5Z" fill="${priorityColor}"/>
          </g>
          <defs>
            <clipPath id="clip0_126_226">
              <rect width="14" height="14" fill="white" transform="translate(0 0.5)"/>
            </clipPath>
          </defs>
        </svg>`;

        li.append(checkBox);
        li.append(div);
        li.append(deleteButton);
        li.append(secondSVG);
        
        taskList.append(li);
    });
}

refreshScreen();

priorityInputList.forEach(element => {
    element.addEventListener('click', event=>{

        const priorityValue = event.target.value;
        const svgPath = document.querySelector('#task-selected-button svg path');

        btnPrioritySelectText.textContent = priorityValue;

        if(priorityValue === 'Medium'){
            svgPath.setAttribute('fill', '#FC7900'); // Cor para Medium
        }else if(priorityValue === 'High'){
            svgPath.setAttribute('fill', '#CA0004');
        }else if(priorityValue == 'Regular'){
            svgPath.setAttribute('fill', '#0076FF');
        }
        prioritySelectCheckBox.click();
    })
});

addTaskButton.forEach(button => {
    button.addEventListener('click', ()=>{
        addTaskModal.showModal();
        showProjectDropDown();
    });
})

function showProjectDropDown(){

    projectList.innerHTML = '';

    projectSelectedText.innerText = projects[1].name;

    projects.forEach((project, index) => {
        const li = document.createElement('li');
        const input = document.createElement('input');
   
        if(index != 0){
            //makes the inbox project the regular input
            if(index === 1){
                input.checked = true;
            }

            console.log(index)
            li.classList.add('option');

            input.setAttribute('data-index', projects.indexOf(project));
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'project');
            input.setAttribute('value', project.name);
            li.innerHTML = project.name;
    
            li.append(input);
    
            projectList.append(li);
        }
    });

    const projectInputList = document.querySelectorAll('#project-options .option input');

    projectInputList.forEach(element =>{

        element.addEventListener('click', event=>{

            const index = event.target.getAttribute('data-index');
            console.log(index);
            projectSelectedText.innerText = projects[index].name;
            projectSelectCheckBox.click();

        });
    }); 

}

newTaskForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const formData = new FormData(newTaskForm);

    const task = createTask();

    task.name = formData.get('task-name');
    task.description = formData.get('task-description');
    task.dueDate = formData.get('task-due-date');;
    task.priority = formData.get('priority');
    task.project = formData.get('project');
    console.log(task);
    console.log(task.project);

    saveTask(task);
    const index = projects.findIndex(project => project.name === task.project);
    displayProjectTasks(index);
    console.log(task.dueDate);
    newTaskForm.reset();
    addTaskModal.close();

});

