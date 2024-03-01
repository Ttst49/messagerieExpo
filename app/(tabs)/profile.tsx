import {FlatList, StyleSheet, Text} from 'react-native';
import {View } from '@/components/Themed';
import {GlobalConstants} from "@/app/common/Global-constants";
import {useRouter} from "expo-router";
import React, {useEffect, useState} from "react";
import {User} from "@/app/Interface/User";
import axiosHttp from "@/app/auth/interceptor";
import {Avatar, Button} from "react-native-paper";
import {Div} from "@expo/html-elements";

export default function profile() {
    const navigation = useRouter()
    const [friends,setFriends]= useState<User[]>([])

    useEffect(() => {
        setTimeout(()=>{
            if (!GlobalConstants.isLoggedIn()){
                navigation.push("/login")
            }else {
                getFriends()
            }
        },500)
    }, []);

    function getFriends(){
        axiosHttp.get(GlobalConstants.baseUrl+"relations/getFriends")
            .then((response)=>{
                console.log(response)
                setFriends(response.data)
            })
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Profile
            </Text>
            <View style={styles.content}>
                <FlatList
                    data={friends}
                    renderItem={({item}:{item:User})=>
                        <>
                            <Div style={styles.avatar}>
                                <Avatar.Text size={48} label={item.username[0].toUpperCase()} />
                                <Text style={styles.text}>{item.username}</Text>
                            </Div>
                        </>
                    }
                />
                <Button icon="account-details" mode="outlined" onPress={() => console.log('Pressed')}>
                    Voir tous les utilisateurs
                </Button>
            </View>
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
        borderStyle: "solid",
        borderColor: "black",
        padding: 5,
    },
    btnSuccess:{
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        color: "white"
    },
    text:{
        fontSize: 25
    },
    avatar:{
        width: 125,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    content:{
        flex: 1,
        marginTop: "15%",
        alignItems: 'center',
        justifyContent: 'center',
    }

});
