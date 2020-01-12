import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';


class Ranking extends React.Component {

    state = {
        monthlyUsers: [{name: "bob"}, {name: "bob"}, {name: "bob"}],
        weeklyUsers: [{name: "bob"}, {name: "bob"}, {name: "bob"}],
        weeklyCategories: [{name: "bob"}, {name: "bob"}, {name: "bob"}],
        monthlyCategories: [{name: "bob"}, {name: "bob"}, {name: "bob"}]

    };

    componentDidMount() {
        this.getRanks();
    }
    static navigationOptions = {
        headerShown: false,
    };

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
                    weeklyUsers: Object.values(responseJSON.weekly.users).slice(0, 3),
                    weeklyCategories: Object.values(responseJSON.weekly.categories).slice(0, 3),
                    // weeklyUsers: responseJSON.weekly
                });
                console.log(this.state.monthlyUsers)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render = () => {
        return (


            <View style={styles.statVertical}>
                <View style={styles.rym}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>RYM</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.boxTitle}>Top 3 Categories</Text>
                    <Text style={styles.ofThe}>of the week</Text>
                    <View style={styles.statBoxElemBox}>
                        <Text>#1 {this.state.weeklyCategories[0].name[0].toUpperCase() + this.state.weeklyCategories[0].name.slice(1)}</Text>
                        <Text>#2 {this.state.weeklyCategories[1].name[0].toUpperCase() + this.state.weeklyCategories[1].name.slice(1)}</Text>
                        <Text>#3 {this.state.weeklyCategories[2].name[0].toUpperCase() + this.state.weeklyCategories[2].name.slice(1)}</Text>
                    </View>
                </View>

                <View style={styles.statBox}>
                    <Text style={styles.boxTitle}>Top 3 Employees</Text>
                    <Text style={styles.ofThe}>of the week</Text>
                    <View style={styles.statBoxElemBox}>
                        <Text>#1 {this.state.weeklyUsers[0].name}</Text>
                        <Text>#2 {this.state.weeklyUsers[1].name}</Text>
                        <Text>#3 {this.state.weeklyUsers[2].name}</Text>
                    </View>
                </View>

                <View style={styles.statBox}>
                    <Text style={styles.boxTitle}>Top 3 Employees</Text>
                    <Text style={styles.ofThe}>of the Month</Text>
                    <View style={styles.statBoxElemBox}>
                        <Text>#1 {this.state.monthlyUsers[0].name}</Text>
                        <Text>#2 {this.state.monthlyUsers[1].name}</Text>
                        <Text>#3 {this.state.monthlyUsers[2].name}</Text>
                    </View>
                </View>

                <View style={styles.statBox}>
                    <Text style={styles.boxTitle}>Top 3 Categories</Text>
                    <Text style={styles.ofThe}>of the Month</Text>
                    <View style={styles.statBoxElemBox}>
                        <Text>#1 {this.state.monthlyCategories[0].name[0].toUpperCase() + this.state.monthlyCategories[0].name.slice(1)}</Text>
                        <Text>#2 {this.state.monthlyCategories[1].name[0].toUpperCase() + this.state.monthlyCategories[1].name.slice(1)}</Text>
                        <Text>#3 {this.state.monthlyCategories[2].name[0].toUpperCase() + this.state.monthlyCategories[2].name.slice(1)}</Text>
                    </View>
                </View>


            </View>
        )
    }
}


export default Ranking;


const styles = StyleSheet.create({
    statVertical: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '95%',

    },
    boxTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#430098',
    },
    ofThe: {
        fontSize: 16,
        color: '#430098',
    },
    statBox: {
        paddingTop: 5,
        margin: 5,
        marginTop: 30,
        flex: 1,
        borderWidth: 4,
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: '#430098',
        borderRadius: 30,
    },
    rym:{
      backgroundColor  :'#79589F',
        width: '100%',
        height: 130,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    statBoxElemBox: {
        marginTop: 8,
        flexDirection: 'column',
        borderColor: '#430098',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 90,
        width: '100%',
    },
});
