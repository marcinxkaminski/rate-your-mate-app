import {StyleSheet, View, TouchableWithoutFeedback} from "react-native";
import React from "react";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const AddCategorry = ({userId}) => {
    return (
        <TouchableWithoutFeedback onPress={() => addCattegory(userId)}>
            <View style={styles.addButton}>
                <MaterialIcon name="plus" size={55} color="#FBFBFD"/>
            </View>
        </TouchableWithoutFeedback>
    )
};


const addCattegory = (usertId) => {
    fetch('http://rate-your-mate.herokuapp.com/api/v1/categories', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            category: {
                name: "PingPong2311",
            },
        }),
    }).then((response) => response.json()).then((json) => {
        starCategory(json.id, usertId)
    });
};




export const starCategory = (category, user) => {
    console.log("------");
    console.log(category);
    console.log(user);

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
    }).then((response) => response.json()).then((response)=>console.log(response));
};


const styles = StyleSheet.create({
    addButton: {
        // width: '50%',
        height: 65,
        marginTop: 20,
        marginBottom: 50,
        marginHorizontal: '25%',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#FBFBFD',
        justifyContent: 'center',
        backgroundColor: '#79589F',
        alignItems: 'center'
    }
});


export default AddCategorry;
