import {Button, StyleSheet, TextInput} from 'react-native';
import {View } from '@/components/Themed';
import axios from "axios";
import {useState} from "react";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Link, useRouter} from "expo-router";
import axiosHttp from "@/app/auth/interceptor";


export default function login() {
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")
    const navigation = useRouter()

    async function login(){
        const user = {username,password}
        await axios.post(GlobalConstants.baseUrl+"login_check",user)
            .then((response)=>{
                GlobalConstants.token = response.data.token
            })
        await axiosHttp.get(GlobalConstants.baseUrl+"profile/getActual")
            .then((response:any)=>{
                GlobalConstants.currentUser = {
                    id:response.data.id,
                    username:response.data.username,
                    profile: response.data.profile
                }
            })
            .then(()=>{
                navigation.push("/")
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
        fontSize: 25,
        borderStyle: "solid",
        borderColor: "gray",
        padding: 5,
        margin: 15,
        borderWidth: 1
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
