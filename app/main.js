import UsersListComponent from './components/usersList/usersListComponent.js';

class Main {
    componentName;
    constructor(componentName) {
        this.componentName = componentName;
    }

    initializeComponents() {
        let usersListComponent = new UsersListComponent();
        usersListComponent.initializeComponent();
    }
}

let mainAppX100 = new Main("appx100");
mainAppX100.initializeComponents();