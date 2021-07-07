import passport from 'passport';
import {Strategy} from 'passport-local';
import User from '../models/user';
import {User as TUser } from '../types/models';
import {CallbackFunction} from '../types/server';

const passportInitialize = () => {
    passport.use(new Strategy(
        function (username: string, password: string, done: CallbackFunction) {
            // @ts-ignore
            User.authorize(username, password, done);
        }
    ));
    // @ts-ignore
    passport.serializeUser(function (user: TUser, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err: Error, user: TUser) {
            done(err, user);
        });
    });
};

export default passportInitialize;
