import { FlatList, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Group} from "@/app/Interface/Group";
import {DataTable, Text, Button} from "react-native-paper";
import {UserFull} from "@/app/Interface/UserFull";


export default function editGroup() {
    const navigation = useRouter()
    const {id}= useLocalSearchParams<{id:string}>()
    const [group ,setGroup] = useState<Group>()



    useEffect(() => {
        setTimeout(()=>{
            if (!GlobalConstants.isLoggedIn()){
                navigation.push("/login")
            }else {
                getGroup(id)
            }
        },500)
    }, []);

    function getGroup(id:string){
        axiosHttp.get(GlobalConstants.baseUrl+"group/conversation/show/"+id)
            .then((response)=>{
                setGroup(response.data)
            })
    }

    function promoteAdmin(id:number){
        axiosHttp.get(GlobalConstants.baseUrl+"group/conversation/promote/admin/"+group?.id+"/"+id)
            .then((response)=>{
                console.log(response)
            })
    }
    function demoteAdmin(id:number){
        axiosHttp.get(GlobalConstants.baseUrl+"group/conversation/demote/admin/"+group?.id+"/"+id)
            .then((response)=>{
                console.log(response)
            })
    }

    function kickUser(id:number){
        console.log("kick")
    }

    function promoteOwner(id:number){
        console.log("owner")
    }




    return (
        <View style={styles.container}>
            <DataTable>
                <FlatList
                    data={group?.groupMembers}
                    renderItem={({item}:{item:UserFull})=>
                <DataTable.Row>
                    <Text variant={"bodyMedium"}>{item.relatedTo.username}</Text>
                    {group?.adminMembers.some(user=>user.username==item.relatedTo.username)
                        ?
                        <Button mode={"outlined"} onPress={()=>{demoteAdmin(item.relatedTo.id)}}>Déstituer admin</Button>
                        :
                        <Button mode={"outlined"} onPress={()=>{promoteAdmin(item.relatedTo.id)}}>Promouvoir admin</Button>
                    }
                    <Button mode={"outlined"} onPress={()=>{kickUser(item.relatedTo.id)}}>Kick</Button>
                    {group?.owner.id == item.id
                        ?
                        <></>
                        :
                        <Button mode={"outlined"} onPress={()=>{promoteOwner(item.relatedTo.id)}}>Promouvoir Propriétaire</Button>
                    }


                </DataTable.Row>
                    }
                />
            </DataTable>
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



});
