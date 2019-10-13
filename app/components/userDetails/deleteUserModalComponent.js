import EventManager from '../../managers/eventManager.js';
import EventsType from '../../managers/eventsType.js';

import deleteUserModalTpl from './templates/deleteUserModal.js';

export default class deleteUserModalComponent {
    componentName = 'deleteUserModal';
    usersService;
    
    user = undefined;

    constructor(appDom, usersService) {      
        this.dom = appDom.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.usersService = usersService;
    }

    initializeComponent() {
        this.eventsListeners();
    }

    render() {
        if (this.user !== undefined)
        {
            this.dom.innerHTML = deleteUserModalTpl(this.user);
            this.domModal = this.dom.querySelectorAll('.modal')[0];
            this.modalInstance = M.Modal.init(this.domModal);
            this.modalInstance.open();
            this.btnsBinding();
        }
    }

    eventsListeners() {
        let self = this;

        EventManager.subscribe(EventsType.UserSelectedForDeletion, (user) => { self.showModal(user) });
    }

    showModal(user) {
        this.user = user;
        this.render();
    }

    btnsBinding() {
        let self = this;

        this.btnYes = this.dom.querySelectorAll('[data-action="Yes"]')[0];
        this.btnYes.addEventListener('click', function(event) {
            self.usersService.remove(self.user.id);
            EventManager.unsubscribe(EventsType.UserSelectedForDeletion);
        });

        this.btnNo = this.dom.querySelectorAll('[data-action="No"]')[0];
        this.btnNo.addEventListener('click', function(event) {
            EventManager.unsubscribe(EventsType.UserSelectedForDeletion);
        });
    }
}