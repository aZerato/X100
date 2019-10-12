import UsersListComponent from './components/usersList/usersListComponent.js';

class Main {
    appName;
    appDom;
    
    constructor(appName) {
        this.appName = appName;
        this.appDom = document.querySelectorAll(`[data-component='${this.appName}']`)[0];
    }

    initializeComponents() {

        let usersListComponent = new UsersListComponent(this.appDom);
        usersListComponent.initializeComponent();
        
    }
}

let mainAppX100 = new Main("appx100");
mainAppX100.initializeComponents();