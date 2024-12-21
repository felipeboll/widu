import {createProject, saveProject, projects} from "./projects";

const project1 = createProject('Projeto A');
const project2 = createProject('Projeto B');
const project3 = createProject('Projeto C');

saveProject(project1);
saveProject(project2);
saveProject(project3);

const btnNewProject = document.querySelector('.sidebar-add-project');
const addProjectModal = document.querySelector('.sidebar-add-project-modal');
const btnCloseAddProjectModal = document.querySelector('.add-project-cancel-btn');
const newProjectForm = document.querySelector('.sidebar-add-project-modal form')
const sidebarProjectList = document.querySelector('.sidebar-project-list');
const projectTitle = document.querySelector('.project-title');

btnNewProject.addEventListener('click', ()=>{
    
    addProjectModal.showModal();
});

btnCloseAddProjectModal.onclick = (event) => {
    event.preventDefault();
    addProjectModal.close();
};

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
    if(projects.indexOf(project) == 0){
        li.setAttribute('aria-selected', true);
        displayProjectTasks(0);
    }else{
        li.setAttribute('aria-selected', false);
    }
    li.classList.add('sidebar-project-item');
    li.innerHTML = project.name;

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

