import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import UserList from '../components/UserList'
import { TextInput } from 'react-native-gesture-handler';


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
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchBox}
                        onChangeText={text => this.setState({searchText: text})}
                        value={this.state.searchText}
                        placeholder="Search something"
                    />
                </View>
                <UserList nav={this.state.nav}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    searchContainer: {
        backgroundColor: '#79589F',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        marginTop: 100,
        height: '30%',
        width: '100%',
    },
    searchBox: {
        backgroundColor: 'white',
        width: '90%',
        padding: 5,
        paddingLeft: 10,
        borderRadius: 10,
        marginTop: 5,
        fontSize: 15
    },
  });
