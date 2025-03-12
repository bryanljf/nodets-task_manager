import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const create = async (data: Prisma.TaskCreateInput) => {
    try {
       const task = await prisma.task.upsert({
        where: {
            name: data.name
        },
        update: {},
        create: data
       });
       
       return task;
    }catch (error) {
        console.log('An error has ocurred during the creation of a new task: ', error);
        return false;
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
        console.log('An error has ocurred getting all tasks: ', error);
        return false;
    }
}

export const getTask = async (name: string) => {
    try {
        const task = await prisma.task.findUnique({
            where: { name }
        });

        return task;
    }catch (error) {
        console.log('An error has ocurred finding the specified task: ', error);
        return false;
    }
}