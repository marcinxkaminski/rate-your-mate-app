import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


export default class UserList extends React.Component{

    static navigationOptions = {
        title: 'MainContainer',
    };

    state = {
        users: [],
        nav: this.props.nav
    }

    componentDidMount = () => {
        this.getUsers();
    }

    getUsers = () => {
        var header = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        var path = 'https://rate-your-mate.herokuapp.com/api/v1/users';
        fetch(path, {
            method: 'GET',
            headers: header,
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            
            console.log(responseJSON); 
            this.setState({users: responseJSON})

        })
        .catch((error) =>{
            console.error(error);
        });
    }

    //https://rate-your-mate.herokuapp.com/api/v1/users

    render(){
        return(
            <TouchableOpacity >
                <FlatList 
                    data={this.state.users}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => this.state.nav.navigate('PropertiesPanel', {user: item})}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => JSON.stringify(item.id)}
                />
            </TouchableOpacity>
        )
    }
}