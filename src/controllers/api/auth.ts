import {NextFunction, Request, Response} from 'express';
import User from '../../models/user';

const login = (req: Request, res: Response) => {
    res.send(req.user);
};

const logout = (req: Request, res: Response) => {
    req.logout();
    res.send({ result: 'ok' });
};

const signup = (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    // @ts-ignore
    User.createUser(username, password, (err: Error, user: any) => {
        if (err) {
               next(err);
        } else {
            res.send(user);
        }
    });
};


const mustAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ result: 'Not authorized'});
    }
    next();
}

export default {
    login,
    logout,
    signup,
    mustAuthenticated
};
