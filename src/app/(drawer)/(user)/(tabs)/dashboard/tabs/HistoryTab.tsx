import { Badge, BadgeText } from "@/components/badge";
import { Box } from "@/components/box";
import { Button, ButtonText } from "@/components/button";
import { HStack } from "@/components/hstack";
import { Text } from "@/components/text";
import { VStack } from "@/components/vstack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Type ─────────────────────────────────────────────────────────────────────
export type GameHistory = {
    id: string;
    date: string;
    time: string;
    course: string;
    score: number;
    net: number;
    parDiff: number;   // e.g. +72 -> store as 72
    isTournament: boolean;
};

type HistoryTabProps = {
    games: GameHistory[];
    onViewGame: (id: string) => void;
};

export function HistoryTab({ games, onViewGame }: HistoryTabProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: isDark ? "#000" : "#f2f2f2",
            }}
        >
            <VStack space="md" className="pb-8">
                {games.length === 0 ? (
                    <Box className="bg-background-0 rounded-2xl border border-outline-200 py-12 items-center mt-4">
                        <Ionicons name="time-outline" size={40} color="#9ca3af" />
                        <Text className="text-typography-400 font-semibold text-sm mt-3">
                            No history yet
                        </Text>
                    </Box>
                ) : (
                    games.map((item) => (
                        <Pressable key={item.id} onPress={() => onViewGame(item.id)}>
                            <Box className="bg-white rounded-2xl border border-gray-200 p-4"
                                style={{
                                    ...styles.historyCard,
                                    backgroundColor: isDark ? "#111" : "#fff",
                                }}

                            >

                                {/* Top row: Date + Tournament badge */}
                                <HStack className="justify-between items-center mb-2">
                                    <VStack>
                                        <Text className="font-bold text-gray-900">{item.date}</Text>
                                        <Text className="text-xs text-gray-400">{item.time}</Text>
                                        <Button size="sm" className="rounded-full bg-[#8BC34A] px-6 h-10 shadow-sm">
                                            <Ionicons name="eye-outline" size={14} color="white" />
                                            <ButtonText className="text-white text-xs font-bold ml-1.5">
                                                View
                                            </ButtonText>
                                        </Button>
                                    </VStack>
                                    {item.isTournament && (
                                        <Badge className="bg-cyan-400 rounded-full px-3 py-1">
                                            <BadgeText className="text-white text-xs">🏆 Tournament</BadgeText>
                                        </Badge>
                                    )}
                                </HStack>

                                {/* Course name */}
                                <Text className="text-[#8BC34A] font-semibold text-sm mb-3">
                                    {item.course}
                                </Text>

                                {/* Score / Net / Par pills */}
                                <HStack space="sm">
                                    <Box className="flex-1 bg-gray-50 rounded-xl items-center py-2">
                                        <Text className="text-xs text-gray-400 uppercase tracking-tight">Score</Text>
                                        <Text className="font-black text-lg">{item.score}</Text>
                                    </Box>
                                    <Box className="flex-1 bg-gray-50 rounded-xl items-center py-2">
                                        <Text className="text-xs text-gray-400 uppercase tracking-tight">Net</Text>
                                        <Text className="font-black text-lg">{item.net}</Text>
                                    </Box>
                                    <Box className="flex-1 bg-red-50 rounded-xl items-center py-2">
                                        <Text className="text-xs text-gray-400 uppercase tracking-tight">Par</Text>
                                        <Text className="font-bold text-red-400">{item.parDiff >= 0 ? `+${item.parDiff}` : item.parDiff}</Text>
                                    </Box>
                                </HStack>

                            </Box>
                        </Pressable>
                    ))
                )}
            </VStack>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({

    historyCard: {
        padding: 14,
        borderRadius: 12,
    },

});