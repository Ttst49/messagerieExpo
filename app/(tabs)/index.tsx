import {Button, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import axios from "axios";
import React, {useState} from 'react';
import axiosHttp from "@/app/auth/interceptor";
import {GlobalConstants} from "@/app/common/Global-constants";
import {Channel} from "@/app/Interface/Channel";


export default function TabOneScreen() {
  const [channels ,setChannels] = useState([])

  function showChannels(){
    axiosHttp.get(GlobalConstants.baseUrl+"channel/showAll")
        .then((response)=>{
          console.log(response)
          setChannels(response.data)
        })
  }

  return (
    <View style={styles.container}>
      <Button title="Voir tous les channels" onPress={showChannels} />
      {channels.map((channel:Channel)=>(
          <Text style={styles.channelCard} key={channel.id}>{channel.name}</Text>
      ))}
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
  channelCard:{
    height: 100,
    width: '50%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  }
});
