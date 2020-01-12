import React, { version } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import UserList from '../components/UserList'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'




export default class MainContainer extends React.Component{

    static navigationOptions = {
        headerShown: false,
        dataLoaded: false,
    };



    state = {
        nav : this.props.navigation,
        searchText: ''
    }

    fetchFonts = () => {
        return Font.loadAsync({
          'MerriweatherSans': require('../../assets/fonts/SquadaOne-Regular.ttf'),
        });
    };
    
    render = () => {
        if(this.state.dataLoaded==false){
            return(
                <AppLoading
                    startAsync={this.fetchFonts}
                    onFinish={() => this.setState({dataLoaded: true})}
                />
            )
        }
        return(
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 10, width: '90%', justifyContent: 'flex-end'}}>
                        <View style={{paddingRight: '59%'}}>
                            <Text style={{fontFamily: 'MerriweatherSans', fontSize: 30, fontWeight: 'bold', color: 'white'}}>RYR</Text>
                        </View>
                        <MaterialIcon style={{paddingRight: 10}} name="podium" size={35} color="white" onPress={()=>this.props.navigation.navigate('Ranking')}/>
                        <Icon name="user-astronaut" size={35} color="white"/>
                    </View>
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
    },
    searchContainer: {
        backgroundColor: '#79589F',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        height: '25%',
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
