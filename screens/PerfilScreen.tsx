import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/Config';
import { onValue, ref } from 'firebase/database';

export default function PerfilScreen({ navigation }: any) {
    const [usuario, setusuario] = useState("")
    const [correo, setcorreo] = useState("")
    const [celular, setcelular] = useState("")

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.navigate('Home')
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                leer(uid)

            } else {
                // User is signed out
                // ...
            }
        });

    }, [])

    function leer(uid: String) {
        const starCountRef = ref(db, 'usuarios/' + uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setusuario(data.usuario)
            setcorreo(data.correo)
            setcelular(data.celular)

        });
    }

    return (
        <View>
            <View>
                <Text>Informacion de Perfil</Text>
                <Text style={styles.txt}>Usuario:{usuario}</Text>
                <Text>Bienvenido</Text>
                <Text>Autorizacion de uso de datos</Text>
            </View>
            <View>
                <Text>Manten actualizada tu informacion</Text>
                <Text style={styles.txt}>Correo:{correo}</Text>
                <Text style={styles.txt}>Celular:{celular}</Text>
            </View>
            <Button title='cerrar sesion' onPress={() => logout()} />
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 25
    }
})