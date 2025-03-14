import { Router } from "express";
import { getIdFromToken, jwtStrategyAuth } from "../middlewares/passport-jwt";
import { assignTaskTo, createTask, getAllTasks } from "../controllers/task";

const taskRouter = Router();

taskRouter.get('/', jwtStrategyAuth, async (req, res) => {
    const token = req.headers.authorization;
    const tasks = await getAllTasks(token as string);

    tasks ? res.status(200).json(tasks) :
        res.status(500).json({ tasks:'No task was found for this user...' });
});

taskRouter.post('/new', jwtStrategyAuth, async (req, res) => {
    const token = req.headers.authorization;
    const task = await createTask(req.body, token as string);

    task ? res.status(201).json(task) :
        res.status(500).json({ error:'Error on creating new task!' });
});

taskRouter.put('/assign', jwtStrategyAuth, async (req, res) => {
    const task = await assignTaskTo(req.body);

    task ? res.status(200).json(task) :
        res.status(500).json({ error:'Error on creating new task!' });
});

export default taskRouter;