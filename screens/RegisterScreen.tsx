import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/Config'
import { ref, set } from 'firebase/database'

export default function RegisterScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")
  const [usuario, setusuario] = useState("")
  const [celular, setcelular] = useState("")

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        guardar(user.uid)
        //console.log(user);
        navigation.navigate('Login')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  }

  function guardar(uid: String) {
    set(ref(db, 'usuarios/' + uid), {
      correo: correo,
      usuario: usuario,
      celular: celular
    });
    
  }

  return (
    <View style={styles.container} >
      <Text>Registro</Text>
      <TextInput placeholder='Ingresar el correo' onChangeText={(texto) => setcorreo(texto)} style={styles.txt} />
      <TextInput placeholder='Ingresar la contrasenia' onChangeText={(texto) => setcontrasenia(texto)} style={styles.txt} />
      <TextInput placeholder='Ingresar el usuario' onChangeText={(texto) => setusuario(texto)} style={styles.txt} />
      <TextInput placeholder='Ingresar el celular' onChangeText={(texto) => setcelular(texto)} style={styles.txt} />
      <Button title='Registro' onPress={() => registro()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '##aeb290',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txt: {
    backgroundColor: "#f0f99a",
    fontSize: 30,
    width: "80%",
    margin: 5,
  },
})