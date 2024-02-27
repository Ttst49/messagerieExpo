import {Button, StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import React, {useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Channel} from "@/app/Interface/Channel";
import {Link} from "expo-router";


export default function TabOneScreen() {
    const [channels ,setChannels] = useState([])

    function showChannels(){
        axiosHttp.get(GlobalConstants.baseUrl+"channel/showAll")
            .then((response)=>{
                console.log(response)
                setChannels(response.data)
            })
    }

    return (
        <View style={styles.container}>
            <Button title="Voir tous les channels" onPress={showChannels} />
            {channels.map((channel:Channel)=>(
                <Text style={styles.channelCard} key={channel.id}>{channel.name}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    channelCard:{
        height: 100,
        width: '50%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
    }
});
