export let projects = [];

export const createProject = (name) =>{
    let tasks = [];
    return {name, tasks}
}

export function saveProject(project){
    projects.push(project);
}

