import EventManager from './../../managers/eventManager.js';
import EventsType from './../../managers/eventsType.js';

import listTpl from './templates/list.js';

export default class UsersListComponent {
    componentName = 'usersList';
    usersService;
    
    getUsers(userId) { 
        return this.usersService
            .getAll()
            .sort((userA, userB) => {
                return userB.counter - userA.counter;
            }).filter((u) => {
                if (u.id === userId) u.isSelected = true;
                else u.isSelected = false;

                return u;
            }); 
    }

    constructor(appDom, usersServices) {        
        this.dom = appDom.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.usersService = usersServices;
    }

    initializeComponent() {
        console.table(this.getUsers());
        
        this.render();

        this.eventsListeners();
    }

    render(userId) {
        this.dom.innerHTML = listTpl(this.getUsers(userId));

        this.itemsBinding();
    }

    eventsListeners() {
        let self = this;

        EventManager.subscribe(EventsType.UserAdded, (userId) => { self.render(userId) });
        EventManager.subscribe(EventsType.UserUpdated, (userId) => { self.render(userId) });
        EventManager.subscribe(EventsType.UserSelected, (userId) => { self.render(userId) });
    }

    itemsBinding() {
        let items = this.dom.querySelectorAll('[data-id]');
        
        items.forEach(element => {
            element.addEventListener('click', (event) => {
                let curEl = event.target;

                let userId = curEl.dataset.id;

                EventManager.publish(EventsType.UserSelected, userId);
            });
        });
    }
}