import {ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { RequestHandler } from 'express';
import passport from 'passport';
import { getUserById } from '../controllers/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LoginData } from '../models/User';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY as string
}

export const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
    const { id } = payload;

    const user = await getUserById(id);

    if(user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
});

export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('jwt', (err: Error, user: LoginData) => {
        if(err){
            console.log('Failed to Authenticate', err);
            return 
        }

        else if(user){
            req.user = user;
            return next();
        }

        return res.status(401).json({ error:`Unauthorized` });

    });

    authRequest(req, res, next);
}

export const getIdFromToken = (token: string) => {
    try{
        token = token.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_KEY as string);
        return (decoded as JwtPayload).id;
    }catch(error){
        throw error;
    }
}