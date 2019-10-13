import BaseModel from "./../models/baseModel.js";

export default class DatabaseManager {
    
    constructor (dbName, dbVersion, dbComment, dbSize, callback) {
        this.db = null;

        if(window.openDatabase){
            this.db = openDatabase(dbName,
                dbVersion, 
                dbComment, 
                dbSize,
                callback
            );
        }
    }

    // tableName (string) : the table name
    // tableProperties (array of string) : [name TYPE, firstname TYPE]
    createTable(tableName, tableProperties) {
        let self = this;

        if(self.db == null)
        {
            console.log('No Database initialized');
            return;
        }
        if (tableName == undefined || tableName == '')
        {
            console.log('No table name specified');
            return;
        }
        if (tableProperties == undefined || tableProperties == '' || tableProperties.length == 0)
        {
            console.log('No properties specified');
            return;
        }

        let request = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableProperties.join(',')})`;
        console.log(request);

        self.db.transaction(function(tx) {
            tx.executeSql(
                request,
                [],
                function(tx) {
                    console.log(`Table ${tableName} sucessfully created`);
                },
                function(e) {
                    console.log(`Table ${tableName} creation problem :  ${e.message}`);
                });
        });
    };

    // tableName (string) : the table name
    dropTable(tableName) {
        var self = this;

        if(self.db == null)
        {
            console.log('No Database initialized');
            return;
        }
        if (tableName == undefined || tableName == '')
        {
            console.log('No table name specified');
            return;
        }

        self.db.transaction(function(tx) {
            tx.executeSql(
                `DROP TABLE ${tableName}`,
                [],
                function(tx) {
                    console.log(`Table ${tableName} sucessfully droped`);
                },
                function(e) {
                    console.log(`Table ${tableName} drop problem :  ${e.message}`);
                }
            );
        });
    };

    // tableName (string) : the table name
    // tableProperties (array of string) : [id, name, firstname]
    get(tableName, tableProperties) {
        let self = this;

        if(self.db == null)
        {
            console.log('No Database initialized');
            return;
        }
        if (tableName == undefined || tableName == '')
        {
            console.log('No table name specified');
            return;
        }

        if (tableProperties == undefined || tableProperties == '' || tableProperties.length == 0)
        {
            return new Promise((resolve) => {
                self.db.readTransaction((tx) => {
                    tx.executeSql(
                        `SELECT * FROM ${tableName}`,
                        [],
                        function(t, data) {
                            var results = [];
                            for(var i = 0; i < data.rows.length; i++){ 
                                results.push(data.rows[i]);
                            }

                            resolve(results);
                        }
                    );
                });
            });         
        }
        else
        {
            return new Promise((resolve) => {
                self.db.transaction((tx) => {
                    tx.executeSql(
                        `SELECT (${tableProperties.join(',')}) FROM ${tableName}`,
                        [],
                        function(t, data) {
                            var results = [];
                            for(var i = 0; i < data.rows.length; i++){ 
                                results.push(data.rows[i]);
                            }
    
                            resolve(results);
                        }
                    );
                });
            });
        }	
    };

    // tableName (string) : the table name
    // tableProperties (array of string) : [id, name, firstname]
    // tableValues (array of value) : [valueOfId, valueOfName, valueOfFirstname]
    insert(tableName, tableProperties, tableValues) {
        let self = this;

        if(self.db == null)
        {
            console.log('No Database initialized');
            return;
        }
        if (tableName == undefined || tableName == '')
        {
            console.log('No table name specified');
            return;
        }
        if (tableProperties == undefined || tableProperties == '' || tableProperties.length == 0)
        {
            console.log('No properties specified');
            return;
        }
        if (tableValues == undefined || tableValues == '' || tableValues.length == 0)
        {
            console.log('No values specified');
            return;
        }
        if(tableProperties.length !== tableValues.length)
        {
            console.log('No missing properties or values');
            return;
        }

        let request = `INSERT INTO ${tableName} (${tableProperties.join(',')}) 
                            VALUES ("${tableValues.join('","')}")`;

        console.log(request);

        self.db.transaction(function(tx) {
            tx.executeSql(
            request,
            [],
            function(tx) {
                console.log(`Table ${tableName} sucessfully inserted`);
            },
            function(e) {
                console.log(`Table ${tableName} insert problem : ${e.message}`);
            });
        });
    };

    // tableName (string) : the table name
    // id : the id of the object
    delete(tableName, id) {
        let self = this;

        if(self.db == null)
        {
            console.log('No Database initialized');
            return;
        }
        if (tableName == undefined || tableName == '')
        {
            console.log('No table name specified');
            return;
        }

        let request = `DELETE FROM ${tableName} WHERE id LIKE "${id}"`;

        console.log(request);

        self.db.transaction(function(tx) {
            tx.executeSql(
            request,
            [],
            function(tx) {
                console.log(`Table ${tableName} sucessfully deleted the entry with id : ${id}`);
            },
            function(e) {
                console.log(`Table ${tableName} delete problem the entry with id : ${id} (message : ${e.message})`);
            });
        });		
    };

    // tableName (string) : the table name
    // values
    // properties
    // where
    update(tableName, properties, types, values, where) {
        let self = this;

        if(self.db == null)
        {
            console.log('No Database initialized');
            return;
        }
        if (tableName == undefined || tableName == '')
        {
            console.log('No table name specified');
            return;
        }
        if (properties == undefined || properties.length == 0)
        {
            console.log('No properties specified');
            return;
        }
        if (types == undefined || types.length == 0)
        {
            console.log('No types specified');
            return;
        }
        if (values == undefined || values.length == 0)
        {
            console.log('No values specified');
            return;
        }
        if (properties.length !== values.length 
            || types.length !== values.length 
            || types.length !== properties.length)
        {
            console.log('No same number of properties/types/values specified');
            return;
        }
        if (where == undefined || where == '')
        {
            console.log('No where condition specified');
            return;
        }

        var request = `UPDATE ${tableName} 
            SET ${values.map((val, index) => { 
                    if (types[index] === BaseModel.Types.text)
                    {
                        return `${properties[index]} = '${values[index]}'`; 
                    }
                    else {
                        return `${properties[index]} = ${values[index]}`; 
                    }
                })}   
            WHERE ${where}`;

        console.log(request);

        self.db.transaction(function(tx) {
            tx.executeSql(
            request,
            [],
            function(tx) {
                console.log(`Table ${tableName} sucessfully updated the entry`);
            },
            function(e) {
                console.log(`Table ${tableName} update problem the entry with the following request : ${request} (message : ${e.message})`);
            });
        });		
    };
}