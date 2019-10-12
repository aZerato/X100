import EventManager from './../managers/eventManager.js';
import EventsType from './../managers/eventsType.js';

import User from './../models/user.js';

export default class UsersService {
    constructor() {
        /*********/
        this.users = Array();
        for(var i = 0; i < 6; i++)
        {
            let user = new User(`toto-${i}`);
            this.users.push(user);
        }
        /*********/
    }

    getAll() {
        return this.users;
    }

    getById(id)
    {
        return this.users.find((u) => { return u.id == id });
    }

    addUser(user) {
        this.users.push(user);

        EventManager.publish(EventsType.UserAdded, user);
    }
}