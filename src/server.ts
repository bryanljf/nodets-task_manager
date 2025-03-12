import express, { urlencoded } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import { jwtStrategy } from './middlewares/passport-jwt';
import userRouter from './routes/user';

const server = express();

server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended:true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));
passport.use(jwtStrategy);
server.use(passport.initialize());
server.use('/users', userRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server running on: http://localhost:${process.env.PORT}`);
})