import {Button, StyleSheet, TextInput} from 'react-native';
import {View } from '@/components/Themed';
import axios from "axios";
import {useState} from "react";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Link} from "expo-router";


export default function register() {
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")


    function register(){
        const user = {username,password}
        axios.post(GlobalConstants.baseUrl+"register",user)
            .then((response)=>{
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
            <Button onPress={register} title="Register" />
            <Link style={styles.btnSecondary} href={"/login"}>Déjà un compte?</Link>
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
        fontSize: 25,
        borderStyle: "solid",
        borderColor: "gray",
        padding: 5,
        margin: 15,
        borderWidth: 1
    },
    btnSecondary:{
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'gray',
        color: "white"
    },

});
