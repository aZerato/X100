import EventManager from '../../managers/eventManager.js';
import EventsType from '../../managers/eventsType.js';

import detailsTpl from './templates/details.js';
import defaultDetailsTpl from './templates/defaultDetails.js';

import DeleteUserModalComponent from './deleteUserModalComponent.js';

export default class UserDetailsComponent {
    componentName = 'userDetails';
    usersService;
    
    user = undefined;

    constructor(appDom, usersService) {        
        this.dom = appDom.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.usersService = usersService;
    }

    initializeComponent() {
        this.render();

        this.eventsListeners();
    }

    render() {
        if (this.user !== undefined)
        {
            this.dom.innerHTML = detailsTpl(this.user);
            this.btnsBinding();
        }
        else {
            this.dom.innerHTML = defaultDetailsTpl;
        }
    }

    eventsListeners() {
        let self = this;

        EventManager.subscribe(EventsType.UserAdded, (userId) => { self.userSelected(userId) });
        EventManager.subscribe(EventsType.UserSelected, (userId) => { self.userSelected(userId) });
        EventManager.subscribe(EventsType.UserUpdated, (userId) => { self.userSelected(userId) });
        EventManager.subscribe(EventsType.UserDeleted, () => { 
            self.user = undefined;
            self.render() 
        });
    }

    userSelected(userId) {
        this.user = this.usersService.getById(userId);
        this.render();
    }

    btnsBinding() {
        let self = this;

        this.btnRemoveCounter = this.dom.querySelectorAll('[data-action="removeCount"]')[0];
        this.btnAddCounter = this.dom.querySelectorAll('[data-action="addCount"]')[0];
        
        this.btnRemoveCounter.addEventListener('click', function(event) {
            if (self.user.counter === 0) return;

            self.user.counter--;
            self.usersService.update(self.user);
        });

        this.btnAddCounter.addEventListener('click', function(event) {
            self.user.counter++;
            self.usersService.update(self.user);
        });

        this.btnDeleteUser = this.dom.querySelectorAll('[data-action="deleteUser"]')[0];
        this.btnDeleteUser.addEventListener('click', function(event) {
            let deleteUserModalComponent = new DeleteUserModalComponent(
                self.dom, 
                self.usersService);
            deleteUserModalComponent.initializeComponent();

            EventManager.publish(EventsType.UserSelectedForDeletion, self.user);
        });
    }
}