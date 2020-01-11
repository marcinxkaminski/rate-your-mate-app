import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import * as Font from 'expo-font';
import { AppLoading } from 'expo';


export default class UserList extends React.Component{

    state = {
        users: [],
        nav: this.props.nav,
        dataLoaded: false
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

    fetchFonts = () => {
        return Font.loadAsync({
          'MerriweatherSans': require('../../assets/fonts/Questrial-Regular.ttf'),
        });
    };

    render = () => {
        if(this.state.dataLoaded == false){
            return(
                <AppLoading
                    startAsync={this.fetchFonts}
                    onFinish={() => this.setState({dataLoaded: true})}
                />
            )
        }
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
                                <Icon name="star-outline" size={35} color="#79589F"/>
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
        width: '100%',
        flex: 1,
        flexDirection: 'column',
    },
    userLabelContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingHorizontal: '5%'
    },
    nameText: {
        fontSize: 15,
        fontFamily: "MerriweatherSans",
        fontWeight: 'bold'
    },
    positionText: {
        fontSize: 13
    },
    imageContainer: {
        width: '25%',
        padding: 5,
        alignItems: 'center'
    },
    infoContainer: {
        width: '50%',
        padding: 5,
        paddingTop: 13,
        paddingLeft: 10,
        paddingRight: 15,
        justifyContent: 'flex-start'
    },
    starsContainer: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    starText: {
        fontSize: 20
    }
  });
