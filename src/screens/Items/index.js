import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const ItemsScreen = props => {
const navigation = useNavigation();

  return (
    <View style={styles.container}>
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