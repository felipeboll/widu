export let projects = [];

export const createProject = (name) =>{

    return {name}
}

export function saveProject(project){
    projects.push(project);
}