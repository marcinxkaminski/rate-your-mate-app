import React from 'react';
import {StyleSheet, Image, Text, View, FlatList} from 'react-native';
import Skill from "./Skill";

export const PropertiesPanel = (props) => {


    const user = props.navigation.getParam("user", "NoData");
    const categories = Object.values(user.categories);
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
                    <Text style={styles.stars}>{user.stars}</Text>
                    <Text style={styles.city}>{user.city}</Text>
                </View>
                <View style={styles.skillsStack}>
                    <FlatList
                        data={categories}
                        renderItem={({item}) => <Skill stars={item.stars} name={item.name}/>}
                        keyExtractor={item => item.id}/>
                </View>
            </View>
        </View>
    )
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
        borderWidth: 1,
        flexDirection: 'column',
        flex: 1,
    },
    userInfoStack: {
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 2,
    },
    skillsStack: {
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingTop: '3%',
        paddingHorizontal: '5%',
        flex: 3,
        backgroundColor: '#211746'
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
        fontWeight: 'bold'

    },
    city: {
        color: '#430098',
        fontSize: 20,
        fontWeight: 'bold'

    }

});

export default PropertiesPanel;
