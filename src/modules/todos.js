import {createProject, saveProject, projects} from "./projects";

export const createTask = (name, description = '', dueDate = null, priority, project) =>{

    return {name, description, dueDate, priority, project}

}

export function saveTask(task){
    projects.forEach(project => {
        if(project.name === task.project){
            project.tasks.push(task);
        }
    });
}

export function deleteTask(task){
    projects.forEach(project => {
        if(project.name === task.project){
            project.tasks.splice(project.tasks.indexOf(task),1);
        }
    });
}

export function editTask(oldTask, updatedTask){
    projects.forEach(project => {
        if(project.name === oldTask.project){
            project.tasks.splice(project.tasks.indexOf(oldTask), 1);
        }
    });

    saveTask(updatedTask);
    
}