import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Welcome = () => {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#DBDBD3', '#C9C9C2', '#B8B8B1', '#A7A7A1', '#979792', '#8A8A85', '#646462']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/logo2.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => router.replace('/login')} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.replace('/register')} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Cadastrar-se</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50, // Aumentando o espaço abaixo da logo
    },
    logo: {
        width: 250,
        height: 250,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 50, // Descendo os botões
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF', // Branco
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000', // Borda preta para o botão branco
    },
    registerButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#000', // Preto
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#000', // Preto (contraste com fundo branco)
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButtonText: {
        color: '#FFF', // Branco (contraste com fundo preto)
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Welcome;
