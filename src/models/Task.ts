import { z } from 'zod';

export const TaskSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    desc: z.string().min(1).max(200),
    status: z.boolean().default(true),
    userId: z.number().int()
});

export type TaskAssignTo = {
    id: number,
    userId: number
}

export type Task = z.infer<typeof TaskSchema>;