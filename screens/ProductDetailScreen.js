import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const addToCart = async () => {
    // Implement your addToCart logic here
    console.log('Product added to cart:', product);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.materials}>MATERIALS</Text>
        <Text style={styles.materialDescription}>
          We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.
        </Text>
        <View style={styles.careInstructionsContainer}>
          <View style={styles.careInstructionRow}>
            <Image source={require('../assets/no_bleach_icon.png')} style={styles.careIcon} />
            <Text style={styles.careInstructions}>Do not use bleach</Text>
          </View>
          <View style={styles.careInstructionRow}>
            <Image source={require('../assets/no_tumble_dry_icon.png')} style={styles.careIcon} />
            <Text style={styles.careInstructions}>Do not tumble dry</Text>
          </View>
          <View style={styles.careInstructionRow}>
            <Image source={require('../assets/dry_clean_icon.png')} style={styles.careIcon} />
            <Text style={styles.careInstructions}>Dry clean with tetrachloroethylene</Text>
          </View>
          <View style={styles.careInstructionRow}>
            <Image source={require('../assets/iron_icon.png')} style={styles.careIcon} />
            <Text style={styles.careInstructions}>Iron at a maximum of 110°C/230°F</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.shippingContainer}>
          <Image source={require('../assets/shipping_icon.png')} style={styles.shippingIcon} />
          <Text style={styles.shipping}>Free Flat Rate Shipping</Text>
        </View>
        <View style={styles.estimatedDeliveryContainer}>
          <Text style={styles.estimatedDelivery}>Estimated to be delivered on</Text>
          <Text style={styles.deliveryDate}>09/11/2021 - 12/11/2021</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addToCart}>
        <Text style={styles.addButtonText}>ADD TO BASKET</Text>
        <Icon name="cart-outline" size={24} color="#fff" style={styles.cartIcon} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productPrice: {
    fontSize: 20,
    color: 'red',
    marginBottom: 8,
  },
  materials: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  materialDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  careInstructionsContainer: {
    marginBottom: 16,
  },
  careInstructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  careIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  careInstructions: {
    fontSize: 14,
    color: '#666',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  shippingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  shippingIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  shipping: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  estimatedDeliveryContainer: {
    marginLeft: 32, // Align with the shipping text
    marginBottom: 16,
  },
  estimatedDelivery: {
    fontSize: 14,
    color: '#666',
  },
  deliveryDate: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    margin: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  cartIcon: {
    marginLeft: 8,
  },
});

export default ProductDetailScreen;
