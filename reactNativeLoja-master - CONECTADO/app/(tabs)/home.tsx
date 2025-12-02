import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Categories from '../../components/Categories';
import { RootStackParamList } from '../(tabs)/types';
import { useCart } from '../(tabs)/cartContext';  // Importa o contexto do carrinho

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'home'>;

const products = [
  { id: 1, name: 'Camiseta Dry Fit Gola V Reflective - Preto', image: require('../../assets/images/produtos/camiseta5.png'), price: 164.90 },
  { id: 2, name: 'Camiseta Tech Modal Winter - Branco', image: require('../../assets/images/produtos/camiseta2.png'), price: 169.90 },
  { id: 3, name: 'Legging Seamless Training - Cinza', image: require('../../assets/images/produtos/leg3.png'), price: 229.90 },
  { id: 4, name: 'Legging Seamless Tech - Preto', image: require('../../assets/images/produtos/leg4.png'), price: 209.90 },
  { id: 5, name: 'Regata Dry Army Neck - Off-White', image: require('../../assets/images/produtos/regata4.png'), price: 144.90 },
  { id: 6, name: 'Regata Dry Army Neck - Preto', image: require('../../assets/images/produtos/regata5.png'), price: 144.90 },
  { id: 7, name: 'Top Seamless Adaptive - Marrom', image: require('../../assets/images/produtos/top5.png'), price: 189.90 },
  { id: 8, name: 'Top Seamless Mesh - Mescla', image: require('../../assets/images/produtos/top2.png'), price: 189.90 },
  { id: 9, name: 'Shorts Poliamida Reflective - Preto', image: require('../../assets/images/produtos/short3.png'), price: 259.90 },
  { id: 10, name: 'Shorts Eco Tech Jogger - Carbox', image: require('../../assets/images/produtos/short4.png'), price: 259.90 }, 
  { id: 11, name: 'Cropped Manga Curta Dry Athleisure - Off-White', image: require('../../assets/images/produtos/blusa4.png'), price: 139.90 },
  { id: 12, name: 'Cropped Manga Curta Dry Athleisure - Chumbo', image: require('../../assets/images/produtos/blusa5.png'), price: 139.90 },
  { id: 13, name: 'Clenbuterol 200mcg/ml (30ml)', image: require('../../assets/images/clenbuterol.jpg'), price: 274.45 },
  { id: 14, name: 'Deca-Durabolin 50mg/ml (1ml)', image: require('../../assets/images/deca.png'), price: 172.90 },
  { id: 15, name: 'Durateston 250mg/ml (10ml)', image: require('../../assets/images/durateston.jpg'), price: 129.90 },
  { id: 16, name: 'Kit 15 Seringas + Agulha Hipodérmicas + Gase', image: require('../../assets/images/kit.png'), price: 24.90 },
];

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { addToCart } = useCart(); // Usa o contexto do carrinho
  const [showMessage, setShowMessage] = useState<boolean>(false); // Estado para mostrar a mensagem

  // Função para adicionar ao carrinho
  const handleAddToCart = (product: { id: number; name: string; price: number; image: any }) => {
    addToCart({ ...product, quantity: 1 }); // Adiciona o produto ao contexto
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/images/banner.jpeg')} style={styles.logo} />
      <Categories />

      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Item adicionado ao carrinho!</Text>
        </View>
      )}

      <View style={styles.productListContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <ImageBackground source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(product)}
            >
              <Text style={styles.addToCartText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c6c6c6',
    padding: 10,
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    paddingBottom: 16,
  },
  productImage: {
    width: '100%',
    aspectRatio: 0.75,
    backgroundColor: 'gray',
    borderRadius: 16,
  },
  productName: {
    color: '#200916',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  productPrice: {
    color: '#000000',
    fontSize: 14,
  },
  addToCartButton: {
    backgroundColor: 'black',
    paddingVertical: 8,
    borderRadius: 9999,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
  },
  messageContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 16,
    alignSelf: 'center',
  },
});

export default Home;
