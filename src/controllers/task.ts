import { assign, create, getAll } from "../services/task"
import { getIdFromToken } from "../middlewares/passport-jwt";
import { Task, TaskAssignTo } from "../models/Task";

export const createTask = async (data: Task, token: string) => {
    try{
        const userId = getIdFromToken(token);
        return await create(data, userId);
    } catch (error) {
        console.log('An error has ocurred during the creation of a new task: ', error);
        return false;
    }
}

export const getAllTasks = async (token: string) => {
    try{
        const userId = getIdFromToken(token);
        const tasks = await getAll(userId);
        
        if (Array.isArray(tasks)) {
            if(tasks.length > 0) {
                return tasks;
            }
            else {
                return false;
            }
        }
    } catch (error) {
        console.log('An error has ocurred getting all tasks: ', error);
        return false;
    }
}

export const assignTaskTo = async (data: TaskAssignTo) => {
    try{
       const task = await assign(data);
       return task;
    } catch (error) {
        console.log('An error has ocurred while trying to assign the task: ', error);
        return false;
    }
}   