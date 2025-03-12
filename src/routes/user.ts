import { Router } from "express";
import { createUser, LoginHandler, getAllUsers } from "../controllers/user"
import { jwtStrategyAuth } from "../middlewares/passport-jwt";

const userRouter = Router();

userRouter.post('/login', async (req, res) => {
    const response = await LoginHandler(req.body);

    response ? res.status(200).json(response) :
        res.status(500).json({ error: 'Invalid Credentials!' });
});

userRouter.post('/signup', async (req, res) => {
    const user = await createUser(req.body);

    user ? res.status(201).json({ user }) :
        res.status(500).json({ error: 'An error has ocurred during signup! '});
});

userRouter.get('/', async (req, res) => {
    const users = await getAllUsers();

    users ? res.status(200).json(users) :
        res.status(500).json({ error: 'An error has ocurred while getting users! '});
});

export default userRouter;