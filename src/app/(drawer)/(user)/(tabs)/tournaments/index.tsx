import React from "react";
import { StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { HStack } from "@/components/hstack";
import { Ionicons } from "@expo/vector-icons";
import Watermark from "@/components/watermark";
import { Box } from "@/components/box";
import { VStack } from "@/components/vstack";

const tournaments = [
  {
    id: 1,
    name: "test tour 1",
    start: "Feb 24, 2026",
    end: "Feb 26, 2026",
    description: "No description",
  },
  {
    id: 2,
    name: "budies play",
    start: "Feb 26, 2026",
    end: "Feb 26, 2026",
    description: "No description",
  },
  {
    id: 3,
    name: "bmw",
    start: "Mar 11, 2026",
    end: "Mar 12, 2026",
    description: "No description",
    playable: true,
  },
];

export default function TournamentsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.safeArea}>
        <Watermark />

        {/* Header */}
        <HStack className="justify-between items-center mt-3">
          <ThemedText
            style={{
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Tournaments
          </ThemedText>

          <Pressable
            style={styles.createButton}
            // onPress={() => setModalVisible(true)}
            className="flex-row items-center gap-1"
          >
            <Ionicons name="add-outline" size={28} color="white" />
            <ThemedText style={{ color: "white", fontWeight: "600" }}>
              Create Tournament
            </ThemedText>
          </Pressable>
        </HStack>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {tournaments.map((tournament) => (
            <Box key={tournament.id} style={styles.card}>
              <ThemedText style={styles.title}>{tournament.name}</ThemedText>

              <ThemedText style={styles.description}>
                {tournament.description}
              </ThemedText>

              {/* Dates */}

              <HStack className="justify-between">
                <VStack>
                  <ThemedText>Start</ThemedText>
                  <ThemedText> {tournament.start}</ThemedText>
                </VStack>
                <VStack>
                  <ThemedText>End</ThemedText>
                  <ThemedText> {tournament.end}</ThemedText>
                </VStack>
              </HStack>
              {/* Leaderboard */}
              <Pressable className="flex-row justify-center items-center gap-2 border border-[#f59e0b] p-2 rounded-lg">
                <Ionicons
                  name="stats-chart-outline"
                  size={23}
                  color="#f59e0b"
                />

                <ThemedText style={styles.outlineButtonText2}>
                  View Leaderboard
                </ThemedText>
              </Pressable>

              {/* History */}
              <Pressable className="flex-row justify-center items-center gap-2 border border-[#06b6d4] p-2 rounded-lg">
                <Ionicons name="time-outline" size={23} color="#06b6d4" />

                <ThemedText style={styles.outlineButtonText}>
                  My History
                </ThemedText>
              </Pressable>

              {/* Play Button */}
              {tournament.playable && (
                <Pressable className="flex-row justify-center items-center gap-2  bg-[#8bc34a] p-2 rounded-lg">
                  <Ionicons name="play" size={23} color="white" />

                  <ThemedText style={styles.playText}>Play</ThemedText>
                </Pressable>
              )}
            </Box>
          ))}
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.one,
    paddingBottom: BottomTabInset + Spacing.two,
    maxWidth: MaxContentWidth,
  },
  createButton: {
    backgroundColor: "#8bc34a",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  list: {
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },

  card: {
    borderRadius: 14,
    padding: Spacing.four,
    gap: Spacing.two,
    borderColor: "#8bc34a",
    borderWidth: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  description: {
    opacity: 0.6,
  },

  dateRow: {
    flexDirection: "row",
    gap: Spacing.two,
    marginVertical: Spacing.two,
  },

  dateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  dateText: {
    fontSize: 12,
  },

  secondaryButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: Spacing.two,
  },

  secondaryButtonText: {
    fontWeight: "500",
  },

  outlineButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: Spacing.two,
    borderWidth: 1,
  },

  outlineButtonText: {
    fontWeight: "500",
    color: "#06b6d4",
  },
  outlineButtonText2: {
    fontWeight: "500",
    color: "#f59e0b",
  },

  playText: {
    color: "white",
    fontWeight: "600",
  },
});
