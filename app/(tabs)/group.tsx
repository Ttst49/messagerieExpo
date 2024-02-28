import {FlatList, StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import { useRouter} from "expo-router";
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Group} from "@/app/Interface/Group";


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
            <FlatList
                data={groups}
                renderItem={({item}:{item:Group})=>
                    <Text>{
                        item.groupMembers[0].relatedTo.username+
                        " / "+
                        item.groupMembers[1].relatedTo.username
                    }</Text>
                }
            />
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
});
