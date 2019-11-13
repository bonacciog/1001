/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';

import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions} from 'react-native/Libraries/NewAppScreen';

/*
 * NAVIGATION
 */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/*
 * APP COMPONENTS
 */
import Cover from './app/components/Cover';
import FirstPage from './app/components/FirstPage';
import Login from './app/components/Login';
import Home from './app/components/Home';


const RootStack = {

  cover:{screen: Cover},
  firstPage:{screen: FirstPage},
  login:{screen: Login},
  home:{screen: Home}

}

const Navigator = createStackNavigator(
  RootStack,
  {
    initialRouteName: 'cover',
  }
)

const AppContainer = createAppContainer(Navigator)

const App = () => {
  return (
    <>
      <AppContainer />
    </>
  );
};

export default App;
