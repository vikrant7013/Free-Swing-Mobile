import { Badge, BadgeText } from "@/components/badge";
import { Box } from "@/components/box";
import { Button, ButtonText } from "@/components/button";
import { Divider } from "@/components/divider";
import { HStack } from "@/components/hstack";
import { Text } from "@/components/text";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { VStack } from "@/components/vstack";
import Watermark from "@/components/watermark";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: any;
};

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Caps with magnetic marker",
    price: 1150.0,
    description: "mix brand, caps",
    category: "Accessories",
    image: require("@/assets/images/favicon.png"), // Placeholder
  },
  {
    id: "2",
    name: "T shirt, sea blue",
    price: 1150.0,
    description: "polyester licrea",
    category: "Apparel",
    image: require("@/assets/images/favicon.png"), // Placeholder
  },
  {
    id: "3",
    name: "shoes for golf",
    price: 3456.0,
    description: "fxcvb",
    category: "Equipment",
    image: require("@/assets/images/favicon.png"), // Placeholder
  },
];

export default function ShopScreen() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ThemedView style={styles.safeArea}>
      <Watermark />
      {/* Header */}
      <VStack className="justify-between items-center m-5">
        <HStack className="justify-between items-center w-full">
        
          <ThemedText
            style={{
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Pro Shop
          </ThemedText>
          <Pressable
            style={styles2.createButton}
            className="flex-row items-center gap-1"
          >
            <Ionicons name="cart-outline" size={28} color="white" />
            <ThemedText style={{ color: "white", fontWeight: "600" }}>
              My Cart
            </ThemedText>
          </Pressable>
        </HStack>

        <Text className="text-lg text-gray-500 my-3">
          Browse and purchase official gear and equipment.
        </Text>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.container}>
          {/* Product Grid */}
          <ThemedView className="flex-row flex-wrap justify-between mt-6">
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
                  <Text
                    className="text-sm font-bold text-gray-900"
                    numberOfLines={1}
                  >
                    {product.name || "Product"}
                  </Text>
                  <Text className="text-[#8BC34A] font-black text-lg">
                    ₹{product.price.toLocaleString()}
                  </Text>
                  <Text
                    className="text-[11px] text-gray-400 mb-2"
                    numberOfLines={1}
                  >
                    {product.description}
                  </Text>

                  <Button className="bg-[#8BC34A] rounded-lg h-10 w-full flex-row items-center justify-center">
                    <Ionicons name="cart" size={14} color="white" />
                    <ButtonText className="text-white text-xs font-bold ml-2">
                      Add to Cart
                    </ButtonText>
                  </Button>
                </VStack>
              </Box>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>

      {/* Cart Modal */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: BottomTabInset + 40,
    paddingHorizontal: Spacing.four,
    flexGrow: 1,
  },
  container: {
    paddingTop: Spacing.four,
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    borderRadius: 24,
    padding: 24,
    width: "100%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1f2937",
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8BC34A",
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  subtotalLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  subtotalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
});

const styles2 = StyleSheet.create({
  createButton: {
    backgroundColor: "#8bc34a",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
