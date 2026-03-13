import React from "react";
import { useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { VStack } from "@/components/vstack";

import { ThemedText } from "@/components/themed-text";
import Watermark from "@/components/watermark";
//               onPress={() => routePage.push("/newRound/scoreCard")}
//     const routePage = useRouter();

export default function adminTournamentPage() {
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
      {/* Header */}
      <VStack className="mb-6">
        <ThemedText
          style={{
            fontSize: 28,
            fontWeight: "700",
            textAlign: "center",
            lineHeight: 27,
          }}
        >
          Tournaments
        </ThemedText>
      </VStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="px-4 pt-6 pb-20">
          
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
