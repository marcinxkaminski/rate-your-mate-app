import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainContainer from './src/main/MainContainer'
import PropertiesPanel from './src/screen/PropertiesPanel'
import UserList from './src/components/UserList'

const MainNavigator = createStackNavigator({
  MainContainer: {screen: MainContainer},
  PropertiesPanel: {screen: PropertiesPanel},
  UserList: {screen: UserList}
});

const App = createAppContainer(MainNavigator);

export default App;
