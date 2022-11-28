import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import MainScreen from './screens/main-screen'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator initialRouteName="MainScreen">
      <Drawer.Screen name="MainScreen" component={MainScreen} />
    </Drawer.Navigator>
  )
}

export default App
