import {Button, StyleSheet, TextInput} from 'react-native';
import {View } from '@/components/Themed';
import axios from "axios";
import {useState} from "react";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Link} from "expo-router";


export default function login() {
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")

    function login(){
        const user = {username,password}
        axios.post(GlobalConstants.baseUrl+"login_check",user)
            .then((response)=>{
                console.log(response)
                GlobalConstants.token = response.data.token
            })
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={username}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                value={password}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
            />
            <Button onPress={login} title="Login" />
            <Link style={styles.btnSuccess} href={"/Register"}>Pas encore de compte?</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        borderStyle: "solid",
        borderColor: "black",
        padding: 5,
    },
    btnSuccess:{
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        color: "white"
    },

});
