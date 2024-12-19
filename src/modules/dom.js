import {createProject, saveProject, projects} from "./projects";

const btnNewProject = document.querySelector('.sidebar-add-project');
const addProjectModal = document.querySelector('.sidebar-add-project-modal');
const btnCloseAddProjectModal = document.querySelector('.add-project-cancel-btn');
const newProjectForm = document.querySelector('.sidebar-add-project-modal form')

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
});

