import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import UserList from '../components/UserList'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '7%',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});

export default class MainContainer extends React.Component{

    state = {
        nav : this.props.navigation
    }
    
    render(){
      return(
        <View style={styles.container}>
            <UserList nav={this.state.nav}/>
        </View>
      )
    }
}
