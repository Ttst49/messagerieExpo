import {useState} from "react";
import {Button, TextInput, View,StyleSheet} from "react-native";
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {useRouter} from "expo-router";

export default function register() {
    const [channelName,setChannelName]= useState("")
    const navigation = useRouter()

    async function createChannel(){
        await axiosHttp.post(GlobalConstants.baseUrl+"channel/create", {"name":channelName})
            .then((response)=>{
                console.log(response)
            })
        navigation.push('/channel')
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={channelName}
                placeholder="Nom du channel"
                onChangeText={text => setChannelName(text)}
            />
            <Button onPress={createChannel} title="Create Channel" />
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
        borderColor: "black",
        padding: 5,
    },

});
