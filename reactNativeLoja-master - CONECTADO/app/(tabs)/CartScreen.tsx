import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useCart } from '../(tabs)/cartContext';
import axios from 'axios'

const CartScreen: React.FC = () => {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'Retirada' | 'Entrega'>('Retirada');
  const [paymentMethod, setPaymentMethod] = useState<'Cartão' | 'Pix' | 'Boleto'>('Cartão');


  const finalizePurchase = async () => {
    try {
      const response = await axios.post('http:// 10.0.0.142/api/buy', {
        items: cart,
        total: getTotal(),
        deliveryMethod,
        paymentMethod,
      });
  
      if (response.status !== 201) {
        throw new Error('Erro ao registrar a compra');
      }
  
      setPurchaseConfirmed(true);
      clearCart();
      setTimeout(() => setPurchaseConfirmed(false), 3000);
    } catch (error) {
      console.error('Erro ao finalizar a compra:', error);
      // Aqui você pode exibir uma mensagem de erro para o usuário
    }
  };
  

  const renderItem = ({ item }: { item: { id: number; name: string; price: number; quantity: number } }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>Preço: R$ {item.price.toFixed(2)}</Text>
      <Text style={styles.itemDetails}>Quantidade: {item.quantity}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Carrinho de Compras</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Seu carrinho está vazio!</Text>
      ) : (
        <FlatList data={cart} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      )}

      <Text style={styles.totalText}>Total: R$ {getTotal().toFixed(2)}</Text>
      
      <View style={styles.optionsContainer}>
        <Text style={styles.optionTitle}>Escolha o tipo de entrega:</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity style={[styles.optionButton, deliveryMethod === 'Retirada' && styles.selected]} onPress={() => setDeliveryMethod('Retirada')}>
            <Text style={styles.optionText}>Retirada na loja</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionButton, deliveryMethod === 'Entrega' && styles.selected]} onPress={() => setDeliveryMethod('Entrega')}>
            <Text style={styles.optionText}>Entrega</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.optionTitle}>Escolha a forma de pagamento:</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity style={[styles.optionButton, paymentMethod === 'Cartão' && styles.selected]} onPress={() => setPaymentMethod('Cartão')}>
            <Text style={styles.optionText}>Cartão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionButton, paymentMethod === 'Pix' && styles.selected]} onPress={() => setPaymentMethod('Pix')}>
            <Text style={styles.optionText}>Pix</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionButton, paymentMethod === 'Boleto' && styles.selected]} onPress={() => setPaymentMethod('Boleto')}>
            <Text style={styles.optionText}>Boleto</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={styles.clearButton} onPress={finalizePurchase}>
        <Text style={styles.clearButtonText}>Finalizar Compra</Text>
      </TouchableOpacity>
      
      {purchaseConfirmed && (
        <View style={styles.purchaseMessage}>
          <Text style={styles.purchaseMessageText}>Compra Aprovada! 🎉</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold' },
  emptyCartText: { marginTop: 20, textAlign: 'center' },
  totalText: { fontSize: 18, marginTop: 20 },
  cartItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemDetails: { fontSize: 14, color: 'gray' },
  removeButton: { marginTop: 5, padding: 5, backgroundColor: 'red', borderRadius: 5 },
  removeButtonText: { color: 'white', textAlign: 'center' },
  clearButton: { marginTop: 20, padding: 10, backgroundColor: 'black', borderRadius: 5 },
  clearButtonText: { color: 'white', textAlign: 'center' },
  optionsContainer: { marginTop: 20 },
  optionTitle: { fontSize: 16, fontWeight: 'bold' },
  optionRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  optionButton: { padding: 10, backgroundColor: '#ccc', borderRadius: 5 },
  selected: { backgroundColor: '#5dc1b9' },
  optionText: { color: 'white' },
  purchaseMessage: { marginTop: 20, padding: 10, backgroundColor: 'green', borderRadius: 5 },
  purchaseMessageText: { color: 'white', textAlign: 'center', fontSize: 16 },
});

export default CartScreen;