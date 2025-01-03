import {createProject, saveProject, projects} from "./projects";

export const createTask = (name, description = '', dueDate = null, priority, project) =>{

    return {name, description, dueDate, priority, project}
    
}