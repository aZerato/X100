import BaseModel from './baseModel.js';

export default class User extends BaseModel {
    name = 'John Doe';
    img = '/content/img/user.png';
    counter = 0;
    
    static Properties = {
        id: 'id',
        name: 'name',
        img: 'img',
        counter: 'counter',
    };

    constructor(name) {
        super();

        this.name = name;
    }
}