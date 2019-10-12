import EventManager from './../../managers/eventManager.js';
import EventsType from './../../managers/eventsType.js';

import UsersService from './../../services/usersService.js';

import listTpl from './templates/list.js';

export default class UsersListComponent {
    componentName = 'usersList';
    mUsersService;
    
    users;

    constructor(appDom) {        
        this.dom = appDom.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.mUsersService = new UsersService();
    }

    initializeComponent() {
        this.users = this.mUsersService.getAll();
        
        console.table(this.users);
        
        this.render();

        this.eventsListeners();
    }

    render() {
        this.dom.innerHTML = listTpl(this.users);
    }

    eventsListeners() {
        let self = this;

        EventManager.subscribe(EventsType.UserAdded, (user) => { self.userListAdd(user) });
    }

    userListAdd(user) {
        this.users.push(user);
        this.render();
    }
}