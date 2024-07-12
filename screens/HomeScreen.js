import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [menuVisible, slideAnim]);

  const addToCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      alert('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })} style={styles.product}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
        <Icon name="add-circle-outline" size={30} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => {
          setMenuVisible(!menuVisible);
        }}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            <ScrollView>
              <Text style={styles.menuTitle}>DANIEL KWASHIE</Text>
              <Text style={styles.menuItem}>Store</Text>
              <Text style={styles.menuItem}>Locations</Text>
              <Text style={styles.menuItem}>Blog</Text>
              <Text style={styles.menuItem}>Jewelry</Text>
              <Text style={styles.menuItem}>Electronic</Text>
              <Text style={styles.menuItem}>Clothing</Text>
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Image source={require('../assets/menu_icon.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={require('../assets/open_fashion_logo.png')} style={styles.logo} />
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => console.log('Search pressed')}>
            <Image source={require('../assets/search_icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/shopping_bag_icon.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerActions}>
        <Text style={styles.ourStory}>OUR STORY</Text>
        <TouchableOpacity onPress={() => console.log('Filter pressed')}>
          <View style={styles.circle}>
            <Image source={require('../assets/listview_icon.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('List View pressed')}>
          <View style={styles.circle}>
            <Image source={require('../assets/filter_icon.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 20,
    left: 10,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  product: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 170,
    height: 205,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'light',
    marginVertical: 8,
    right: 10,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    bottom: 3,
    right: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#ff0000',
    marginBottom: 16,
    right: 60,
  },
  addButton: {
    position: 'absolute',
    bottom: 96,
    right: 17,
    top: 170,
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    left: 10,
  },
  menuIcon: {
    width: 25,
    height: 25,
    bottom: 15,
  },
  logo: {
    width: 150,
    height: 60,
    bottom: 13,
    left: 10,
  },
  ourStory: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 20,
    right: 170,
  },
  menuModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: '50%',
    backgroundColor: 'white',
    height: '100%',
    padding: 20,

  },
  closeButton: {
    alignSelf: 'flex-start',
   
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
     top: 20,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10,
    textDecorationLine: 'underline',
    textDecorationColor: 'orange',
    textDecorationStyle: 'solid',
    textDecorationbottom: 50,
     top: 20,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 5,
    marginBottom: 30,
     top: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

export default HomeScreen;
