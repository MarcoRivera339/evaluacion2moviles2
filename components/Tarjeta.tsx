import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
  datos: {
    id: string
    precio: string
    cantidad: string
    descripcion: string
  }
}

export default function Tarjeta({ datos }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.texto}>ID: {datos.id}</Text>
      <Text style={styles.texto}>Precio: {datos.precio}</Text>
      <Text style={styles.texto}>Cantidad: {datos.cantidad}</Text>
      <Text style={styles.texto}>Descripción: {datos.descripcion}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 8,
  },
  texto: {
    fontSize: 16,
    marginBottom: 4,
  },
})
