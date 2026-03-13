import { Badge, BadgeText } from '@/components/badge';
import { Box } from '@/components/box';
import { Button, ButtonText } from '@/components/button';
import { Divider } from '@/components/divider';
import { HStack } from '@/components/hstack';
import { Text } from '@/components/text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { VStack } from '@/components/vstack';
import Watermark from '@/components/watermark';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: any;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Caps with magnetic marker',
    price: 1150.00,
    description: 'mix brand, caps',
    category: 'Accessories',
    image: require('@/assets/images/favicon.png'), // Placeholder
  },
  {
    id: '2',
    name: 'T shirt, sea blue',
    price: 1150.00,
    description: 'polyester licrea',
    category: 'Apparel',
    image: require('@/assets/images/favicon.png'), // Placeholder
  },
  {
    id: '3',
    name: 'shoes for golf',
    price: 3456.00,
    description: 'fxcvb',
    category: 'Equipment',
    image: require('@/assets/images/favicon.png'), // Placeholder
  },
];

export default function ShopScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const message = `Hello, I'd like to order:\n${cart
      .map((item) => `- ${item.product.name} (x${item.quantity}): ₹${(item.product.price * item.quantity).toLocaleString()}`)
      .join('\n')}\n\nSubtotal: ₹${subtotal.toLocaleString()}`;
    const url = `https://wa.me/917807482806?text=${encodeURIComponent(message)}`;
    console.log('Redirecting to WhatsApp:', url);
    // In real implementation: Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Watermark />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.container}>

          {/* Header */}
          <HStack className="justify-between items-start w-full">
            <VStack space="xs">
              <HStack space="xs" className="items-center">
                <Ionicons name="storefront" size={24} color="#8BC34A" />
                <ThemedText className="text-3xl font-extrabold text-green-600">Pro Shop</ThemedText>
              </HStack>
              <ThemedText className="text-sm text-gray-500">Browse and purchase official gear and equipment.</ThemedText>
            </VStack>

            <Button
              variant="solid"
              className="bg-[#8BC34A] rounded-lg px-4 flex-row items-center justify-center"
              onPress={() => setIsCartOpen(true)}
            >
              <Ionicons name="cart-outline" size={15} color="white" />
              <ButtonText className="text-white text-sm font-bold ml-2">View Cart</ButtonText>
              {totalItems > 0 && (
                <Badge className="bg-white rounded-full ml-2 px-1.5 py-0.5">
                  <BadgeText className="text-[#8BC34A] font-bold text-[10px]">{totalItems}</BadgeText>
                </Badge>
              )}
            </Button>
          </HStack>

          {/* Product Grid */}
          <View className="flex-row flex-wrap justify-between mt-6">
            {PRODUCTS.map((product) => (
              <Box
                key={product.id}
                className="w-[48%] bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6 shadow-sm"
              >
                {/* Product Image Placeholder */}
                <Box className="w-full aspect-square bg-gray-50 items-center justify-center p-4">
                  <Ionicons name="images-outline" size={40} color="#d1d5db" />
                </Box>

                <VStack space="xs" className="p-4">
                  <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>{product.name || 'Product'}</Text>
                  <Text className="text-[#8BC34A] font-black text-lg">₹{product.price.toLocaleString()}</Text>
                  <Text className="text-[11px] text-gray-400 mb-2" numberOfLines={1}>{product.description}</Text>

                  <Button
                    onPress={() => addToCart(product)}
                    className="bg-[#8BC34A] rounded-lg h-10 w-full flex-row items-center justify-center"
                  >
                    <Ionicons name="cart" size={14} color="white" />
                    <ButtonText className="text-white text-xs font-bold ml-2">Add to Cart</ButtonText>
                  </Button>
                </VStack>
              </Box>
            ))}
          </View>
        </ThemedView>
      </ScrollView>

      {/* Cart Modal */}
      <Modal
        visible={isCartOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCartOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <HStack className="justify-between items-center mb-4 px-2">
              <HStack space="xs" className="items-center">
                <Ionicons name="cart-outline" size={20} color="#8BC34A" />
                <Text style={styles.modalTitle}>Your Shopping Cart</Text>
              </HStack>
              <Pressable onPress={() => setIsCartOpen(false)}>
                <Ionicons name="close" size={24} color="#9ca3af" />
              </Pressable>
            </HStack>

            <Divider className="mb-4" />

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {cart.length === 0 ? (
                <VStack className="items-center py-10" space="md">
                  <Ionicons name="cart-outline" size={50} color="#d1d5db" />
                  <Text className="text-gray-400">Your cart is empty</Text>
                </VStack>
              ) : (
                cart.map((item) => (
                  <View key={item.product.id} className="mb-6">
                    <HStack className="justify-between items-start">
                      <HStack space="md" className="flex-1">
                        <Box className="w-16 h-16 bg-gray-50 rounded-lg items-center justify-center border border-gray-100">
                          <Ionicons name="images-outline" size={20} color="#d1d5db" />
                        </Box>
                        <VStack space="xs" className="flex-1">
                          <Text style={styles.itemName} numberOfLines={1}>{item.product.name || 'Product'}</Text>
                          <Text style={styles.itemPrice}>₹{item.product.price.toLocaleString()}</Text>
                        </VStack>
                      </HStack>

                      <VStack className="items-end" space="xs">
                        <Text style={styles.itemTotal}>₹{(item.product.price * item.quantity).toLocaleString()}</Text>
                        <Pressable onPress={() => removeFromCart(item.product.id)}>
                          <HStack space="xs" className="items-center">
                            <Ionicons name="trash-outline" size={12} color="#ef4444" />
                            <Text className="text-red-500 text-xs font-medium underline">Remove</Text>
                          </HStack>
                        </Pressable>
                      </VStack>
                    </HStack>

                    <HStack className="justify-end items-center mt-2" space="md">
                      <HStack className="bg-gray-100 rounded-full px-2 py-1 items-center" space="md">
                        <Pressable
                          onPress={() => updateQuantity(item.product.id, -1)}
                          className="w-6 h-6 rounded-full bg-white items-center justify-center shadow-sm"
                        >
                          <Ionicons name="remove" size={14} color="#374151" />
                        </Pressable>
                        <Text className="font-bold text-sm min-w-[12px] text-center">{item.quantity}</Text>
                        <Pressable
                          onPress={() => updateQuantity(item.product.id, 1)}
                          className="w-6 h-6 rounded-full bg-white items-center justify-center shadow-sm"
                        >
                          <Ionicons name="add" size={14} color="#374151" />
                        </Pressable>
                      </HStack>
                    </HStack>
                  </View>
                ))
              )}
            </ScrollView>

            {cart.length > 0 && (
              <VStack className="mt-4 pt-4 border-t border-gray-100" space="lg">
                <HStack className="justify-between items-center">
                  <Text style={styles.subtotalLabel}>Subtotal ({totalItems} items):</Text>
                  <Text style={styles.subtotalValue}>₹{subtotal.toLocaleString()}</Text>
                </HStack>

                <HStack space="xs" className="items-center bg-gray-50 p-3 rounded-lg">
                  <Ionicons name="information-circle-outline" size={16} color="#9ca3af" />
                  <Text className="text-[10px] text-gray-500 flex-1">
                    You will be redirected to WhatsApp to confirm this order.
                  </Text>
                </HStack>

                <VStack space="md">
                  <Pressable onPress={() => setIsCartOpen(false)} className="items-end px-2">
                    <Text className="text-gray-600 text-sm font-medium">Continue Shopping</Text>
                  </Pressable>

                  <Button
                    onPress={handleCheckout}
                    className="bg-[#8BC34A] rounded-xl h-14 w-full flex-row items-center justify-center shadow-md active:opacity-90"
                  >
                    <Ionicons name="logo-whatsapp" size={20} color="white" />
                    <ButtonText className="text-white text-base font-bold ml-2">Checkout via WhatsApp</ButtonText>
                  </Button>
                </VStack>
              </VStack>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: BottomTabInset + 40,
    paddingHorizontal: Spacing.four,
    flexGrow: 1,
  },
  container: {
    paddingTop: Spacing.four,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2937',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8BC34A',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  subtotalLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  subtotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
});
