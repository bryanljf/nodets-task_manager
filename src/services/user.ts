import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import jwt from "jsonwebtoken";
import {hashPassword} from "../libs/bcrypt";

export const create = async (data: Prisma.UserCreateInput) => {
    try {
        const hashedPassword = await hashPassword(data.password);

       const user = await prisma.user.upsert({
        where: {
            email: data.email
        },
        update: {},
        create: {
            ...data,
            password: hashedPassword
        } 
       });
       
       return user;
    }catch (error) {
        throw error;
    }
}

export const generateToken = (id: number) => {
    const token = jwt.sign({ id }, process.env.JWT_KEY as string, {
        expiresIn: '5 minutes'
    });

    return "Bearer " + token;
}

export const getAll = async () => {
    try{
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                _count: {select:{ tasks:true }}
            },
            orderBy: { username:'asc' }
        });

        return users;
    }catch (error) {
        throw error;
    }
}

export const getByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        
        return user;
    }catch (error) {
        throw error;
    }
}

export const getById = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        
        return user;
    }catch (error) {
        throw error;
    }
}