import React from "react";
import { useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { VStack } from "@/components/vstack";

import { ThemedText } from "@/components/themed-text";
import Watermark from "@/components/watermark";
import { useRouter } from "expo-router";
import { Button } from "@react-navigation/elements";
//               onPress={() => routePage.push("/newRound/scoreCard")}
//     const routePage = useRouter();

export default function adminDashboard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const routePage = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000" : "#f2f2f2",
      }}
    >
      <Watermark />

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="px-4 pt-6 pb-20">
          {/* Header */}
          <VStack className="mb-6">
            <ThemedText
              style={{
                fontSize: 14,
                opacity: 0.6,
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Dashboard Page
            </ThemedText>
            <Button onPress={() => routePage.push("/(profile)/adminProfile")}>
              Profile Page
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
