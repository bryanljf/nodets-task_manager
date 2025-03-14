import { getUserById } from "../controllers/user";
import { prisma } from "../libs/prisma";
import { Task, TaskAssignTo } from "../models/Task";

export const create = async (data: Task, userId: number) => {
    try {
        const task = await prisma.task.upsert({
            where: {
                id: data.id
            },
            update: {},
            create: {
                ...data,
                userId
            }
        });

        return task;
    } catch (error) {
        throw error;
    }
};

export const assign = async (data: TaskAssignTo) => {
    try{
        const user = await getUserById(data.userId);
        if(user){
            const task = prisma.task.update({
                where: { id:data.id },
                data: { userId:data.userId }
            });

            return task;
        }

        return false;
    }catch(error){
        throw error;
    }
}

export const getAll = async (userId: number) => {
    try{
        const tasks = await prisma.task.findMany({
            select: {
                name: true,
                desc: true,
                status: true
            },
            where: { userId },
            orderBy: { name:'asc' }
        });

        return tasks;
    }catch (error) {
        throw error;
    }
}

export const getTask = async (id: number) => {
    try {
        const task = await prisma.task.findUnique({
            where: { id }
        });

        return task;
    }catch (error) {
        throw error;
    }
}