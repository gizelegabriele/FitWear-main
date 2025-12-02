import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const Register = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword || !cpf) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cpf)) {
            Alert.alert('Erro', 'CPF inválido. Formato esperado: XXX.XXX.XXX-XX');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'E-mail inválido.');
            return;
        }

        try {
            const response = await fetch('http://192.168.0.9:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, cpf, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert('Erro', data.error || 'Falha no registro.');
                return;
            }

            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            router.replace('/(tabs)/home');
        } catch (error) {
            console.error("Erro ao conectar com o servidor", error);
            Alert.alert('Erro', 'Erro ao conectar com o servidor.');
        }
    };

    return (
        <LinearGradient
            colors={['#DBDBD3', '#C9C9C2', '#B8B8B1', '#A7A7A1', '#979792', '#8A8A85', '#646462']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.formContainer}>
                {/* LOGO */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/logo2.png')}
                        style={styles.logo}
                    />
                </View>

                {/* TÍTULO */}
                <Text style={styles.title}>Registrar</Text>

                {/* CAMPOS */}
                <TextInput 
                    style={styles.input} 
                    placeholder="Nome Completo*" 
                    placeholderTextColor="#666"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="E-mail*" 
                    placeholderTextColor="#666" 
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="CPF*" 
                    placeholderTextColor="#666" 
                    keyboardType="numeric"
                    value={cpf}
                    onChangeText={setCpf}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Senha*" 
                    placeholderTextColor="#666" 
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Repetir Senha*" 
                    placeholderTextColor="#666" 
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {/* BOTÕES */}
                <TouchableOpacity 
                    onPress={handleRegister} 
                    style={styles.registerButton}
                >
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => router.replace('/welcome')} 
                    style={styles.backButton}
                >
                    <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFF',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#CCC',
    },
    registerButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 15,
    },
    backButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Register;