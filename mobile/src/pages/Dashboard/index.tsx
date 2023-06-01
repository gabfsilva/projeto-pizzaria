import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes';

import { api } from '../../services/api';

export default function Dashboard() {
	const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

	const [table, setTable] = useState('');
	const [error, setError] = useState('');

	async function openOrder() {
		if(table === '') {
			setError('Por favor informe uma mesa!');
			return;
		} 

		const response = await api.post('/order', {
			table: Number(table)
		});

		navigation.navigate('Order', { table: table, order_id: response.data.id });

		setTable('');
		setError('');

	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Novo Pedido</Text>
			<TextInput
				placeholder='Número da Mesa'
				placeholderTextColor='#F0F0F0'
				style={styles.input}
				keyboardType='numeric'
				value={table}
				onChangeText={setTable}
			/>

			{error !== '' && <Text style={styles.errorText}>{error}</Text>}

			<TouchableOpacity style={styles.button} onPress={openOrder}>
				<Text style={styles.buttonText}>Abrir Mesa</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
		backgroundColor: '#1D1D2E'
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#FFF',
		marginBottom: 24
	},
	input: {
		width: '90%',
		height: 60,
		backgroundColor: '#101026',
		borderRadius: 6,
		paddingHorizontal: 8,
		textAlign: 'center',
		fontSize: 22,
		color: '#FFF',
		borderWidth: 1,
		borderColor: '#8A8A8A'
	},
	button: {
		width: '90%',
		height: 50,
		backgroundColor: '#3fffa3',
		borderRadius: 4,
		marginVertical: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontSize: 18,
		color: '#101026',
		fontWeight: 'bold'
	},
	errorText: {
    color: 'red',
    marginBottom: 12
  }
})