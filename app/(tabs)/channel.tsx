import {Button, StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Channel} from "@/app/Interface/Channel";
import {Card, Heading} from "@gluestack-ui/themed";


export default function channel() {
    const [channels ,setChannels] = useState([])

    useEffect(() => {
        showChannels()
    }, []);

    function showChannels(){
        axiosHttp.get(GlobalConstants.baseUrl+"channel/showAll")
            .then((response)=>{
                console.log(response)
                setChannels(response.data)
            })
    }

    return (
        <View style={styles.container}>
            {channels.map((channel:Channel)=>(
                <Card key={channel.id} style={styles.channelCard}>
                    <Text>{channel.name}</Text>
                    <Button title={"Supprimer channel"} />
                </Card>
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
        backgroundColor: "blue",
    },
});
