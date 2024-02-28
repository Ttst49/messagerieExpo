import {Button, FlatList, ScrollView, StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import React, {useEffect, useMemo, useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Channel} from "@/app/Interface/Channel";
import {Card} from "@gluestack-ui/themed";
import {Link, useRouter} from "expo-router";


export default function channel() {
    const [channels ,setChannels] = useState([])
    const navigation = useRouter()


    useEffect(() => {
       setTimeout(()=>{
           if (!GlobalConstants.isLoggedIn()){
               navigation.push("/home")
           }else {
               getChannels()
           }
       },500)
    }, []);

    function getChannels(){
        axiosHttp.get(GlobalConstants.baseUrl+"channel/showAll")
            .then((response)=>{
                setChannels(response.data)
            })
    }

    function removeChannel(id:number){
        axiosHttp.delete(GlobalConstants.baseUrl+"channel/remove/"+id)
            .then((response)=>{
                console.log(response.data)
                getChannels()
            })
    }

    /**
     * <ScrollView>
     *                 {channels.map((channel:Channel)=>(
     *                     <Card key={channel.id} style={styles.channelCard}>
     *                         <Text style={styles.text}>{channel.name}</Text>
     *                         <Text style={styles.btn} onPress={()=>{removeChannel(channel.id)}}>Supprimer channel</Text>
     *                         <Text style={styles.btn} onPress={()=>{navigation.push({pathname:`/channel/show/${channel.id}`})}}>Montrer channel</Text>
     *                     </Card>
     *                 ))}
     *                 <Link style={styles.btn} href={"/channel/create"} >Créer un nouveau channel</Link>
     *             </ScrollView>
     */
    return (
        <View style={styles.container}>
            <Card>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={channels}
                    renderItem={({item}:{item:Channel})=>
                        <Card style={styles.channelCard}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.btn} onPress={()=>{removeChannel(item.id)}}>Supprimer channel</Text>
                            <Text style={styles.btn} onPress={()=>{navigation.push({pathname:`/channel/show/${item.id}`})}}>Montrer channel</Text>
                        </Card>
                }
                    keyExtractor={(item)=>item.id.toString()}
                />
            </Card>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },
    channelCard:{
        width: '100%',
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
