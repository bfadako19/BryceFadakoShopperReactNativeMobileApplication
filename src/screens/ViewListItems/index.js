import React, {useState, useEffect} from 'react';
import {View,FlatList} from 'react-native';
import Item from '../../components/Item';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from "react-native-sqlite-storage";


const shopperDB = openDatabase({ name: 'ShopperDB' });
const itemsTableName = 'items';
const listItemsTableName = 'listItems';
const ViewListItemsScreen = props => {
    const post = props.route.params.post;
    const navigation = useNavigation();
    const [items,setItems] = useState([]);
    useEffect(() => {
        listener = navigation.addListener('focus', () => {
         let results = [];
         shopperDB.transaction(txn => {
         txn.executeSql(
           `SELECT * item.id, name, price, quantity FROM ${itemsTableName},
           ${listItemsTableName} WHERE item.id = items_id and list_id = ${post.id}`,
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
      
    return(
        <View style={styles.container}>
      <View>
        <FlatList
          data={items}
          renderItem={({item}) => <Item post={item}/>}
          keyExtractor={item => item.id}
        />
        
      </View>
    </View>
    );
};

export default ViewListItemsScreen;