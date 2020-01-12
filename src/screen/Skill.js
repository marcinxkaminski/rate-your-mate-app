import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export const Skill = ({name, stars}) => {

    return (
        <View style={styles.border}>
            <Text style={styles.stars}>{stars}</Text>
            <MaterialIcon style={styles.star} name="star-outline" size={25} color="#FBFBFD"/>
            <Text style={styles.name}>{name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    border: {
        marginTop: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 30,
        height: 70,
        borderColor: '#FBFBFD',
    },
    stars:{
        color: '#FBFBFD',
        // marginLeft: 50,
        fontSize: 20,
        // fontWeight: 'bold'
    },
    star:{
        color: '#FBFBFD',
        marginLeft: 10,
        fontSize: 20,
        // fontWeight: 'bold'
    },
    name:{
        color: '#FBFBFD',
        marginLeft: 60,
        fontSize: 20,

    }

});

export default Skill;
