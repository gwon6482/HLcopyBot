import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';

const CustomButton = ({onPress, title, hasMarginBottom, theme}) => {
    const isPrimary = theme === 'primary';

    return (
        <View style={[styles.block, hasMarginBottom && styles.margin]}>
            <Pressable
                onPress={onPress}
                style={({pressed}) => [
                    styles.wrapper,
                    isPrimary && styles.primaryWrapper,
                    Platform.OS === 'ios' && pressed && {opacity: 0.5},
                ]}
                android_ripple={{color: isPrimary ? '#ffffff' : '#6200ee'}}>
                <Text
                    style={[
                        styles.text,
                        isPrimary ? styles.primaryText : styles.secondaryText,
                    ]}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};

CustomButton.defaultProps = {
    theme: 'primary',
};

const styles = StyleSheet.create({
    overflow: {
        borderRadius: 4,
        overflow: 'hidden',
    },
    wrapper: {
        borderRadius: 4,
        height: 48,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryWrapper: {
        backgroundColor: '#6200ee',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
    },
    margin: {
        marginBottom: 8,
    },
    primaryText: {
        color: 'white',
    },
    secondaryText: {
        color: '#6200ee',
    },
});

export default CustomButton;
