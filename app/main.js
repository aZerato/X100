import DatabaseManager from './managers/databaseManager.js';
import EventManager from './managers/eventManager.js';
import EventTypes from './managers/eventsType.js';

import LoaderComponent from './components/loader/loaderComponent.js';

import UsersService from './services/usersService.js';

import UsersListComponent from './components/usersList/usersListComponent.js';
import UserFormComponent from './components/userForm/userFormComponent.js';
import UserDetailsComponent from './components/userDetails/userDetailsComponent.js';
import UserRandomComponent from './components/userRandom/userRandomComponent.js';

class Main {
    appName;
    appDom;

    constructor(appName) {
        this.appName = appName;
        this.appDom = document.querySelectorAll(`[data-component='${this.appName}']`)[0];
    }

    initializeComponents() {
        LoaderComponent.render(this.appDom);

        let databaseX100 = new DatabaseManager('X100', '0.1', 'nothing', 20000000000, function() {});
        let usersService = new UsersService(databaseX100);

        EventManager.subscribe(EventTypes.UsersServiceReady, () => {
            let usersListComponent = new UsersListComponent(
                this.appDom, 
                usersService);
            usersListComponent.initializeComponent();
            
            let userFormComponent = new UserFormComponent(
                this.appDom, 
                usersService);
            userFormComponent.initializeComponent();
    
            let userDetailsComponent = new UserDetailsComponent(
                this.appDom, 
                usersService);
            userDetailsComponent.initializeComponent();

            let userRandomComponent = new UserRandomComponent(
                this.appDom, 
                usersService);
            userRandomComponent.initializeComponent();
        });
    }
}

let mainAppX100 = new Main("appx100");
mainAppX100.initializeComponents();