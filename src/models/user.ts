import * as crypto from 'crypto';
import async from 'async';
import connectedMongo from '../libs/mongo';
import {CallbackFunction} from '../types/server';

import appLogger from '../libs/appLogger';

const log = appLogger(module);

const schema = new connectedMongo.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
});

/**
 * We will keep passwords at encripted form
 * @param password
 * @returns {*}
 */
schema.methods.encryptPassword = function (password) {
    const User: any = this;
    return crypto.createHmac('sha256', User.salt).update(password).digest('hex');
};

/**
 *  Virtual field in DB
 *  it do not exist, but it can be generated by set/get methods
 */
schema.virtual('password')
    .set(function (password: string) {
        // @ts-ignore
        const User: any = this;
        User._plainPassword = password;
        User.salt = Math.random() + '';
        User.hashedPassword = User.encryptPassword(password);
    })
    .get(function () {
        // @ts-ignore
        const self: any = this;
        return self._plainPassword;
    });

/**
 * Check encripted passwords with example in MongoDB
 * @param password
 * @returns {boolean|*}
 */
schema.methods.checkPassword = function (password) {
    const User: any = this;

    return User.encryptPassword(password) === User.hashedPassword;
};

/**
 * Perform authorization activity
 * @param username
 * @param password
 * @param callback
 */
schema.statics.authorize = function (username, password, callback) {
    log.debug(`REQ: Username: ${username}, password: ${password}`);
    const User = this;

    async.waterfall([
        function (callback: CallbackFunction) {
            User.findOne({username: username}, callback);
        },
        function (user: any, callback: CallbackFunction) {
            if (user) {
                log.debug(`DB: Username: ${user.username}, id: ${user._id}, hash: ${user.hashedPassword}`);
                // registered user has found
                if (user.checkPassword(password)) {
                    // the received password match to saved one
                    callback(null, user);
                } else {
                    // the received password doesn't match saved one
                    callback(new Error('Authorization error'), null);
                }
            } else {
                callback(new Error('No user found'), null);
            }
        }
    ], callback);
};

/**
 * Perform create activity
 * @param username
 * @param password
 * @param callback
 */
schema.statics.createUser = function (username, password, callback) {
    const User = this;

    async.waterfall([
        function (callback: CallbackFunction) {
            User.findOne({username: username}, callback);
        },
        function (user: any, callback: CallbackFunction) {
            if (!user) {
                // create new user (user with such nicknames didn't found in database).
                let newUser = new User({username: username, password: password});
                newUser.save(function (err: Error) {
                    if (err) return callback (err, null);
                    callback(null, newUser);
                });
            } else {
                callback(new Error('User has already existed'), null);
            }
        }
    ], callback);
};

const Model = connectedMongo.model('user', schema);

export default Model;