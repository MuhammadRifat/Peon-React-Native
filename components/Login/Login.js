import React, { useState } from 'react'
import { useContext } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { userContext } from '../../App';
import logo from '../../images/logo.svg';
import { firebaseConfigFrameWork, handleFbSignIn, handleGoogleSignIn, handleLogIn, handleSignUp } from './LoginManager';

export default function Login({navigation}) {
    firebaseConfigFrameWork();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [newUser, setNewUser] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validate, setValidate] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    });
    const [spinner, setSpinner] = useState(false);

    const handleSubmit = () => {
        setSpinner(true);
        let isSubmit = true;
        let errorsData = {
            nameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: ''
        };

        const setErrorData = (ptyName, errorMessage) => {
            let newValidate = { ...errorsData };
            newValidate[ptyName] = errorMessage;
            errorsData = newValidate;
        }

        if (newUser && name.trim() === '') {
            setErrorData('nameError', 'Name is required.');
            isSubmit = false;
        }
        if (email.trim() === '') {
            setErrorData('emailError', 'Email is required.');
            isSubmit = false;
        } else {
            const isValid = /\S+@\S+\.\S+/.test(email);
            if (!isValid) {
                setErrorData('emailError', 'Email is not valid.');
                isSubmit = false;
            }
        }

        if (password.trim() === '') {
            setErrorData('passwordError', 'Password is required.');
            isSubmit = false;
        } else {
            if (password.length < 6) {
                setErrorData('passwordError', 'Password length must have at least 6.');
                isSubmit = false;
            } else {
                
            }
        }

        if (newUser && password !== confirmPassword) {
            setErrorData('confirmPasswordError', "Confirm password doesn't match.");
            isSubmit = false;
        }
        if (isSubmit) {
            let newValidate = { ...validate };
            newValidate.nameError = '';
            newValidate.emailError = '';
            newValidate.passwordError = '';
            setValidate(newValidate);

            if(newUser) {
                handleSignUp(name, email, confirmPassword)
                    .then(res => {
                        if (res.email) {
                            setUserData(res);
                            setSpinner(false);
                        }
                        else {
                            const newUser = {
                                error: res
                            }
                            setLoggedInUser(newUser);
                            setSpinner(false);
                        }
                    })
            } else {
                handleLogIn(email, password)
                .then(res => {
                    if (res.email) {
                        setUserData(res);
                        setSpinner(false);
                    }
                    else {
                        const newUser = {
                            error: res
                        }
                        setLoggedInUser(newUser);
                        setSpinner(false);
                    }
                })
            }
        }
        setValidate(errorsData);
    }


    const handleCreateAccount = () => {
        setNewUser(!newUser);
    }

    // For using sign in with google
    const googleSignIn = () => {
        setSpinner(true);
        handleGoogleSignIn()
            .then(res => {
                if (res.email) {
                    setUserData(res);
                    setSpinner(false);
                }
                else {
                    const newUser = {
                        error: res
                    }
                    setLoggedInUser(newUser);
                    setSpinner(false);
                }
            })
    }

    // For using sign in with facebook
    const fbSignIn = () => {
        setSpinner(true);
        handleFbSignIn()
            .then(res => {
                if (res.email) {
                    setUserData(res);
                    setSpinner(false);
                }
                else {
                    const newUser = {
                        error: res
                    }
                    setLoggedInUser(newUser);
                    setSpinner(false);
                }
            })
    }

    const setUserData = (res) => {
        setLoggedInUser({
            name: res.displayName || name,
            email: res.email,
            photo: res.photoURL
        })
    }

    return (
        <ScrollView>
            <View style={styles.loginContainer}>
                <Image source={logo} style={{ width: 300, height: 92, marginTop: 30, marginBottom: 20 }} />
            </View>
            <View style={styles.loginContainer}>
            {spinner && <ActivityIndicator size="large" color="darkgreen" style={{marginBottom:5}} />}
                <Text style={{ color: 'red' }}>{validate.nameError}</Text>
                {newUser && <TextInput
                    style={styles.textInput}
                    name="name"
                    placeholder="Full Name"
                    onChangeText={value => setName(value)}
                    defaultValue=""
                />}
                <Text style={{ color: 'red' }}>{validate.emailError}</Text>
                <TextInput
                    style={styles.textInput}
                    name="email"
                    placeholder="Email"
                    onChangeText={value => setEmail(value)}
                    defaultValue=""
                />
                <Text style={{ color: 'red' }}>{validate.passwordError}</Text>
                <TextInput
                    style={styles.textInput}
                    name="password"
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={value => setPassword(value)}
                    defaultValue=""
                />
                <Text style={{ color: 'red' }}>{validate.confirmPasswordError}</Text>
                {newUser && <TextInput
                    style={styles.textInput}
                    name="confirmPassword"
                    secureTextEntry={true}
                    placeholder="Confirm password"
                    onChangeText={value => setConfirmPassword(value)}
                    defaultValue=""
                />}
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>{newUser ? 'Create new account' : 'Login'}</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10 }}>{newUser ? "Already have an account?" : "Don't have an account?"}</Text>
                <TouchableOpacity onPress={handleCreateAccount}><Text style={{ fontWeight: 'bold', fontSize: 16, color: 'darkgreen', borderBottomColor: 'darkgreen', borderBottomWidth: 2 }}>{newUser ? "Login" : "Create new account"}</Text></TouchableOpacity>

                <Text style={{ fontSize: 18, marginTop: 25, marginBottom: 25 }}>──────── Or ────────</Text>

                <TouchableOpacity onPress={googleSignIn} style={styles.socialBtn}><Text style={{ textAlign: 'center' }}>Continue with Google</Text></TouchableOpacity>
                <TouchableOpacity onPress={fbSignIn} style={styles.socialBtn}><Text style={{ textAlign: 'center' }}>Continue with Facebook</Text></TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        width: 300,
        marginBottom: 10,
        padding: 8,
        fontSize: 16
    },
    button: {
        backgroundColor: "darkgreen",
        padding: 10,
        borderRadius: 5,
        width: 300
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "600",
        color: '#fff',
        textAlign: "center",
    },
    socialBtn: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
        width: 300,
    }
})
