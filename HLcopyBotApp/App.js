import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MainTab from './src/MainTab';
import SignInScreen from './src/screens/SignInScreen';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(
                'Message arrived!!',
                JSON.stringify(remoteMessage),
                console.log(remoteMessage),
            );
        });

        return unsubscribe;
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="MainTab"
                    component={MainTab}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});

export default App;
