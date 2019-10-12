import UsersService from './../../services/usersService/usersService.js';

import listTpl from './templates/list.js';

export default class UsersListComponent {
    componentName = 'usersList';
    mUsersService;
    
    constructor(appDom) {        
        this.dom = appDom.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.mUsersService = new UsersService();
    }

    initializeComponent() {
        this.render();
    }

    render() {
        let users = this.mUsersService.getAll();
        console.table(users);

        this.dom.innerHTML = listTpl(users);
    }
}