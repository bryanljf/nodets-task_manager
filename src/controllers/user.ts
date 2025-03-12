import { Prisma } from "@prisma/client";
import { create, generateToken, getAll, getByEmail, getById } from "../services/user"
import { LoginData } from "../models/User"
import { verifyPassword } from "../libs/bcrypt";

export const createUser = async (data: Prisma.UserCreateInput) => {
    try{
        return await create(data);
    } catch (error) {
        console.log('An error has ocurred during the creation of a new user: ', error);
        return false;
    }
}

export const LoginHandler = async (data: LoginData) => {
    const { email, password } = data;        
    const user = await getByEmail(email);

    if(user){
        const passwordResult = await verifyPassword(password, user.password);

        if(passwordResult) {
            let response = {
                user,
                token: generateToken(user.id)
            }
            return response;
        }
    }

    return false;
}

export const getAllUsers = async () => {
    try{
        return await getAll();
    } catch (error) {
        console.log('An error has ocurred getting all users info: ', error);
        return false;
    }
}

export const getUserByEmail = async (email: string) => {
    try{
        return await getByEmail(email);
    } catch (error) {
        console.log('An error has ocurred getting user info: ', error);
        return false;
    }
}

export const getUserById = async (id: number) => {
    try{
        return await getById(id);
    } catch (error) {
        console.log('An error has ocurred getting user info: ', error);
        return false;
    }
}