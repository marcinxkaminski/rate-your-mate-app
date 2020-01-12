import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Dropdown } from 'react-native-material-dropdown';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';


export default class UserList extends React.Component{

    state = {
        users: [],
        nav: this.props.nav,
        dataLoaded: false,
        searchModal: false,
        categories: [
            {
                name: 'Categories',
                id: 0, 
                children: [
                    {
                        name: 'java',
                        id: 15,
                      },
                      {
                        name: 'javascript',
                        id: 16,
                      },
                ] 
            }
            ],
        selectedItems: [],
        filtredUsers: [],
        sort: 'descendingly',
    }

    componentDidMount = () => {
        this.getUsers();
        this.getCategories();
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
            this.setState({users: Object.values(responseJSON), filtredUsers: Object.values(responseJSON)})
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    getCategories = () => {
        var header = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        var path = 'http://rate-your-mate.herokuapp.com/api/v1/categories';
        fetch(path, {
            method: 'GET',
            headers: header,
        })
        .then((response) => {return response.json()})
        .then((responseJSON) => {
            var obj = [
                {
                    name: 'Categories',
                    id: 0, 
                    children: responseJSON
                }   
            ]

            this.setState({categories: obj})
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    fetchFonts = () => {
        return Font.loadAsync({
          'MerriweatherSans': require('../../assets/fonts/SquadaOne-Regular.ttf'),
        });
    };

    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
      };

    firstSearch = () => {
        //this.resetFitredUsers();
        this.setState({searchModal: true})
    }

    resetFitredUsers = () => {
        this.setState({filtredUsers: this.state.users});
    }

    filterUsers = () => {
        console.log(this.state.selectedItems.length)
        if(this.state.selectedItems.length == 0){
            this.setState({searchModal: false, filtredUsers: this.state.users});
            return;
        }
        var users = this.state.users;
        var currentCategories = this.getFilterdCategories();
        var result = [];
        users.forEach(user => {
            var categories = this.prepareCategoris(Object.values(user.categories))
            if(this.ifCommonElement(categories, currentCategories) == true){
                result.push(user)
            }
        });
        this.setState({searchModal: false, filtredUsers: this.sortBobs(result)});
    }

    sortBobs = (filterUsers) => {
        return filterUsers.sort(this.descending);
    }

    descending = ( a, b ) => {
        if(this.state.sort == 'descendingly'){
            if ( a.stars > b.stars ){
            return -1;
            }
            if ( a.stars < b.stars ){
            return 1;
            }
            return 0;
        }
        if ( a.stars < b.stars ){
            return -1;
        }
        if ( a.stars > b.stars ){
            return 1;
        }
        return 0;
      }

    getFilterdCategories = () => {
        var result = []
        this.state.categories[0].children.forEach(ele => {
            if(this.state.selectedItems.includes(ele.id)){
                result.push(ele.name);
            }
        })
        return result;
    }

    prepareCategoris = (cat) => {
        var result = [];
        cat.forEach(category => {
            result.push(category.name);
        })
        return result;
    }

    ifCommonElement(array1, array2) { 
        for(let i = 0; i < array1.length; i++) { 
            for(let j = 0; j < array2.length; j++) { 
                if(array1[i] === array2[j]) { 
                    return true; 
                } 
            } 
        } 
        return false;  
    } 

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
            <View style={{height: '75%', width: '100%'}}>
                <FlatList 
                    style={styles.listContainer}
                    data={this.state.filtredUsers}
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
                <TouchableOpacity style={styles.searchBox} onPress={this.firstSearch}>
                    <Icon name="cloud-search"  size={35} color="white" />
                </TouchableOpacity>
                <Modal 
                    isVisible={this.state.searchModal}
                    style={styles.modal}
                    backdropColor={'rgba(52, 52, 52, 0.5)'}
                    backdropOpacity={1}
                    animationIn={'bounceInDown'}
                    animationOut={'bounceOutUp'}
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={500}
                    backdropTransitionOutTiming={500}>
                    <View style={{ flex: 1, borderRadius: 10, height: '100%', backgroundColor: '#FBFBFD', padding: 10}}>
                        <View style={{height: '50%'}}>
                        <SectionedMultiSelect
                            items={this.state.categories}
                            uniqueKey="id"
                            subKey="children"
                            selectText="Choose some things..."
                            showDropDowns={false}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={this.state.selectedItems}
                        />
                        </View>
                        <View style={{height: '28%', paddingHorizontal: 5}}>
                            <Dropdown
                                label='Sort'
                                data={[{
                                    value: 'ascending',
                                }, {
                                    value: 'descendingly',
                                }]}
                                onChangeText={(value) => this.setState({sort: value}) }
                            />
                        </View>

                        <View style={{position: 'absolute', bottom: 5, right: '35%', shadowColor: '#430098',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.7,
                            shadowRadius: 5,}}>
                            <TouchableOpacity onPress={this.filterUsers} style={styles.modalSearchBox}>
                                <Icon name="cloud-search"  size={35} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    },
    searchBox: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:80,
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 20,
        height:80,
        backgroundColor:'#79589F',
        borderRadius:100,
        shadowColor: '#430098',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.7,
        shadowRadius: 7,
    },
    modalSearchBox: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:80,
        height:80,
        backgroundColor:'#79589F',
        borderRadius:100,
    },
    modal: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        marginHorizontal: '10%',
        marginTop: '40%',
        borderRadius: 5,
        alignItems: undefined,
        justifyContent: undefined,
    }
  });
