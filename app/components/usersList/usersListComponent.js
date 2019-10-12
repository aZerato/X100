import UsersService from './../../services/usersService/usersService.js';

import listTpl from './templates/list.js';
import listItemTpl from './templates/listItem.js';

export default class UsersListComponent {
    componentName = 'usersList';
    mUsersService;
    
    constructor() {        
        this.dom = document.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.mUsersService = new UsersService();
    }

    initializeComponent() {
        this.render();
    }

    render() {
        let users = this.mUsersService.getAll();
        console.table(users);

        let rendering = '';
        users.forEach(u => {
            rendering += listItemTpl(u);
        });

        this.dom.innerHTML = rendering;
    }
}