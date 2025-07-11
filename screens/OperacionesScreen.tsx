import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, ref, set } from 'firebase/database'
import { auth, db } from '../firebase/Config'
import { onAuthStateChanged } from 'firebase/auth'

export default function OperacionesScreen({ navigation }: any) {
    const [uid, setuid] = useState("")
    const [precio, setprecio] = useState("")
    const [cantidad, setcantidad] = useState("")
    const [descripcion, setdescripcion] = useState("")

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setuid(user.uid)
            }
        })
    }, [])

    function guardar(uid: string) {
        const precioNum = parseFloat(precio)

        if (isNaN(precioNum)) {
            Alert.alert("Error", "El precio ingresado no es válido")
            alert("El precio ingresado no es válido")
            return
        }

        if (precioNum < 0) {
            Alert.alert("Error", "El precio no puede ser negativo")
            alert("El precio no puede ser negativo")
            return
        }

        if (precioNum < 1 || precioNum > 20) {
            Alert.alert(
                "Precio fuera del rango",
                `El precio ingresado es $${precioNum}. ¿Desea continuar con la operación?`,
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Sí", onPress: () => guardarEnFirebase(uid) }
                ]
            )
            alert(
                "Precio fuera del rango")
        } else {
            guardarEnFirebase(uid)
        }
    }

    function guardarEnFirebase(uid: string) {
        const id = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14)

        set(ref(db, 'usuarios/' + uid + "/productos/" + id), {
            precio: precio,
            cantidad: cantidad,
            descripcion: descripcion,
        }).then(() => {
            Alert.alert("Registro exitoso", "Producto guardado correctamente")
        }).catch((error) => {
            Alert.alert("Error", "No se pudo guardar el producto")
            console.error(error)
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Agregar Producto</Text>

            <TextInput
                placeholder='Ingresar el precio'
                onChangeText={setprecio}
                keyboardType='numeric'
                style={styles.input}
                value={precio}
            />

            <TextInput
                placeholder='Ingresar la cantidad'
                onChangeText={setcantidad}
                keyboardType='numeric'
                style={styles.input}
                value={cantidad}
            />

            <TextInput
                placeholder='Ingresar la descripción'
                onChangeText={setdescripcion}
                style={styles.input}
                value={descripcion}
            />

            <Button title='Guardar' onPress={() => guardar(uid)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontSize: 18,
        backgroundColor: '#e0e0e0',
        margin: 6,
        width: "90%",
        padding: 10,
        borderRadius: 5,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20
    }
})
