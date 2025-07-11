import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground source={require('../assets/images/bienvenido-digital (1).png') } style={styles.fondo}>
      <Button title='Login' onPress={() => navigation.navigate('Login')} />
      <Button title='Registro' onPress={() => navigation.navigate('Register')} color={'green'} />
        <Text>Desarrollado por: Marco Rivera</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width:"100%",
    height:"100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})