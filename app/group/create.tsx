import {Button, View, StyleSheet, FlatList} from "react-native";
import {useRouter} from "expo-router";
import {Text} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {UserFull} from "@/app/Interface/UserFull";
import {GlobalConstants} from "@/app/common/Global-constants";
import axiosHttp from "@/app/auth/interceptor";

export default function register() {
    const navigation = useRouter()
    const [friends, setFriends]= useState<UserFull[]>([])

    useEffect(() => {
        setTimeout(()=>{
            if (!GlobalConstants.isLoggedIn()){
                navigation.push("/group")
            }else {
                getFriends()
            }
        },500)
    }, []);

    function createGroup(){
        console.log("coucou")
    }

    function getFriends(){
        axiosHttp.get(GlobalConstants.baseUrl+"relations/getFriends")
            .then((response)=>{
                setFriends(response.data)
            })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={friends}
                renderItem={({item}:{item:UserFull})=>
                    <Text>coucou</Text>
                }
            />
            <Button onPress={createGroup} title="Create Channel" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        fontSize: 25,
        borderStyle: "solid",
        borderColor: "gray",
        padding: 5,
        margin: 15,
        borderWidth: 1
    },

});
