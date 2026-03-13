import React from "react";
import { useColorScheme, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { VStack } from "@/components/vstack";
import { HStack } from "@/components/hstack";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Text } from "@/components/text";

import { Ionicons } from "@expo/vector-icons";

import Watermark from "@/components/watermark";
import { router } from "expo-router";

const products = [
  {
    id: "1",
    name: "Caps with magnetic marker",
    description: "mix brand , caps",
    price: "₹1,150.00",
    image: "https://via.placeholder.com/80",
  },
  {
    id: "2",
    name: "T shirt , sea blue",
    description: "polyester licrea",
    price: "₹1,150.00",
    image: "https://via.placeholder.com/80",
  },
  {
    id: "3",
    name: "fh",
    description: "fxcvb",
    price: "₹3,456.00",
    image: "https://via.placeholder.com/80",
  },
];

export default function ProShop() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000" : "#f2f2f2",
      }}
    >
      <Watermark />

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="px-4 pb-24">

          {/* HEADER */}
          <HStack className="mb-6 items-center justify-between">

            <VStack>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "#8bc34a",
                }}
              >
                Manage Products
              </Text>
            </VStack>

            <Button
              size="sm"
              onPress={() =>
                router.push("/(drawer)/(admin)/(tabs)/proShop/addProduct")
              }
              className="bg-[#8bc34a] rounded-lg px-4 flex-row items-center"
            >
              <Ionicons name="add" size={16} color="#fff" />
              <Text className="text-white font-semibold ml-1">
                Add Product
              </Text>
            </Button>

          </HStack>

          {/* PRODUCT LIST */}
          <VStack space="md">

            {products.map((item) => (
              <Box
                key={item.id}
                style={{
                  backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
                  borderRadius: 14,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: isDark ? "#2c2c2e" : "#e5e7eb",
                }}
              >
                <HStack space="md" className="items-center">

                  {/* PRODUCT IMAGE */}
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 8,
                    }}
                  />

                  {/* PRODUCT INFO */}
                  <VStack className="flex-1">

                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 16,
                        color: isDark ? "#fff" : "#000",
                      }}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        color: isDark ? "#9ca3af" : "#6b7280",
                      }}
                    >
                      {item.description}
                    </Text>

                    <Text
                      style={{
                        color: "#8bc34a",
                        fontWeight: "700",
                        marginTop: 4,
                      }}
                    >
                      {item.price}
                    </Text>

                  </VStack>

                  {/* ACTIONS */}
                  <VStack space="xs">

                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#22c55e",
                        borderRadius: 8,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Ionicons name="create-outline" size={16} color="#fff" />
                    </Button>

                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#ef4444",
                        borderRadius: 8,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Ionicons name="trash-outline" size={16} color="#fff" />
                    </Button>

                  </VStack>

                </HStack>
              </Box>
            ))}

          </VStack>

        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}