import React, {useState,useEffect} from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import Item from '../../components/Item';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import { openDatabase } from "react-native-sqlite-storage";


const shopperDB = openDatabase({ name: 'ShopperDB' });
const itemsTableName = 'items';

const ItemsScreen = props => {
const navigation = useNavigation();
const [items,setItems] = useState([]);

useEffect(() => {
  listener = navigation.addListener('focus', () => {
   let results = [];
   shopperDB.transaction(txn => {
   txn.executeSql(
     `SELECT * FROM ${itemsTableName}`,
     [],
     (_, res) => {
     let len = res.rows.length;
     console.log('Length of items ' + len);
     if (len>0){
       for(let i = 0; i < len; i++){
         let item = res.rows.item(i);
         results.push({
         id : item.id,
         name: item.name,
         price: item.price,
         quantity: item.quantity,  
         });
       }
       setItems(results);
       /* [
         // {
            id: 1,
            name: book,
            price: 6,
            quantity: 7,
         // },
            {
            id: 2,
            name: socks,
            price: 13.99,
            quantity: 2,
            },
         // {
            id: 3
            name: phone,
            price: 750,
            quantity: 2,
         // },
         ]*/

     } else{
       setItems([]);
     } 
     },
     error => {
     console.log('Error getting items' + error.message);  
     },
   )  
   });
 });
 return listener;
});


  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={items}
          renderItem={({item}) => <Item post={item}/>}
          keyExtractor={item => item.id}
        />
        
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Add Item')}
            >
            < Text style={styles.buttonText}>Add Item</Text>

            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ItemsScreen;