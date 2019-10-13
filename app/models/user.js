export default class User {
    name;
    img = '/content/img/user.png';
    counter = 0;
    
    constructor(name) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
    }
}