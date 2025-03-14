import { Router } from "express";
import { createUser, LoginHandler, getAllUsers, getUserById } from "../controllers/user"
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
        res.status(500).json({ error: 'Something went wrong during the signup!'});
});

userRouter.get('/', jwtStrategyAuth, async (req, res) => {
    const users = await getAllUsers();

    users ? res.status(200).json(users) :
        res.status(500).json({ error: 'Failed to fetch users!'});
});

userRouter.get('/:id', jwtStrategyAuth, async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(parseInt(id as string));

    user ? res.status(201).json({ user }) :
        res.status(500).json({ error: 'Failed to fetch user by userId'});

})

export default userRouter;