import { StyleSheet} from 'react-native';
import { Text } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Card} from "@gluestack-ui/themed";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Channel} from "@/app/Interface/Channel";


export default function channel() {
    const [channel ,setChannel] = useState<Channel>()
    const navigation = useRouter()
    const {id}= useLocalSearchParams<{id:string}>()


    useEffect(() => {
        setTimeout(()=>{
            if (!GlobalConstants.isLoggedIn()){
                navigation.push("/home")
            }else {
                getChannel(id)
            }
        },500)
    }, []);

    function getChannel(id:any){
        axiosHttp.get(GlobalConstants.baseUrl+"channel/show/"+id)
            .then((response)=>{
                console.log(response)
                setChannel(response.data)
            })
    }





    return (
        <Card key={channel?.id} style={styles.channelCard}>
            <Text style={styles.text}>{channel?.name}</Text>
        </Card>
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
    }
});
