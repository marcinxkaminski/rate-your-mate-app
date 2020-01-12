import {StyleSheet, View, TouchableWithoutFeedback, Text,TouchableOpacity} from "react-native";
import React, { useState } from "react";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from "react-native-modal";
import { TextInput } from "react-native-gesture-handler";


const AddCategorry = ({userId}) => {
    const [isOpen,setOpen]=useState(false);
    const [newCategory, setNewCategory]=useState('');
    const [categoryFocus, setFocus]=useState(false);
    return (
        <TouchableWithoutFeedback onPress={() => addCattegory(newCategory, userId, setOpen)}>
            <View>
            <View style={styles.addButton}>
                <MaterialIcon name="plus" size={55} color="#FBFBFD"/>
            </View>
            <Modal 
                isVisible={isOpen}
                style={styles.modal}
                backdropColor={'rgba(52, 52, 52, 0.5)'}
                backdropOpacity={1}
                animationIn={'bounceInDown'}
                animationOut={'bounceOutUp'}
                animationInTiming={500}
                animationOutTiming={500}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
                >
                <View style={{ flex: 1, backgroundColor: '#FBFBFD', padding: 10, justifyContent:'center', alignItems: 'center', borderRadius: 10}}>
                    <TextInput value={newCategory} onChangeText={setNewCategory} onFocus={() => setFocus(true)} onEndEditing={() => setFocus(false)}
                         style={categoryFocus ? styles.authTextInputOnFocus : styles.authTextInput}
                    />
                    <TouchableOpacity 
                        style={{
                            backgroundColor: '#79589F', 
                            margin: 15, 
                            borderRadius: 10,
                            width: 230, 
                            height: 35, 
                            justifyContent:'center', 
                            alignItems: 'center'}} 
                        onPress={() => {setOpen(false);addRlyCategory(newCategory, userId, setOpen)}}
                        >
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Add category</Text>
                    </TouchableOpacity>
                </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    )
};

const addRlyCategory = (newCategory, userId, setOpen) => {
    console.log('wwwww')
    setOpen(false);
    fetch('http://rate-your-mate.herokuapp.com/api/v1/categories', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            category: {
                name: newCategory,
            },
        }),
    }).then((response) => response.json()).then((json) => {
        starCategory(json.id, userId)
    });
}

const addCattegory = (newCategory, usertId, setOpen) => {
    setOpen(true); 
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
    },
    modal: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        marginHorizontal: '10%',
        marginTop: '45%',
        marginBottom: '10%',
        borderRadius: 5,
        alignItems: undefined,
        justifyContent: undefined,
    },
    authTextInput: {
        borderWidth: 2,
        borderColor: '#eee',
        borderRadius: 7,
        backgroundColor: '#FBFBFD',
        width: 230,
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 15
    },
    authTextInputOnFocus: {
        borderWidth: 2,
        borderColor: '#79589F',
        borderRadius: 7,
        width: 230,
        padding: 5,
        marginTop: 5,
        fontSize: 15
    },
});


export default AddCategorry;
