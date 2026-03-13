import { Badge } from "@/components/badge";
import { Box } from "@/components/box";
import { HStack } from "@/components/hstack";
import { ThemedText } from "@/components/themed-text";
import { VStack } from "@/components/vstack";
import { Spacing } from '@/constants/theme';
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HistoryTab, type GameHistory } from "./tabs/HistoryTab";
import { InProgressTab, type InProgressGame } from "./tabs/InProgressTab";
import { OverviewTab, type Scorecard } from "./tabs/OverviewTab";

// ─── TODO: swap this function with your real API call ─────────────────────────
// async function fetchGameFeed(): Promise<Scorecard[]> {
//   const res = await fetch("https://your-api.com/game-feed", {
//     headers: { Authorization: `Bearer ${YOUR_TOKEN}` },
//   });
//   const json = await res.json();
//   return json.data;
// }

// ─── Hardcoded data (remove once API is ready) ────────────────────────────────
const HARDCODED_CARDS: Scorecard[] = [
  {
    id: "1",
    playerName: "Kunal",
    date: "Mar 11, 2026",
    course: "Bangalore Golf Club",
    tee: "Red",
    holes: 18,
    grossScore: 62,
    grossDiff: -8,
    net: 62,
    points: 64,
    par: 70,
    likes: 0,
    isTournament: false,
  },
  {
    id: "2",
    playerName: "x1",
    date: "Mar 10, 2026",
    course: "w12",
    tee: "BLUE",
    holes: 18,
    grossScore: 86,
    grossDiff: 16,
    net: 78,
    points: 30,
    par: 70,
    likes: 0,
    isTournament: true,
  },
];

const HARDCODED_IN_PROGRESS: InProgressGame[] = [
  {
    id: "1",
    courseName: "ASC AEPTA",
    date: "Mar 9, 2026, 5:51:42 PM",
    holesPlayed: 1,
  },
];

const HARDCODED_HISTORY: GameHistory[] = [
  {
    id: "1",
    date: "Mar 10, 2026",
    time: "6:46 PM",
    course: "Bangalore Golf Club",
    score: 105,
    net: 105,
    parDiff: 72,
    isTournament: false,
  },
  {
    id: "2",
    date: "Mar 10, 2026",
    time: "6:00 PM",
    course: "ASC AEPTA",
    score: 0,
    net: 0,
    parDiff: 72,
    isTournament: false,
  },
  {
    id: "3",
    date: "Mar 10, 2026",
    time: "5:00 PM",
    course: "Bangalore Golf Club",
    score: 62,
    net: 62,
    parDiff: 72,
    isTournament: false,
  },
  {
    id: "4",
    date: "Mar 10, 2026",
    time: "4:57 PM",
    course: "ASC AEPTA",
    score: 0,
    net: 0,
    parDiff: 72,
    isTournament: false,
  },
  {
    id: "5",
    date: "Mar 5, 2026",
    time: "11:52 PM",
    course: "12345",
    score: 72,
    net: 68,
    parDiff: 72,
    isTournament: true,
  },
];

export default function DashboardScreen() {
  const [cards, setCards] = useState<Scorecard[]>(HARDCODED_CARDS);
  const [inProgressGames, setInProgressGames] = useState<InProgressGame[]>(HARDCODED_IN_PROGRESS);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>(HARDCODED_HISTORY);

  const handleLike = (id: string) =>
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );

  const handleDeleteInProgress = (id: string) => {
    setInProgressGames((prev) => prev.filter((game) => game.id !== id));
  };

  const handleResumeInProgress = (id: string) => {
    console.log("Resume game:", id);
    // Navigate to resume game screen
  };

  const handleViewHistory = (id: string) => {
    console.log("View history game:", id);
    // Navigate to game details screen
  };

  const [playerName, setPlayerName] = useState<string>('[Player Name]');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "Overview", icon: "grid-outline" },
    { key: "progress", label: "In Progress", icon: "hourglass-outline" },
    { key: "history", label: "Game History", icon: "time-outline" },
  ];
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    setPlayerName('Kunal');
    setLoading(false);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000" : "#f2f2f2",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <ThemedText>Player Dashboard</ThemedText> */}
        {loading ? (
          <ActivityIndicator size="small" color="#dc2626" />
        ) : (
          <VStack className="mt-2">
            <ThemedText
              style={{
                fontSize: 14,

                marginTop: 8,

              }}
            >
              Welcome back 👋
            </ThemedText>
            {/* <ThemedText 
             style={{
                fontSize: 14,
                //opacity: 0.6,
                marginTop: 8,
                textAlign: "start",
              }}
              >Welcome back 👋</ThemedText> */}
            <ThemedText className="text-3xl font-bold">Kunal</ThemedText>
          </VStack>
        )}
        {/* Tabs */}
        <View className="flex-row items-center bg-gray-100 p-1 rounded-full justify-between">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`flex-row items-center px-4 py-2 rounded-full ${active ? "bg-[#8BC34A]" : ""
                  }`}
              >
                <ThemedText
                  className={`text-sm font-medium ${active ? "text-white" : "text-gray-500"
                    }`}
                >
                  {tab.label}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        {activeTab === "overview" && (
          <>
            <VStack space="md">
              {/* Row 1 */}
              <HStack space="md">

                {/* Card 1 */}
                <Box className="flex-1 bg-white p-4 rounded-xl border border-gray-200">

                  <HStack className="justify-between items-center">

                    <VStack className="space-y-1">

                      <ThemedText className="text-3xl font-bold">3</ThemedText>
                      <ThemedText className="text-sm text-gray-500 font-medium">
                        COURSES PLAYED
                      </ThemedText>
                      <Badge className="bg-gray-200 rounded-md self-start px-2 py-1">
                        <ThemedText className="text-xs">Unique</ThemedText>
                      </Badge>
                    </VStack>
                    <Box className="bg-amber-100 p-3 rounded-full items-center justify-center mb-10">
                      <Ionicons name="location" size={15} color="#d97706" />
                    </Box>
                  </HStack>
                </Box>

                {/* Card 2 */}
                <Box className="flex-1 bg-white p-4 rounded-xl border border-gray-200">
                  <HStack className="justify-between items-center">
                    <VStack className="space-y-1">
                      <ThemedText className="text-3xl font-bold">72.300</ThemedText>
                      <ThemedText className="text-sm text-gray-500 font-medium">
                        AVG SCORE
                      </ThemedText>
                      <Badge className="bg-gray-200 rounded-md self-start px-2 py-1">
                        <ThemedText className="text-xs">Per 18 Holes</ThemedText>
                      </Badge>
                    </VStack>
                    <Box className="bg-blue-100 p-3 rounded-full items-center justify-center mb-10">
                      <Ionicons name="stats-chart-outline" size={15} color="#06abd4" />
                    </Box>
                  </HStack>
                </Box>
              </HStack>

              {/* Row 2 */}
              <HStack space="md">
                {/* Card 3 */}
                <Box className="flex-1 bg-white p-4 rounded-xl border border-gray-200">
                  <HStack className="justify-between items-center">
                    <VStack className="space-y-1">
                      <ThemedText className="text-3xl font-bold">40</ThemedText>
                      <ThemedText className="text-sm text-gray-500 font-medium">
                        BEST SCORE
                      </ThemedText>
                      <Badge className="bg-gray-200 rounded-md self-start px-2 py-1">
                        <ThemedText className="text-xs">Personal Best</ThemedText>
                      </Badge>
                    </VStack>
                    <Box className="bg-green-100 p-3 rounded-full items-center justify-center mb-10">
                      <Ionicons name="star" size={15} color="#06d428" />
                    </Box>
                  </HStack>
                </Box>

                {/* Card 4 */}
                <Box className="flex-1 bg-white p-4 rounded-xl border border-gray-200">
                  <HStack className="justify-between items-center">
                    <VStack className="space-y-1">
                      <ThemedText className="text-3xl font-bold">15</ThemedText>
                      <ThemedText className="text-sm text-gray-500 font-medium">
                        HANDICAP INDEX
                      </ThemedText>
                      <Badge className="bg-gray-200 rounded-md self-start px-2 py-1">
                        <ThemedText className="text-xs">Portable Index</ThemedText>
                      </Badge>
                    </VStack>
                    <Box className="bg-green-100 p-3 rounded-full items-center justify-center mb-10">
                      <Ionicons name="flag" size={15} color="#2fe228ff" />
                    </Box>
                  </HStack>
                </Box>
              </HStack>
            </VStack>

            {/* Home Course Handicap */}
            <Box className="w-full bg-white p-4 rounded-xl border border-gray-200 mt-3">
              <HStack className="justify-between items-center">
                <VStack className="space-y-1">
                  <ThemedText className="text-3xl font-bold">0</ThemedText>
                  <ThemedText className="text-sm text-gray-500 font-medium">
                    HOME COURSE HANDICAP
                  </ThemedText>
                  <Badge className="bg-gray-200 rounded-md self-start px-2 py-1">
                    <ThemedText className="text-xs">No Home Course</ThemedText>
                  </Badge>
                </VStack>
                <Box className="bg-gray-100 p-4 rounded-full items-center justify-center">
                  <Ionicons name="home" size={22} color="#757575ff" />
                </Box>
              </HStack>
            </Box>
          </>
        )}

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab cards={cards} handleLike={handleLike} />}
        {activeTab === "progress" && (
          <InProgressTab
            games={inProgressGames}
            onDelete={handleDeleteInProgress}
            onResume={handleResumeInProgress}
          />
        )}
        {activeTab === "history" && (
          <HistoryTab
            games={gameHistory}
            onViewGame={handleViewHistory}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    gap: Spacing.three,
  },
});