import {FlatList, StyleSheet} from 'react-native';
import { View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import { useRouter} from "expo-router";
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Group} from "@/app/Interface/Group";
import {Button, Card, FAB, Text} from "react-native-paper";


export default function group() {
    const [groups ,setGroups] = useState([])
    const navigation = useRouter()

    useEffect(() => {
        setTimeout(()=>{
            if (!GlobalConstants.isLoggedIn()){
                navigation.push("/login")
            }else {
                getGroups()
            }
        },500)
    }, []);

    function getGroups(){
        axiosHttp.get(GlobalConstants.baseUrl+"group/conversation/showAll")
            .then((response)=>{
                setGroups(response.data)
            })
    }

    function leaveGroup(id:number){
        axiosHttp.get(GlobalConstants.baseUrl+"group/conversation/leave/"+id)
            .then((response)=>{
                console.log(response)
            })
    }

    return (
        <View style={styles.container}>
            <Card style={styles.body}>
                <FlatList
                    data={groups}
                    renderItem={({item}:{item:Group})=>
                        <Card
                            onPress={()=>{navigation.push({pathname:`/group/show/${item.id}`})}}
                            style={styles.groupCard}
                        >
                            <Card.Content>
                                <Text variant={"titleLarge"}>Groupe de {
                                item.groupMembers[0].relatedTo.username+
                                " / "+
                                item.groupMembers[1].relatedTo.username
                            }...</Text>
                            </Card.Content>
                            <Card.Actions>
                                {item.owner.id == GlobalConstants.actualUser.profile.id
                                    ?
                                    <>
                                        <Button onPress={()=>{navigation.push({pathname:`/group/edit/${item.id}`})}}>Editer groupe</Button>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </Card.Actions>
                        </Card>
                    }
                />
            </Card>
            <FAB
                style={styles.btnCreate}
                onPress={()=>{navigation.push("/group/create")}}
                label={"Créer un nouveau groupe"}
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
    body:{
        marginBottom:130
    },
    groupCard:{
        margin: 15,
    },
    btnCreate:{
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        backgroundColor: "gray",
        bottom: 10,
    },
});
