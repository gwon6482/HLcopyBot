import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SettingScreen = () => {
    return (
        <View style={styles.block}>
            <Text style={styles.text}>SettingScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 36,
    },
});

export default SettingScreen;
