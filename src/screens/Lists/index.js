import React from 'react';
import {View, Touchable0pacity, Text} from 'react-native'
import styles from './styles';

const ListsScreen = props => {

  return (
    <View style={styles.container}>
        <View style={styles.bottom}>
            <Touchable0pacity 
            style={styles.bottom}
            onPress={() => console.log('Add List!')}
            >
            < Text style={styles.buttonText}>Add List</Text>

            </Touchable0pacity>
        </View>
    </View>
  );
};

export default ListsScreen;