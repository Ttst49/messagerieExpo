import {Button, StyleSheet, TextInput} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import axios from "axios";
import {GlobalConstants} from "@/app/common/Global-constants";
import {useState} from "react";
import {User} from "@/app/Interface/User";
import {black} from "colorette";

export default function TabTwoScreen() {
  const [username,setUsername]= useState("")
  const [password,setPassword]= useState("")

  function login(){
    const user = {username,password}
    axios.post(GlobalConstants.baseUrl+"token",user)
        .then((response)=>{
          console.log(response)

        })
  }


  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          value={username}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
      />
      <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
      />
        <Button onPress={login} title="Connexion" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input:{
    borderStyle: "solid",
    borderColor: "black",
    padding: 5,
  }

});
