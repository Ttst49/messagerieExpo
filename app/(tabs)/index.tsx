import {Button, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import axios from "axios";
import React, {useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";


export default function TabOneScreen() {

  const [joke,setJoke] = useState("")

  function callJoke(){
    axios.get("https://api.chucknorris.io/jokes/random")
        .then(response=>{
          setJoke(response.data.value)
        })
  }


  return (
    <View style={styles.container}>
      <Text>Coucou</Text>
      {!GlobalConstants.isLoggedIn() ? <Text>Not logged in</Text> : <Text>Logged in</Text>}
      <Button onPress={()=>{console.log(GlobalConstants.token)}}  title="Test"/>
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
});
