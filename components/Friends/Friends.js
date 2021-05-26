import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { userContext } from '../../App';
import FriendDetails from './FriendDetails/FriendDetails';

export default function Friends() {
    const [friends, setFriends] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setSpinner(true);
        fetch(`https://pacific-sea-17806.herokuapp.com/friendsByEmail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                const friendsEmail = data.map(friend => {
                    if (friend.friend1 === loggedInUser.email) {
                        return friend.friend2;
                    }
                    else {
                        return friend.friend1
                    }
                });
                fetch('https://pacific-sea-17806.herokuapp.com/userByEmails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(friendsEmail)
                })
                    .then(res => res.json())
                    .then(data => {
                        setFriends(data);
                        setSpinner(false);
                    })
            })
    }, [])

    return (
        <ScrollView>
            {spinner && <ActivityIndicator size="large" color="darkgreen" style={{ marginBottom: 5 }} />}
            {
                friends.map(friend => <FriendDetails friend={friend} key={friend.id}></FriendDetails>)
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
