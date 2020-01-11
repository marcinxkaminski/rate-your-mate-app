import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";

export const Skill = ({name, stars}) => {

    return (
        <View style={styles.border}>
            <Text style={styles.textC}>{stars}</Text>
            <Text style={styles.textC}>{name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    border: {
        marginTop: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        borderColor: '#FBFBFD',
    },
    textC:{
        color: '#FBFBFD',
    }

});

export default Skill;
