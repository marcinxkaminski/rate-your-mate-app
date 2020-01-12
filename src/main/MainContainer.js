import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import UserList from '../components/UserList'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



export default class MainContainer extends React.Component{

    static navigationOptions = {
        headerShown: false,
    };

    state = {
        nav : this.props.navigation,
        searchText: ''
    }
    
    render = () => {
        return(
            <View style={styles.container}>
                <UserList nav={this.state.nav}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: '7%',
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
    },
  });
