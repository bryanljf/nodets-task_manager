import { z } from 'zod';
import { TaskSchema } from "./Task"

const UserSchema = z.object({
    id: z.number().int(),
    username: z.string().min(1, 'Username is necessary!'),
    email: z.string().email('Invalid E-mail, please try again!'),
    password: z.string().min(6, 'Password must have at least 6 characters!'),
    tasks: z.array(TaskSchema),
    createdAt: z.date(),
    updatedAt: z.date()
});

export type LoginData = {
    email: string,
    password: string
}

export type User = z.infer<typeof UserSchema>;