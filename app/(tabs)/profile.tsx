import {Button, StyleSheet, Text, TextInput} from 'react-native';
import {View } from '@/components/Themed';
import axios from "axios";
import {useState} from "react";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Link} from "expo-router";


export default function profile() {


    return (
        <View style={styles.container}>
            {GlobalConstants.isLoggedIn()
                ?
                <View>
                    <Text>Welcome {GlobalConstants.actualUser.username}</Text>
                </View>
                :
                <View>
                    <Text>Not logged in</Text>
                </View>
            }
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

});
