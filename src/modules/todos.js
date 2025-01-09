import {createProject, saveProject, projects} from "./projects";

export const createTask = (name, description = '', dueDate = null, priority, project) =>{

    return {name, description, dueDate, priority, project}

}

export function saveTask(task){

    projects.forEach(project => {
        if(task.project === project.name){
            project.tasks.push(task);
            console.log(project.tasks);
        }
    });

}