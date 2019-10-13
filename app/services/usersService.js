import EventManager from './../managers/eventManager.js';
import EventsType from './../managers/eventsType.js';

import User from './../models/user.js';

export default class UsersService {
    tableName = 'users';
    databaseX100;

    constructor(databaseX100) {
        this.databaseX100 = databaseX100;

        this.init();
    }

    init() {
        this.databaseX100.createTable(`${this.tableName}`, 
            [`${User.Properties.id} ${User.Types.text} ${User.Rules.primaryKey}`,
            `${User.Properties.name} ${User.Types.text} ${User.Rules.notNull}`,
            `${User.Properties.img} ${User.Types.text} ${User.Rules.notNull}`,
            `${User.Properties.counter} ${User.Types.integer} ${User.Rules.notNull}`]);

        this.databaseX100.get(this.tableName).then((results) => {
            this.users = results;
            EventManager.publish(EventsType.UsersServiceReady);
        });
    }

    getAll() {
        return this.users;
    }

    getById(id)
    {
        return this.users.find((u) => { return u.id == id });
    }

    add(user) {
        this.databaseX100.insert(this.tableName, 
            [`${User.Properties.id}`,
            `${User.Properties.name}`,
            `${User.Properties.img}`,
            `${User.Properties.counter}`], 
            [user.id, user.name, user.img, user.count]);
        
        this.users.push(user);

        EventManager.publish(EventsType.UserAdded, user.id);
    }

    remove(userId) {
        this.databaseX100.delete(this.tableName, 
            userId);
        
        this.users = this.users.filter(u => { if (u.id !== userId) return u; });

        EventManager.publish(EventsType.UserDeleted);
    }

    update(user) {
        this.users.map((u) => {
            if (u.id === user.id)
            {
                this.databaseX100.update(this.tableName,
                    [`${User.Properties.img}`,
                        `${User.Properties.counter}`], 
                    [`${User.Types.text}`,
                        `${User.Types.integer}`], 
                    [user.img,
                        user.counter],
                    [`id LIKE '${u.id}'`]);

                u.img = user.img;
                u.counter = user.counter;
                EventManager.publish(EventsType.UserUpdated, user.id);
                return;
            }
        });
    }
}