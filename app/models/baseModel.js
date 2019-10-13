export default class BaseModel {
    id;

    static Properties = {};
    static Types = {
        text: 'TEXT',
        integer: 'INTEGER'
    };
    static Rules = {
        primaryKey: 'PRIMARY KEY',
        notNull: 'NOT NULL'
    };
    
    constructor() {
        this.id = Math.random().toString(36).substr(2, 9);
    }
}