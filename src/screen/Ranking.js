import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


class Ranking extends React.Component {

    state = {
        monthlyUsers: [],
        monthlyCategories: []

    };

    componentDidMount() {
        this.getRanks();
    }


    getRanks = () => {
        var header = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        var path = 'http://rate-your-mate.herokuapp.com/api/v1/rank';
        fetch(path, {
            method: 'GET',
            headers: header,
        })
            .then((response) => {
                return response.json()
            })
            .then((responseJSON) => {
                this.setState({
                    monthlyUsers: Object.values(responseJSON.monthly.users).slice(0, 3),
                    monthlyCategories: Object.values(responseJSON.monthly.categories).slice(0, 3),
                    // weeklyUsers: responseJSON.weekly
                });
                console.log(this.state.monthlyUsers)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render = () => {
        console.log("who");
        console.log(this.state.monthlyUsers);
        return (
            <View style={styles.statBoxHolder}>
                <ScrollView style={styles.scrollStyle}>
                    <View style={styles.statBox}>
                        <Text style={styles.boxTitle}>Top Week Categories</Text>
                        <View style={styles.statBoxElemBox}>
                            <FlatList
                                data={this.state.monthlyUsers}
                                randerItem={({item}) =>
                                    <View>
                                        <Text>{item.id}</Text>
                                    </View>
                                }
                                keyExtractor={item =>item.id}
                            />
                        </View>
                    </View>
                    <View style={styles.statBox}>
                        <Text>Top Week Categories</Text>
                        <View style={styles.statBoxElemBox}>
                            <View style={styles.statBoxElem}>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statBox}>
                        <Text>Top Week Categories</Text>
                        <View style={styles.statBoxElemBox}>
                            <View style={styles.statBoxElem}>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statBox}>
                        <Text>Top Week Categories</Text>
                        <View style={styles.statBoxElemBox}>
                            <View style={styles.statBoxElem}>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


export default Ranking;


const styles = StyleSheet.create({
    statBoxHolder: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: '100%',
        paddingVertical: 10,
        width: '100%'


    },

    scrollStyle: {
        width: '100%',
        borderWidth: 1,
    },
    boxTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#430098',
    },
    statBox: {
        paddingTop: 5,
        margin: 5,
        flex: 1,
        borderWidth: 4,
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: '#430098',
        // backgroundColor: '#',
        borderRadius: 30,
    },

    statBoxElemBox: {
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'stretch'
    },
    statBoxElem: {
        borderWidth: 1,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,

    }
});
