import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import profilePik from '../../../images/profile_picture.jpg';

export default function FriendDetails({friend}) {
    return (
        <View style={styles.friendsContainer}>
            <Image source={{uri: friend.photo} || profilePik} style={{ width: 50, height: 50}} />
            <Text>{friend.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    friendsContainer: {
        flex: 2,
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'green'
    }
})
