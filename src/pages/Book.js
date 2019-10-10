import React, { useState } from 'react';

import { SafeAreaView, Text, StyleSheet, StatusBar, Platform, AsyncStorage, TextInput, TouchableOpacity, Alert } from 'react-native';

import api from '../services/api'

export default function Book({ navigation }){
    const id = navigation.getParam('id')
    const [date, setDate] = useState('')

    async function handelSubmit(){
        const user_id = await AsyncStorage.getItem('user')

        await api.post(`/spots/${id}/bookings`,{
            date
        },{
            
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva envida.')

        navigation.navigate('List')
    }

    function handelCancel(){
        navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text> 
            <TextInput 
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity style={styles.button} onPress={handelSubmit} >
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handelCancel} >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        margin: 30,
    },  

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginTop: 20,
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button:{
        height:42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    cancelButton:{
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})