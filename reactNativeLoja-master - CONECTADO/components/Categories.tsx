import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const categories = [
  { name: 'Camisetas', image: require('../assets/images/produtos/camiseta5.png') },
  { name: 'Leggings', image: require('../assets/images/produtos/leg3.png') },
  { name: 'Regatas', image: require('../assets/images/produtos/regata5.png') },
  { name: 'Tops', image: require('../assets/images/produtos/top2.png') },
  { name: 'Shorts', image: require('../assets/images/produtos/short3.png') },
  { name: 'Blusas', image: require('../assets/images/produtos/blusa4.png') },
  { name: 'Danones', image: require('../assets/images/seringa1.jpg') },
];

const Categories = () => {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.categoryContainer}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
          <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
   
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 20,
    margin: 10
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Categories;
