import EventManager from './../../managers/eventManager.js';
import EventsType from './../../managers/eventsType.js';

import listTpl from './templates/list.js';

export default class UsersListComponent {
    componentName = 'usersList';
    usersService;
    
    get users() { 
        return this.usersService
            .getAll()
            .sort((userA, userB) => {
                return userB.counter - userA.counter;
            }); 
    }

    constructor(appDom, usersServices) {        
        this.dom = appDom.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.usersService = usersServices;
    }

    initializeComponent() {
        console.table(this.users);
        
        this.render();

        this.eventsListeners();
    }

    render() {
        this.dom.innerHTML = listTpl(this.users);

        this.itemsBinding();
    }

    eventsListeners() {
        let self = this;

        EventManager.subscribe(EventsType.UserAdded, () => { self.render() });
        EventManager.subscribe(EventsType.UserUpdated, () => { self.render() });
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