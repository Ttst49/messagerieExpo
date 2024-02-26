import {Button, StyleSheet, TextInput} from 'react-native';
import {View } from '@/components/Themed';
import axios from "axios";
import {useState} from "react";
import {GlobalConstants} from "@/app/common/Global-constants";


export default function TabTwoScreen() {
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")

    function login(){
    const user = {username,password}
    axios.post(GlobalConstants.baseUrl+"login_check",user)
        .then((response)=>{
          console.log(response)
          GlobalConstants.token = response.data.token
        })
    }

    function register(){
        const user = {username,password}
        axios.post(GlobalConstants.baseUrl+"register",user)
            .then((response)=>{
            console.log(response.data)
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
        <Button onPress={register} title="Register" />
        <Button onPress={login} title="Login" />
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
