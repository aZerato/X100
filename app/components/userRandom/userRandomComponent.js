import EventManager from '../../managers/eventManager.js';
import EventsType from '../../managers/eventsType.js';

import User from './../../models/user.js';

import userRandomTpl from './templates/userRandom.js';

export default class UserRandomComponent {
    componentName = 'userRandom';
    usersService;
    durationSeconds = 10;

    getUsers() { 
        this.users = this.usersService
            .getAll();
        
        this.selectedUser = this.users.length === 0 ? new User('No user') : this.users[0];
    }

    constructor(appDom, usersService) {        
        this.dom = appDom.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.usersService = usersService;
    }

    initializeComponent() {
        this.getUsers()
        
        this.randomUser();

        this.render();
    }

    render() {
        this.dom.innerHTML = userRandomTpl(this.selectedUser);
        
        this.eventsListeners();
    }

    eventsListeners() {
        let self = this;

        //EventManager.subscribe(EventsType.UserAdded, () => { self.cleanForm() });
    }

    randomUser() {
        var self = this;
        
        if (self.users.length === 1) return;

        self.durationSeconds = self.durationSeconds * 100;

        let userSelectorAnimation = setInterval(function(){
            self.selectedUser = self.users[Math.floor(Math.random() * self.users.length)];
            
            self.durationSeconds =  self.durationSeconds - 250/8;
            
            if (self.durationSeconds < 0) {
                clearInterval(userSelectorAnimation);
            }
            
            self.render();
        }, 250);
      }
}