import {Button, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Channel} from "@/app/Interface/Channel";


export default function channel() {
    const navigation = useRouter()
    const {id}= useLocalSearchParams<{id:string}>()
    const [channel ,setChannel] = useState<Channel>()
    const [channelName ,setChannelName] = useState("")


    useEffect(() => {
        setTimeout(()=>{
            if (!GlobalConstants.isLoggedIn()){
                navigation.push("/home")
            }else {
                getChannel(id)
            }
        },500)
    }, []);

    function getChannel(id:string){
        axiosHttp.get(GlobalConstants.baseUrl+"channel/show/"+id)
            .then((response)=>{
                setChannel(response.data)
            })
    }

    function editChannel(id:number){
        axiosHttp.put(GlobalConstants.baseUrl+"channel/edit/"+id,{"name":channelName})
            .then((response)=>{
                navigation.push("/channel")
            })
    }



    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={channel?.name}
                onChangeText={text => setChannelName(text)}
                placeholderTextColor={"gray"}
            />
            <Button onPress={()=>{editChannel(channel!.id)}} title="Editer Channel" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },
    channelCard:{
        width: '75%',
        margin: 5,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525",
    },
    text:{
        color: "white",
        fontSize: 25,

    },
    btn:{
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
    input:{
        fontSize: 25,
        borderStyle: "solid",
        borderColor: "gray",
        padding: 5,
        margin: 15,
        borderWidth: 1
    },

});
