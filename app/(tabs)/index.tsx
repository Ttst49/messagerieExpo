import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

import { View } from '@/components/Themed';
import React from 'react';
import {A, BR} from "@expo/html-elements";


export default function Index() {


  return (
    <View style={styles.container}>
      <Text variant={"bodyLarge"}>
        bienvenue dans cette démonstration d'une messagerie
        en react native avec <A style={styles.link} href={"https://expo.dev"}>expo </A>
         basée sur l'api libre Slackbis
        à retrouver <A style={styles.link} href={"https://github.com/Ttst49/slackBis"}>ici</A>
      </Text>
      <Text variant={"bodyLarge"}>
        Ce produit n'a pas été polie ni finalisé pour le moment,
        des bugs peuvent donc apparaitre.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: "flex"
  },
  link:{
    color: "skyblue"
  }
});
