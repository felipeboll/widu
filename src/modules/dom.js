import {createProject, saveProject, projects} from "./projects";
import { createTask, saveTask } from "./todos";

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
    });
})

showProjectDropDown();

function showProjectDropDown(){

    projectSelectedText.innerText = projects[1].name;

    projects.forEach(project => {
        const li = document.createElement('li');
        const input = document.createElement('input');
   
        if(projects.indexOf(project) != 0){

            //makes the inbox project the regular input
            if(projects.indexOf(project) === 1){
                input.checked = true;
            }

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
    task.dueDate = formData.get('task-due-date');
    task.priority = formData.get('priority');
    task.project = formData.get('project');

    saveTask(task);
    newTaskForm.reset();
    addTaskModal.close();
    
});