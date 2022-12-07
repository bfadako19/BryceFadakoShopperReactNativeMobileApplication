/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import Router from './src/navigation/Router';
//bcrypt is a secure way to save a password in a database
//its alorithms encrypt a password into a long string of characters,
//called a hash, that is almost impossible to decrypt
//it makes the database more secure-if someone hacks into it,
//he won't be able to steal the user's password
//import bcrypt from 'react-native-bcrypt';
import { openDatabase } from "react-native-sqlite-storage";
import { LogBox } from 'react-native';


const database = require('./src/components/Handlers/database.js');

const shopperDB = openDatabase({ name: 'ShopperDB' });
const usersTableName = 'users';

//create a salt that will be used by bcrypt when creating the hash
//a salt is a random value that will be appended to the the password
//before it's encrypted to make it more secure
//let salt = bcrypt.genSaltSync(10)

const App: () => Node = () => {
  try{
    database.createListsTable();
  } catch(error){
    console.log('Failed to create lists table ' + error);
  }
  try{
    database.createItemsTable();
  } catch(error){
    console.log('Failed to create items table ' + error);
  }
  try{
    database.createListItemsTable();
  } catch(error){
    console.log('Failed to create listItems table ' + error);
  }
  try{
    database.createUsersTable();
  } catch(error){
    console.log('Failed to create users table ' + error);
  }
  /*try{
    //create the hash
    let hash = bcrypt.hashSync('BryceF2001', salt);
    database.addUser('bfadako',hash);
  } catch(error){
    console.log('Failed to create user' + error);
  }
  */
  return <Router />;
  
};
LogBox.ignoreLogs(['Math.random']);
export default App;
