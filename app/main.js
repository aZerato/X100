import UsersService from './services/usersService.js';

import UsersListComponent from './components/usersList/usersListComponent.js';
import UserFormComponent from './components/userForm/userFormComponent.js';
import UserDetailsComponent from './components/userDetails/userDetailsComponent.js';

class Main {
    appName;
    appDom;

    constructor(appName) {
        this.appName = appName;
        this.appDom = document.querySelectorAll(`[data-component='${this.appName}']`)[0];
    }

    initializeComponents() {
        let usersService = new UsersService();

        let usersListComponent = new UsersListComponent(this.appDom, usersService);
        usersListComponent.initializeComponent();
        
        let userFormComponent = new UserFormComponent(this.appDom, usersService);
        userFormComponent.initializeComponent();

        let userDetailsComponent = new UserDetailsComponent(this.appDom, usersService);
        userDetailsComponent.initializeComponent();
    }
}

let mainAppX100 = new Main("appx100");
mainAppX100.initializeComponents();