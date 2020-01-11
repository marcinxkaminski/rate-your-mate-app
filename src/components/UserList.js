import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


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
        var path = 'http://rate-your-mate.herokuapp.com/api/v1/users';
        fetch(path, {
            method: 'GET',
            headers: header,
        })
        .then((response) => {return response.json()})
        .then((responseJSON) => {
            
            console.log(responseJSON); 
            this.setState({users: Object.values(responseJSON)})

        })
        .catch((error) =>{
            console.error(error);
        });
    }

    render(){
        return(
            <View >
                <FlatList 
                    style={styles.listContainer}
                    data={this.state.users}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.userLabelContainer}
                            onPress={() => this.state.nav.navigate('PropertiesPanel', {user: item})}
                            >  
                            <View style={styles.imageContainer}>
                                <Image
                                    style={{width: 60, height: 60, borderRadius: 30}}
                                    source={{uri: item.avatar}}
                                />
                             </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.nameText}>{item.name}</Text>
                                <Text style={styles.positionText}>{item.position}</Text>
                            </View>
                            <View style={styles.starsContainer}>
                                <Text style={styles.starText}>{item.stars}</Text> 
                                <Icon name="star-outline" size={35} color="#430098"/>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => JSON.stringify(item.id)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        width: '90%',
        flex: 1, 
        flexDirection: 'column',
        borderWidth: 1
    },
    userLabelContainer: {
        flex: 1, 
        flexDirection: 'row',
        borderWidth: 1
    },
    nameText: {
        fontSize: 15
    },
    positionText: {
        fontSize: 13
    },
    customContainer: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 15,
        borderWidth: 1,
        justifyContent: 'flex-start'
    },
    imageContainer: {
        width: '25%',
        padding: 5,
        borderWidth: 1,
        alignItems: 'center'
    },
    infoContainer: {
        width: '50%',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 15,
        justifyContent: 'flex-start'
    },
    starsContainer: {
        width: '25%',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    starText: {
        fontSize: 20
    }
  });
  