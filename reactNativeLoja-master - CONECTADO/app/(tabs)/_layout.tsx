import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import { TouchableOpacity, View, Text } from 'react-native';
import MenuHeader from '../../components/MenuHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Defina o tipo de navegação para o seu stack de navegação
type RootStackParamList = {
  home: undefined;
  favorites: undefined;
  profile: undefined;
  cart: undefined;
  payment: undefined;  
};

export default function TabLayout() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#000000',
            height: 50,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          headerStyle: {
            backgroundColor: '#000000',
            height: 45,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTitle: () => (
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
              FITWEAR
            </Text>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 10, alignItems: 'center', flexDirection: 'row' }}>
              <MenuHeader />
            </View>
          ),
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        {/* Aba Home */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="home-outline"
                size={24}
                color={focused ? 'white' : 'gray'}
              />
            ),
          }}
        />

        {/* Aba Favoritos */}
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favoritos',
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                color={focused ? 'white' : 'gray'}
              />
            ),
          }}
        />

        {/* Aba Perfil */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color={focused ? 'white' : 'gray'}
              />
            ),
          }}
        />

        {/* Aba Carrinho */}
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Carrinho',
            tabBarLabel: 'Carrinho',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="cart-outline"
                size={24}
                color={focused ? 'white' : 'gray'}
              />
            ),
          }}
        />

        {/* Aba Pagamento */}
        <Tabs.Screen
          name="CartScreen"
          options={{
            title: 'Pagamento',
            tabBarLabel: 'Pagamento',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={24}
                color={focused ? 'white' : 'gray'}
              />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
