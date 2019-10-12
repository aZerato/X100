import EventManager from '../../managers/eventManager.js';
import EventsType from '../../managers/eventsType.js';

import User from '../../models/user.js';

import detailsTpl from './templates/details.js';

export default class UserDetailsComponent {
    componentName = 'userDetails';
    usersService;
    
    user;

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
        }
        else {
            this.dom.innerHTML = "aucun utilisateur selectionné";
        }
    }

    eventsListeners() {
        let self = this;

        EventManager.subscribe(EventsType.UserSelected, (userId) => { self.userSelected(userId) });
    }

    userSelected(userId) {
        this.user = this.usersService.getById(userId);
        this.render();
    }
}