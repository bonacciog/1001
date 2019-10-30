import React, { Component } from 'react'
import { View, Image, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles'

class Login extends Component{

    constructor(props){
        super(props)
    }

    state = {username: "", password: "", isLoading: false}

    checkLogin(){
        this.state.isLoading = true;
        const {username,password,isLoading} = this.state;
       /* fetch('http://192.168.43.120:3000',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                request: 'login',
                user: {Username: username, Password: password},
              }),
        })
            .then((response) => response.json())
                .then((responseJson) => {
                    this.state.isLoading= false;
                    if(responseJson.error === undefined){
                        this.props.navigation.navigate('home')
                    }else{
                        Alert.alert('Error',responseJson.error,[{
                            text:'Okay'
                        }])
                    }
                })
                .catch((error) =>{
                    Alert.alert('Error','Connection lost',[{
                        text:'Okay'
                    }])
        });*/

        if(username == 'admin' && password == 'admin'){
            this.props.navigation.navigate('home')
        }else{
            Alert.alert('Error','Username/Password mismatch',[{
                text:'Okay'
            }])
        }
    }

    render() {
        return(
            <View style={styles.parent}>
                <View style={styles.customLogo}>
                    <Image
                        style={{ resizeMode:'contain', flex:1 }}
                        source={require('../../assets/images/logo.png')}
                    />
                </View>
                <View style={styles.customLogin}>
                    <TextInput style={styles.input} placeholder="Username" onChangeText = { text => this.setState({ username: text }) } />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry = { true } onChangeText = { text => this.setState({ password: text }) } />
                    <TouchableOpacity
                            style={[styles.button,styles.loginButton]}
                            onPress={_ => this.checkLogin()}
                        >
                        <Text style={[styles.loginText,styles.heading]}> LOGIN </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        );
    }
}

export default Login