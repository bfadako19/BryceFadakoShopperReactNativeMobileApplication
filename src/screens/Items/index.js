import React from 'react';
import {View, Touchable0pacity, Text} from 'react-native'
import styles from './styles';

const ItemsScreen = props => {

  return (
    <View style={styles.container}>
        <View style={styles.bottom}>
            <Touchable0pacity 
            style={styles.bottom}
            onPress={() => console.log('Add Item!')}
            >
            < Text style={styles.buttonText}>Add Item</Text>

            </Touchable0pacity>
        </View>
    </View>
  );
};

export default ItemsScreen;