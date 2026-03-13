import React from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import Watermark from "@/components/watermark";
import { VStack } from "@/components/vstack";
import { HStack } from "@/components/hstack";
import { ThemedView } from "@/components/themed-view";

const PlayerScorecard = () => {
  const isDark = useColorScheme() === "dark";

  const holes = [
    { hole: 1, yards: 403, par: 4, score: 4, net: 3, pts: 3 },
    { hole: 2, yards: 173, par: 3, score: 3, net: 3, pts: 2 },
    { hole: 3, yards: 541, par: 5, score: 6, net: 6, pts: 1 },
    { hole: 4, yards: 402, par: 4, score: 4, net: 3, pts: 3 },
    { hole: 5, yards: 494, par: 5, score: 4, net: 4, pts: 3 },
    { hole: 6, yards: 166, par: 3, score: 4, net: 4, pts: 1 },
    { hole: 7, yards: 343, par: 4, score: 6, net: 6, pts: 0 },
    { hole: 8, yards: 317, par: 4, score: 5, net: 5, pts: 1 },
    { hole: 9, yards: 368, par: 4, score: 4, net: 4, pts: 2 },
  ];

  const legendData = [
    { label: "Hole-in-One", border: "#facc15", type: "circle", text: "" },
    { label: "Albatross", border: "#0f766e", type: "circle", text: "" },
    { label: "Eagle", border: "#166534", type: "circle", text: "" },
    { label: "Birdie", border: "#16a34a", type: "circle", text: "2" },
    {
      label: "Par",
      border: "#9ca3af",
      type: "square",
      text: "9",
      dashed: true,
    },
    { label: "Bogey", border: "#ef4444", type: "square", text: "6" },
    { label: "Double Bogey", border: "#dc2626", type: "square", text: "1" },
    { label: "Triple Bogey", border: "#7c3aed", type: "square", text: "" },
    { label: "Quadruple Bogey+", border: "#000", type: "square", text: "" },
  ];

  const frontTotals = {
    yards: 3207,
    par: 36,
    score: 40,
    net: 38,
    pts: 16,
  };

  const backTotals = {
    yards: 3309,
    par: 36,
    score: 38,
    net: 36,
    pts: 18,
  };

  const grandTotals = {
    yards: 6516,
    par: 72,
    score: 78,
    net: 74,
    pts: 34,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000" : "#f2f2f2",
      }}
    >
      <Watermark />

      <ScrollView>
        <View style={{ padding: 16 }}>
          <ThemedText style={styles.title}>Scorecard</ThemedText>

          {/* Horizontal table */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Table Header */}
              <View
                style={[
                  styles.row,
                  { backgroundColor: isDark ? "#111" : "#e5e5e5" },
                ]}
              >
                {["Hole", "Yards", "Par", "Score", "Net", "Pts"].map((h) => (
                  <ThemedText key={h} style={styles.headerCell}>
                    {h}
                  </ThemedText>
                ))}
              </View>

              {/* Hole rows */}
              {holes.map((item) => (
                <View
                  key={item.hole}
                  style={[
                    styles.row,
                    { borderBottomColor: isDark ? "#333" : "#ddd" },
                  ]}
                >
                  <ThemedText style={styles.cell}>{item.hole}</ThemedText>
                  <ThemedText style={styles.cell}>{item.yards}</ThemedText>
                  <ThemedText style={styles.cell}>{item.par}</ThemedText>

                  {/* Score cell indicator */}
                  <View style={styles.scoreCell}>
                    <ThemedText>{item.score}</ThemedText>
                  </View>

                  <ThemedText style={styles.cell}>{item.net}</ThemedText>
                  <ThemedText style={styles.cell}>{item.pts}</ThemedText>
                </View>
              ))}

              {/* Front 9 */}
              <View style={[styles.row, styles.summaryRow]}>
                <ThemedText style={styles.cell}>Front 9</ThemedText>
                <ThemedText style={styles.cell}>{frontTotals.yards}</ThemedText>
                <ThemedText style={styles.cell}>{frontTotals.par}</ThemedText>
                <ThemedText style={styles.cell}>{frontTotals.score}</ThemedText>
                <ThemedText style={styles.cell}>{frontTotals.net}</ThemedText>
                <ThemedText style={styles.cell}>{frontTotals.pts}</ThemedText>
              </View>

              {/* Back 9 */}
              <View style={[styles.row, styles.summaryRow]}>
                <ThemedText style={styles.cell}>Back 9</ThemedText>
                <ThemedText style={styles.cell}>{backTotals.yards}</ThemedText>
                <ThemedText style={styles.cell}>{backTotals.par}</ThemedText>
                <ThemedText style={styles.cell}>{backTotals.score}</ThemedText>
                <ThemedText style={styles.cell}>{backTotals.net}</ThemedText>
                <ThemedText style={styles.cell}>{backTotals.pts}</ThemedText>
              </View>

              {/* Grand Total */}
              <View style={[styles.row, styles.totalRow]}>
                <ThemedText style={styles.cell}>Grand Total</ThemedText>
                <ThemedText style={styles.cell}>{grandTotals.yards}</ThemedText>
                <ThemedText style={styles.cell}>{grandTotals.par}</ThemedText>
                <ThemedText style={styles.cell}>{grandTotals.score}</ThemedText>
                <ThemedText style={styles.cell}>{grandTotals.net}</ThemedText>
                <ThemedText style={styles.cell}>{grandTotals.pts}</ThemedText>
              </View>
            </View>
          </ScrollView>

          {/* Legend */}
          <ThemedView style={styles.legendRow}>
            {legendData.map((item, index) => (
              <ThemedView key={index} style={styles.legendItem}>
                <ThemedView
                  style={[
                    styles.icon,
                    item.type === "circle" && styles.circle,
                    item.type === "square" && styles.square,
                    {
                      borderColor: item.border,
                      borderStyle: item.dashed ? "dashed" : "solid",
                    },
                  ]}
                >
                  {item.text ? (
                    <ThemedText style={styles.iconText}>{item.text}</ThemedText>
                  ) : null}
                </ThemedView>

                <ThemedText style={styles.label}>{item.label}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Legend = ({ label, color }: any) => (
  <View style={{ alignItems: "center", marginRight: 16 }}>
    <View
      style={{
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: color,
        marginBottom: 4,
      }}
    />
    <ThemedText style={{ fontSize: 11 }}>{label}</ThemedText>
  </View>
);

export default PlayerScorecard;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },

  headerCell: {
    width: 80,
    fontWeight: "700",
    textAlign: "center",
  },

  cell: {
    width: 80,
    textAlign: "center",
  },

  scoreCell: {
    width: 80,
    alignItems: "center",
  },

  summaryRow: {
    backgroundColor: "#cbd5d1",
  },

  totalRow: {
    backgroundColor: "#94a3b8",
  },

  legendContainer: {
    marginTop: 20,
  },

  legendTitle: {
    fontWeight: "700",
    marginBottom: 10,
  },

  legendRow: {
    marginTop: 20,
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
  },

  legendItem: {
    width: "25%", // 4 items per row
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 28,
    height: 28,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  circle: {
    borderRadius: 20,
  },

  square: {
    borderRadius: 4,
  },

  iconText: {
    fontSize: 12,
    fontWeight: "600",
  },

  label: {
    fontSize: 11,
    textAlign: "center",
  },
});
