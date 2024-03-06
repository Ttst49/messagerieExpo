import {useRouter} from "expo-router";
import React, {useEffect, useState} from "react";
import {User} from "@/app/Interface/User";
import {GlobalConstants} from "@/app/common/Global-constants";
import axiosHttp from "@/app/auth/interceptor";
import {Text, FlatList, View, StyleSheet} from "react-native";
import {Div} from "@expo/html-elements";
import {Avatar, Button, FAB} from "react-native-paper";
import {Feather} from "@expo/vector-icons";

export default function user() {
    const navigation = useRouter()
    const [users,setUsers]= useState<User[]>([])
    const [friends,setFriends]=useState<User[]>([])

    useEffect(() => {
        setTimeout(()=>{
            if (!GlobalConstants.isLoggedIn()){
                navigation.push("/login")
            }else {
                getAllUsers()
                getFriends()
            }
        },500)
    }, []);

    function getAllUsers(){
        axiosHttp.get(GlobalConstants.baseUrl+"profile/showAll")
            .then((response)=>{
                console.log(response)
                setUsers(response.data)
            })
    }

    function getFriends(){
        axiosHttp.get(GlobalConstants.baseUrl+"relations/getFriends")
            .then((response)=>{
                console.log(response)
                setFriends(response.data)
            })
    }

    function sendFriendRequest(id:number){}


    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Users
            </Text>
            <View style={styles.content}>
                <FlatList
                    data={users}
                    renderItem={({item}:{item:User})=>
                        <>
                            {friends.some((user)=>user.username==item.username)

                                ?
                                    <Div style={styles.avatar}>
                                            <Avatar.Text size={48} label={item.username[0]} />
                                            <Feather size={32} name={"user-check"} />
                                            <Text style={styles.text}>{item.username}</Text>
                                    </Div>
                                :
                                <Div style={styles.avatar}>
                                    <Avatar.Text size={48} label={item.username[0]} />
                                    <Feather size={32} name={"user-plus"} onLongPress={SendFriendRequest(item.id)} />
                                    <Text style={styles.text}>{item.username}</Text>
                                </Div>
                            }

                        </>
                    }
                />
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
        width: 250,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    content:{
        flex: 1,
        marginTop: "15%",
        alignItems: 'center',
        justifyContent: 'center',
    }

});
