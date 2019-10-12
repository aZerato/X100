import UsersService from './../../services/usersService/usersService.js';

export default class UsersListComponent {
    mUsersService;
    
    constructor() {
        this.mUsersService = new UsersService();
    }

    initializeComponent() {
        console.table(this.mUsersService.getAll());
    }
}