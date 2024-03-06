import React, {useEffect, useState} from "react";
import {Group} from "@/app/Interface/Group";
import {useLocalSearchParams, useRouter} from "expo-router";
import {GlobalConstants} from "@/app/common/Global-constants";
import axiosHttp from "@/app/auth/interceptor";
import {FlatList, View, StyleSheet} from "react-native";
import {Div, Header, Span} from "@expo/html-elements";
import {Avatar, Button, Text, TextInput} from "react-native-paper";
import {GroupMessage} from "@/app/Interface/GroupMessage";
import ChatBubble from "react-native-chat-bubble";
import {Card} from "@gluestack-ui/themed";


export default function channel() {
    const [newMessage,setNewMessage]= useState("")
    const [group ,setGroup] = useState<Group>()
    const navigation = useRouter()
    const {id}= useLocalSearchParams<{id:string}>()
    let name:string

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
                console.log(response)
                setGroup(response.data)
            })
    }

    function sendNewMessage(){
        if (newMessage != ""){
            axiosHttp.post(
                GlobalConstants.baseUrl+"group/message/send/"+group!.id,
                {"content":newMessage}
            )
                .then(()=>{
                    getGroup(id)
                })
        }

    }


    return (
        <View style={styles.container}>
            <>
                <Header style={styles.topLine}>
                    <Text
                        variant={"titleMedium"}
                        style={styles.title}>Group</Text>
                </Header>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    data={group?.groupMessages}
                    renderItem={({item}:{item:GroupMessage})=>
                        <Card style={styles.content}>
                            {item.author.relatedTo.id != GlobalConstants.currentUser.id
                                ?
                                <>
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
                                        onLongPress={()=>console.log("ouille")}
                                    >
                                        <Text>{item.content}</Text>
                                    </ChatBubble>
                                </>
                                :
                                <>
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
                                        onLongPress={()=>console.log("ouille")}
                                    >
                                        <Text>{item.content}</Text>
                                    </ChatBubble>
                                </>
                            }
                        </Card>
                    }
                />
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
            </>
        </View>
    );
}

const styles = StyleSheet.create({
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
        alignItems: "center"
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
