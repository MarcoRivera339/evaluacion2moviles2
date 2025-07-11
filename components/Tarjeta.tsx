import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

type Props = {
  datos: {
    id: string
    precio: string
    cantidad: string
    descripcion: string
  }
}

export default function Tarjeta({ datos }: Props) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <Text style={styles.texto}>ID: {datos.id}</Text>
        <Text style={styles.texto}>Precio: {datos.precio}</Text>
        <Text style={styles.texto}>Cantidad: {datos.cantidad}</Text>
        <Text style={styles.texto}>Descripción: {datos.descripcion}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalle del Producto</Text>
            <Text style={styles.texto}>ID: {datos.id}</Text>
            <Text style={styles.texto}>Precio: {datos.precio}</Text>
            <Text style={styles.texto}>Cantidad: {datos.cantidad}</Text>
            <Text style={styles.texto}>Descripción: {datos.descripcion}</Text>

            <TouchableOpacity style={styles.btnCerrar} onPress={() => setModalVisible(false)}>
              <Text style={styles.btnTexto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  btnCerrar: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#c62828',
    borderRadius: 5,
  },
  btnTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
