import { FlatList, StyleSheet} from 'react-native';
import { View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Channel} from "@/app/Interface/Channel";
import {FAB, Button, Card, Text} from "react-native-paper";
import {useRouter} from "expo-router";


export default function channel() {
    const [channels ,setChannels] = useState([])
    const navigation = useRouter()


    useEffect(() => {
       setTimeout(()=>{
           if (!GlobalConstants.isLoggedIn()){
               navigation.push("/login")
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
            .then(getChannels)
    }

    return (
        <View style={styles.container}>
            <Card style={styles.body}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={channels}
                    renderItem={({item}:{item:Channel})=>
                        <Card
                            onPress={()=>{navigation.push({pathname:`/channel/show/${item.id}`})}}
                            style={styles.channelCard}
                        >
                            <Card.Content>
                                <Text variant={"titleLarge"}>{item.name}</Text>
                            </Card.Content>
                            <Card.Actions>
                                {item.owner.id == GlobalConstants.currentUser.profile.id
                                    ?
                                    <>
                                        <Button onPress={()=>{removeChannel(item.id)}}>Supprimer channel</Button>
                                        <Button onPress={()=>{navigation.push({pathname:`/channel/edit/${item.id}`})}}>Editer channel</Button>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </Card.Actions>
                        </Card>
                }
                    keyExtractor={(item)=>item.id.toString()}
                />
            </Card>
            <FAB
                style={styles.btnCreate}
                onPress={()=>{navigation.push("/channel/create")}}
                label={"Créer un nouveau channel"}
                color={"white"}
                rippleColor={"black"}
            />
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
        margin: 15,
    },
    text:{
        color: "white",
        fontSize: 25,

    },

    btnCreate:{
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        backgroundColor: "gray",
        bottom: 10,
    },
    body:{
        marginBottom:130
    }
});
