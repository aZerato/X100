import UsersListComponent from './components/usersList/usersListComponent.js';

class Main {
    appName;
    constructor(appName) {
        this.appName = appName;
    }

    initializeComponents() {

        let usersListComponent = new UsersListComponent();
        usersListComponent.initializeComponent();
        
    }
}

let mainAppX100 = new Main("appx100");
mainAppX100.initializeComponents();