import {StyleSheet, Text} from 'react-native';

import { View } from '@/components/Themed';
import React from 'react';


export default function Index() {


  return (
    <View style={styles.container}>
      <Text style={styles.text}>bienvenue</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    textTransform: 'uppercase',
  }
});
