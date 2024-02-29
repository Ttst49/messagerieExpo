import {FlatList, StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import { useRouter} from "expo-router";
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Group} from "@/app/Interface/Group";
import {Card} from "@gluestack-ui/themed";


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

    return (
        <View style={styles.container}>
            <Card style={styles.body}>
                <FlatList
                    data={groups}
                    renderItem={({item}:{item:Group})=>
                        <Card style={styles.groupCard}>
                            <Text style={styles.text}>{
                                item.groupMembers[0].relatedTo.username+
                                " / "+
                                item.groupMembers[1].relatedTo.username
                            }</Text>
                        </Card>
                    }
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
    body:{
        marginBottom:130
    },
    groupCard:{
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
});
