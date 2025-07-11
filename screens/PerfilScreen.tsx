import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../firebase/Config'
import { onValue, ref } from 'firebase/database'

export default function PerfilScreen({ navigation }: any) {
    const [usuario, setusuario] = useState("")
    const [correo, setcorreo] = useState("")
    const [celular, setcelular] = useState("")

    function logout() {
        signOut(auth)
            .then(() => {
                navigation.navigate('Home')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid
                leer(uid)
            }
        })
    }, [])

    function leer(uid: string) {
        const starCountRef = ref(db, 'usuarios/' + uid)
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            setusuario(data.usuario)
            setcorreo(data.correo)
            setcelular(data.celular)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.titulo}>Información de Perfil</Text>
                <Text style={styles.txt}>Usuario: {usuario}</Text>
                <Text style={styles.estado}>Estado: Activo</Text>
                <Text>Bienvenido</Text>
                <Text>Autorización de uso de datos</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.subtitulo}>Mantén actualizada tu información</Text>
                <Text style={styles.txt}>Correo: {correo}</Text>
                <Text style={styles.txt}>Celular: {celular}</Text>
            </View>

            <Button title='Cerrar sesión' color="#b71c1c" onPress={logout} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    txt: {
        fontSize: 18,
        marginBottom: 6,
    },
    estado: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10,
    },
})
