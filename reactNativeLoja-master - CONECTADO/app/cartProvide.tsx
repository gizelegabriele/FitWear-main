// CartContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definindo o tipo de um produto no carrinho
type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Definindo o tipo do contexto do carrinho
type CartContextType = {
  cartItems: Product[];  // Lista de itens no carrinho
  addToCart: (product: Product) => void;  // Função para adicionar um produto ao carrinho
  removeFromCart: (productId: string) => void;  // Função para remover um produto do carrinho
  updateQuantity: (productId: string, quantity: number) => void;  // Função para atualizar a quantidade de um produto no carrinho
  getTotal: () => number;  // Função para calcular o total do carrinho
};

// Criando o contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Definindo o tipo do CartProvider para aceitar a propriedade 'children'
type CartProviderProps = {
  children: ReactNode;  // Tipando 'children' como ReactNode
};

// Criando o provedor do carrinho
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Adicionar um produto ao carrinho
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remover um produto do carrinho
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  // Atualizar a quantidade de um produto no carrinho
  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) => prevItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  // Calcular o total do carrinho
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getTotal }}>
      {children}  {/* Torna o estado do carrinho acessível a todos os componentes filhos */}
    </CartContext.Provider>
  );
};

// Hook customizado para acessar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
