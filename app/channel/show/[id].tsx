import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Card} from "@gluestack-ui/themed";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Channel} from "@/app/Interface/Channel";
import {Div, Header, Span} from "@expo/html-elements";
import {ChannelMessages} from "@/app/Interface/ChannelMessages";
import {Button, TextInput, Text, Avatar, Menu, PaperProvider, Tooltip} from 'react-native-paper';
import ChatBubble from 'react-native-chat-bubble';


export default function channel() {
    const [channel ,setChannel] = useState<Channel>()
    const [newMessage,setNewMessage]= useState("")
    const navigation = useRouter()
    const {id}= useLocalSearchParams<{id:string}>()
    const [visible, setVisible] = React.useState(false);

    function openMenu(){
        setVisible(!visible)
    }
    function closeMenu(){
        setVisible(!visible)
    }

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
        if (channel?.channelMembers.some(user=>user.relatedTo.username==GlobalConstants.currentUser.username)){
            axiosHttp.post(GlobalConstants.baseUrl+"channel/join/"+id,id)
                .then((response)=>{
                    console.log(response)
                    console.log(channel?.channelMembers)
                    console.log(GlobalConstants.currentUser)
                })
        }
    }


    return (
        <View style={styles.container}>
            <>
                <Header style={styles.topLine}>
                    <Text variant={"titleMedium"} style={styles.title}>{channel?.name}</Text>
                </Header>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    data={channel?.channelMessages}
                    renderItem={({item}:{item:ChannelMessages})=>
                        <Card style={styles.content}>
                            {item.author.relatedTo.id == GlobalConstants.currentUser.id
                                ?
                                <PaperProvider>
                                    <Span style={styles.right}>
                                        <Avatar.Text size={32} label={item.author.relatedTo.username[0]} />
                                    </Span>
                                    <ChatBubble
                                        style={styles.bubble}
                                        isOwnMessage={true}
                                        bubbleColor='#1084ff'
                                        tailColor='#1084ff'
                                        withTail={false}
                                        onPress={() => console.log(item)}
                                        onLongPress={()=>openMenu}
                                    >
                                        <Text>{item.content}</Text>
                                    </ChatBubble>
                                </PaperProvider>
                                :
                                <PaperProvider>
                                    <Span style={styles.left}>
                                        <Avatar.Text size={32} label={item.author.relatedTo.username[0]} />
                                    </Span>
                                    <ChatBubble
                                        style={styles.bubble}
                                        isOwnMessage={false}
                                        bubbleColor='#A3A3A3'
                                        tailColor='#1084ff'
                                        withTail={false}
                                        onPress={() => console.log(item)}
                                        onLongPress={()=>openMenu}
                                    >
                                        <Text>{item.content}</Text>
                                    </ChatBubble>
                                </PaperProvider>
                            }
                        </Card>
                    }
                />
                {channel?.channelMembers.some(user=>user.relatedTo.username==GlobalConstants.currentUser.username) ?
                    <Div style={styles.bottom}>
                        <TextInput
                            style={styles.input}
                            placeholder={"Votre message..."}
                            onChangeText={value=>setNewMessage(value)}
                            mode={"outlined"}
                        />
                        <Button
                            icon={"send"}
                            mode={"elevated"}
                            onPress={sendNewMessage}>
                            Envoyer
                        </Button>

                    </Div>

                    :
                <Div style={styles.bottom}>
                    <TextInput
                        style={styles.inputDisabled}
                        placeholder={"Rejoignez ce channel avant d'envoyer un message..."}
                        disabled={true}
                        mode={"outlined"}
                    />
                    <Button
                        mode={"elevated"}
                        onPress={joinChannel}>
                        Rejoindre
                    </Button>

                </Div>
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
        width: "100%"
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
        borderBottomWidth: 1,
        display: "flex",
        alignItems: "center",
        zIndex: 50
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
        width: "90%"
    },
    input:{
      width: "50%"
    },

    inputDisabled:{
        width: "50%",
    },

    content:{
        width:"100%",
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
    },
    bubble:{
        width:"50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    bottom:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 10
    },
    right:{
        width:"100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    left:{
        width:"100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
    }
});
