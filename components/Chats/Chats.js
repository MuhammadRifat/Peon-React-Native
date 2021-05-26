import React from 'react'
import { useContext } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { userContext } from '../../App'

export default function Chats() {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <ScrollView>
            <Text>This is Chats: Your Email: {loggedInUser.email}</Text>
            <Text>Your Name: {loggedInUser.name}</Text>
            <Text>Your Photo: {loggedInUser.photo}</Text>
            
            <Image source={{uri: loggedInUser.photo}} style={{ width: 50, height: 50}} />
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
