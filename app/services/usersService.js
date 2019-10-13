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

    add(user) {
        this.users.push(user);

        EventManager.publish(EventsType.UserAdded, user.id);
    }

    update(user) {
        this.users.map((u) => {
            if (u.id === user.id)
            {
                u.img = user.img;
                u.counter = user.counter;
                EventManager.publish(EventsType.UserUpdated, user.id);
                return;
            }
        });
    }
}