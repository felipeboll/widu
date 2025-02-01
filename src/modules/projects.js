export let projects = JSON.parse(localStorage.getItem('Projects')) || [];

export const createProject = (name) =>{
    let tasks = [];
    return {name, tasks}
}

export function saveProject(project){
    projects.push(project);
    localStorage.setItem('Projects', JSON.stringify(projects));
}

