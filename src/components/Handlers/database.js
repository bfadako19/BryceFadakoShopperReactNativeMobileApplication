// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const shopperDB = openDatabase({ name: 'ShopperDB' });
const listsTableName = 'lists';
const itemsTableName = 'items';
const listItemsTableName = 'listItems';
const usersTableName = 'users';

module.exports = {
    //declare function that will create the lists table 
    createListsTable: async function () {
        //declare a transaction that will execute a SQL statement
        (await shopperDB).transaction(txn => {
            //execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${listsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    store TEXT,
                    date TEXT

                );`,
                // arguments needed when using an SQL prepared statement
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log('List table created sucessfully');
                },
                error => {
                    console.log('Error creating lists table ' + error.message);
                },
            );
        });
    },

    //declare function that will insert a row into the lists table
    addList: async function (name, store, date) {
        //declare a transaction that will execute a SQL statement 
        (await shopperDB).transaction(txn => {
            //execute the SQL
            txn.executeSql(
                `INSERT INTO ${listsTableName} (name, store, date) VALUES ("${name}","${store}","${date}")`,
                //arguments passed when using SQL prepared statements
                [],
                //callback fucntion to handle results of SQL query
                () => {
                    console.log(name + " added sucessfully")
                },
                error => {
                    console.log('Error adding list' + error.message);
                },
            );

        });
        
    },

createItemsTable: async function () {
    (await shopperDB).transaction(txn => {
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS ${itemsTableName}(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT(100),
                price REAL,
                quantity INTEGER

            );`,
            [],
            () => {
                console.log('Items table created sucessfully');
            },
            error => {
                console.log('Error creating Items table ' + error.message);
            },
        );
    });
},


addItem: async function (name, price, quantity) {
    
    (await shopperDB).transaction(txn => {
        txn.executeSql(
            `INSERT INTO ${itemsTableName} (name, price, quantity) VALUES ("${name}",${price},${quantity})`,
            [],
            
            () => {
                console.log(name + " added sucessfully")
            },
            error => {
                console.log('Error adding item' + error.message);
            },
        );

    });
    
},
createListItemsTable: async function () {
(await shopperDB).transaction(txn => {
    txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ${listItemsTableName}(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            list_id INTEGER,
            items_id INTEGER

        );`,
        [],
        () => {
            console.log('listItems table created sucessfully');
        },
        error => {
            console.log('Error creating listItems table ' + error.message);
        },
    );
});
}, 
addListItem: async function (list_id,items_id) {
    
    (await shopperDB).transaction(txn => {
        txn.executeSql(
            `INSERT INTO ${listItemsTableName} (list_id,items_id) VALUES (${list_id},${items_id})`,
            [],
            
            () => {
                console.log("list item added sucessfully")
            },
            error => {
                console.log('Error adding item' + error.message);
            },
        );

    });
    
},
createUsersTable: async function () {  
    (await shopperDB).transaction(txn => {
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS ${usersTableName}(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                password TEXT

            );`,
            [],
            () => {
                console.log('Users table created sucessfully');
            },
            error => {
                console.log('Error creating users table ' + error.message);
            },
        );
    });
},

addUser: async function (username, password) {
    (await shopperDB).transaction(txn => {
        txn.executeSql(
            `INSERT INTO ${usersTableName} (username, password) VALUES ("${username}","${password}")`,
            [],
            () => {
                console.log(username +" " + password + " added sucessfully")
            },
            error => {
                console.log('Error adding user' + error.message);
            },
        );

    });
    
},
};