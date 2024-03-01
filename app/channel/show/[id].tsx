import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import { Text } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Card} from "@gluestack-ui/themed";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Channel} from "@/app/Interface/Channel";
import {Header} from "@expo/html-elements";
import {ChannelMessages} from "@/app/Interface/ChannelMessages";
import ChatBubble from "react-native-chat-bubble";


export default function channel() {
    const [channel ,setChannel] = useState<Channel>()
    const [newMessage,setNewMessage]= useState("")
    const navigation = useRouter()
    const {id}= useLocalSearchParams<{id:string}>()


    useEffect(() => {
        setTimeout(()=>{
            if (!GlobalConstants.isLoggedIn()){
                navigation.push("/login")
            }else {
                getChannel(id)
            }
        },500)
    }, []);

    function getChannel(id:any){
        axiosHttp.get(GlobalConstants.baseUrl+"channel/show/"+id)
            .then((response)=>{
                console.log(response)
                setChannel(response.data)
            })
    }

    function sendNewMessage(){
        if (newMessage != ""){
            axiosHttp.post(
                GlobalConstants.baseUrl+"channel/message/create/"+channel!.id,
                {"content":newMessage}
            )
                .then(()=>{
                    getChannel(id)
                })
        }

    }

    function joinChannel(){
        if (channel?.channelMembers.some(user=>user.relatedTo.username==GlobalConstants.actualUser.username)){
            axiosHttp.post(GlobalConstants.baseUrl+"channel/join/"+id,id)
                .then((response)=>{
                    console.log(response)
                    console.log(channel?.channelMembers)
                    console.log(GlobalConstants.actualUser)
                })
        }
    }


    return (
        <View style={styles.container}>
            <>
                <Header style={styles.topLine}>
                    <Text style={styles.title}>{channel?.name}</Text>
                </Header>
                <FlatList
                    style={styles.list}
                    data={channel?.channelMessages}
                    renderItem={({item}:{item:ChannelMessages})=>
                        <Card style={styles.content}>
                            {item.author.relatedTo.id == GlobalConstants.actualUser.id
                                ?
                                <>
                                    <ChatBubble
                                        isOwnMessage={true}
                                        bubbleColor='#1084ff'
                                        tailColor='#1084ff'
                                        withTail={false}
                                        onPress={() => console.log(item)}
                                        onLongPress={()=>console.log("ouille")}
                                    >
                                        <Text>{item.content}</Text>
                                    </ChatBubble>
                                </>
                                :
                                <>
                                    <ChatBubble
                                        isOwnMessage={false}
                                        bubbleColor='#A3A3A3'
                                        tailColor='#1084ff'
                                        withTail={false}
                                        onPress={() => console.log(item)}
                                        onLongPress={()=>console.log("ouille")}
                                    >
                                        <Text>{item.content}</Text>
                                    </ChatBubble>
                                </>
                            }
                        </Card>
                    }
                />
                {channel?.channelMembers.some(user=>user.relatedTo.username==GlobalConstants.actualUser.username) ?
                    <>
                        <TextInput
                        style={styles.input}
                        placeholder={"Votre message..."}
                        onChangeText={text=>setNewMessage(text)}
                        />
                        <Text
                            style={styles.btnCreate}
                            onPress={sendNewMessage}>
                            Envoyer un message
                        </Text>

                    </>

                    :
                <>
                    <TextInput
                        style={styles.inputDisabled}
                        placeholder={"Rejoignez ce channel avant d'envoyer un message..."}
                        onChangeText={text=>setNewMessage(text)}
                        editable={false}
                    />
                    <Text
                        style={styles.btnCreate}
                        onPress={joinChannel}>
                        Rejoindre ce channel
                    </Text>

                </>
                }
            </>

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
        width: '75%',
        margin: 5,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        color: "black",
        fontSize: 25,
    },
    topLine:{
        width: "100%",
        position: "absolute",
        top: 0,
        display: "flex",
        alignItems: "center",
        borderBottomLeftRadius:5,
        borderBottomRightRadius:0,
        borderTopLeftRadius:0,
        borderTopRightRadius:5,
        borderWidth: 1,
        margin: null,
        alignSelf: "stretch"
    },
    btn:{
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'gray',
        color: "white"
    },
    list:{
        marginTop: 30,
    },
    input:{
        flex: 1,
        width: "75%",
        fontSize: 25,
        borderStyle: "solid",
        borderColor: "gray",
        padding: 5,
        margin: 15,
        borderWidth: 1,
        position: "absolute",
        alignSelf: "stretch",
        bottom:0,

    },
    inputDisabled:{
        flex: 1,
        width: "75%",
        fontSize: 25,
        borderStyle: "solid",
        borderColor: "gray",
        padding: 5,
        margin: 15,
        borderWidth: 1,
        position: "absolute",
        alignSelf: "stretch",
        bottom:0,
        color: "gray"

    },

    content:{
        width:"100%"
    },
    btnCreate:{
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'purple',
        color: "white",
        position: "absolute",
        right: 0,
        bottom:0
    }
});
