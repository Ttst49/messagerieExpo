import {FlatList, StyleSheet} from 'react-native';
import { View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import { useRouter} from "expo-router";
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Group} from "@/app/Interface/Group";
import {Card, Text} from "react-native-paper";


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
                        <Card
                            style={styles.groupCard}
                        >
                            <Card.Content>
                                <Text variant={"titleLarge"}>{
                                item.groupMembers[0].relatedTo.username+
                                " / "+
                                item.groupMembers[1].relatedTo.username
                            }</Text>
                            </Card.Content>
                        </Card>
                    }
                />
            </Card>
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
});
