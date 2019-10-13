import EventManager from '../../managers/eventManager.js';
import EventsType from '../../managers/eventsType.js';

import User from '../../models/user.js';

import formTpl from './templates/form.js';

export default class UserFormComponent {
    componentName = 'userForm';
    usersService;
    
    users;

    constructor(appDom, usersService) {        
        this.dom = appDom.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.usersService = usersService;
    }

    initializeComponent() {
        this.render();
    }

    render() {
        this.dom.innerHTML = formTpl;
        
        this.formBinding();
        
        this.eventsListeners();
    }

    eventsListeners() {
        let self = this;

        EventManager.subscribe(EventsType.UserAdded, () => { self.cleanForm() });
    }

    formBinding() {
        let self = this;
        
        this.form = this.dom.querySelectorAll('form')[0];
        this.submitBtn = this.form.querySelectorAll('button[type="submit"]')[0];

        this.inputUserName = this.form.querySelectorAll('input[name="user.name"]')[0];

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            let user = new User(self.inputUserName.value);
            self.usersService.add(user);
        });

        this.submitBtn.addEventListener('click', () => {
            
        });
    }

    cleanForm() {
        this.inputUserName.value = '';
    }
}