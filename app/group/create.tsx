import {Button, View, StyleSheet, FlatList} from "react-native";
import {useRouter} from "expo-router";
import {Checkbox, Text} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {GlobalConstants} from "@/app/common/Global-constants";
import axiosHttp from "@/app/auth/interceptor";
import {User} from "@/app/Interface/User";

export default function register() {
    const navigation = useRouter()
    const [friends, setFriends]= useState<User[]>([])
    const[checked,setChecked]= useState(false)

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
                renderItem={({item}:{item:User})=>
                    <>
                        <Checkbox
                            status={checked?"checked":"unchecked"}
                            onPress={()=>{setChecked(!checked)}}

                        />
                        <Text>{item.username}</Text>
                    </>
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
