import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase/Config'
import { onValue, ref } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import Tarjeta from '../components/Tarjeta'

export default function ProductosScreen() {
  const [datos, setDatos] = useState<Producto[]>([])
  const [uid, setUid] = useState("")

  type Producto = {
    id: string
    precio: string
    cantidad: string
    descripcion: string
  }

  function leer(uid: string) {
    const productosRef = ref(db, `usuarios/${uid}/productos/`)
    onValue(productosRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const arreglo: Producto[] = Object.keys(data).map((id) => ({
          id,
          ...data[id]
        }))
        setDatos(arreglo)
      } else {
        setDatos([])
      }
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
        leer(user.uid)
      } else {
        Alert.alert("Error", "No se encontró usuario autenticado")
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Productos Registrados</Text>
      <FlatList
        data={datos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Tarjeta datos={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tarjeta: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  texto: {
    fontSize: 16,
    marginBottom: 4,
  },
})
