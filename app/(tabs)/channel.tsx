import { FlatList, StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
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
                getChannels()
            })
    }



    return (
        <View style={styles.container}>
            <Card style={styles.body}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={channels}
                    renderItem={({item}:{item:Channel})=>
                        <Card style={styles.channelCard}>
                            <Text style={styles.text}>{item.name}</Text>
                            {item.owner.id == GlobalConstants.actualUser.profile.id
                                ?
                                <>
                                    <Text style={styles.btn} onPress={()=>{removeChannel(item.id)}}>Supprimer channel</Text>
                                    <Text style={styles.btn} onPress={()=>{navigation.push({pathname:`/channel/edit/${item.id}`})}}>Editer channel</Text>
                                    <Text style={styles.btn} onPress={()=>{navigation.push({pathname:`/channel/show/${item.id}`})}}>Montrer channel</Text>
                                </>
                                :
                                <>
                                    <Text style={styles.btn} onPress={()=>{navigation.push({pathname:`/channel/show/${item.id}`})}}>Montrer channel</Text>
                                </>
                            }
                        </Card>
                }
                    keyExtractor={(item)=>item.id.toString()}
                />
            </Card>
            <Link style={styles.btnCreate} href={"/channel/create"} >Créer un nouveau channel</Link>
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
        color: "white",
    },
    btnCreate:{
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 64,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'gray',
        color: "white",
        position: "absolute",
        bottom: 10,
    },
    body:{
        marginBottom:130
    }
});
