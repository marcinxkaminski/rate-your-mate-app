import React, {useState} from 'react';
import {StyleSheet, Image, Text, View, FlatList, TouchableWithoutFeedback, Linking} from 'react-native';
import Skill from "./Skill";
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AddCategorry from "./AddCategory";

export const PropertiesPanel = (props) => {


    const user = props.navigation.getParam("user", "NoData");
    const categories = Object.values(user.categories);
    const [categoriesState, setCategories] = useState(categories);
    return (
        <View style={styles.center}>
            <View style={styles.marginsStack}>
                <View style={styles.userInfoStack}>
                    <View style={styles.avatarBox}>
                        <Image
                            style={styles.avatar}
                            source={{uri: user.avatar}}
                        />
                    </View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.position}>{user.position}</Text>

                    <View style={styles.starPane}>
                        <MaterialIcon name="star-outline" size={35} color="#79589F"/>
                        <Text style={styles.stars}>{user.stars}</Text>
                    </View>
                    <View style={styles.starPane}>
                        <MaterialIcon name="home-city-outline" size={35} color="#79589F"/>
                        <Text style={styles.city}>{user.city}</Text>
                    </View>
                </View>
                <View style={styles.buttonsPane}>
                    <TouchableWithoutFeedback onPress={() => openLinkedIn()}>
                        <View style={styles.linkButton}>
                            <Icon name="linkedin" size={45} color="#FBFBFD"/>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => openGitHub()}>
                        <View style={styles.linkButton}>
                            <Icon name="github" size={45} color="#FBFBFD"/>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
                <View style={styles.skillsStack}>
                    <FlatList
                        data={categoriesState}
                        renderItem={({item}) =>
                            <TouchableWithoutFeedback onPress={() => {
                                showPIP(item.id, user.id, setCategories)
                            }

                            }>
                                <View>
                                    <Skill stars={item.stars}
                                           name={item.name[0].toUpperCase() + item.name.slice(1)}/>
                                </View>
                            </TouchableWithoutFeedback>}
                        keyExtractor={item => item.id}
                        ListFooterComponent={<AddCategorry userId={user.id} setCategories={setCategories}></AddCategorry>}
                    />

                </View>
            </View>
        </View>
    )
};

export const starCategory = (category, user, setCategories) => {
    fetch('http://rate-your-mate.herokuapp.com/api/v1/stars', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                id: user,
            },
            category: {
                id: category,
            }
        }),
    }).then(() => upadateCategories(setCategories, user));
};


const upadateCategories = (setCategories, userId) => {
    var header = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });
    var path = 'http://rate-your-mate.herokuapp.com/api/v1/users';
    fetch(path, {
        method: 'GET',
        headers: header,
    })
        .then((response) => {
            return response.json()
        })
        .then((responseJSON) => {
            console.log("response");
            console.log(responseJSON);
            setCategories(Object.values(responseJSON[userId].categories));

        })
        .catch((error) => {
            console.error(error);
        });
};


const showPIP = (categry, user, setCategories) => {
    console.log("Press");
    starCategory(categry, user, setCategories);
};

const openLinkedIn = () => {
    Linking.openURL("https://www.linkedin.com/in/mi%C5%82osz-blasiak-b97613179/").catch(err => console.error("Couldn't load page", err));
};
const openGitHub = () => {
    Linking.openURL("https://github.com/mblasiak").catch(err => console.error("Couldn't load page", err));
};

PropertiesPanel.navigationOptions = {
    headerShown: false,
};


const styles = StyleSheet.create({
    center: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'

    },
    marginsStack: {
        flexDirection: 'column',
        flex: 1,
    },
    userInfoStack: {
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    skillsStack: {
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingTop: 35,
        paddingHorizontal: '5%',
        flex: 1,
        backgroundColor: '#211746',
        zIndex: -1,

    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,

    },
    avatarBox: {
        marginTop: 20,
        marginBottom: 10,
        width: 100,
        height: 100,
        borderRadius: 100,
        shadowColor: '#430098',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.7,
        shadowRadius: 10,
    },
    name: {
        color: '#430098',
        fontSize: 25,
        fontWeight: 'bold'
    },
    position: {
        color: '#430098',
        fontSize: 20,
        marginBottom: 20
    },
    stars: {
        color: '#430098',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,

    },
    starPane: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '35%',
        justifyContent: 'flex-start'
        // borderWidth: 1,
    },
    city: {
        color: '#430098',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,

    },

    buttonsPane: {
        flexDirection: 'row',
        height: 0,
        justifyContent: 'space-around',
        backgroundColor: '#79589F',
    },
    linkButton: {
        height: 50,
        bottom: 25,
        width: '35%',
        borderRadius: 100,
        backgroundColor: '#79589F',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderColor: '#FBFBFD',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#430098',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 13,

    }

});

export default PropertiesPanel;
