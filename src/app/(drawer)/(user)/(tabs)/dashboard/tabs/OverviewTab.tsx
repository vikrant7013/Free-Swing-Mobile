import { Avatar, AvatarFallbackText } from "@/components/avatar";
import { Badge, BadgeText } from "@/components/badge";
import { Box } from "@/components/box";
import { Button, ButtonText } from "@/components/button";
import { Divider } from "@/components/divider";
import { HStack } from "@/components/hstack";
import { Text } from "@/components/text";
import { VStack } from "@/components/vstack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export type Scorecard = {
    id: string;
    playerName: string;
    date: string;
    course: string;
    tee: string;
    holes: number;
    grossScore: number;
    grossDiff: number;
    net: number;
    points: number;
    par: number;
    likes: number;
    isTournament: boolean;
};

const diffLabel = (n: number) => (n >= 0 ? `+${n}` : `${n}`);
const diffColor = (n: number) => (n < 0 ? "#ef4444" : "#10b981");

type OverviewTabProps = {
    cards: Scorecard[];
    handleLike: (id: string) => void;
};

export function OverviewTab({ cards, handleLike }: OverviewTabProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: isDark ? "#000" : "#f2f2f2",
            }}
        >
            <VStack space="md">
                {/* Header */}
                <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                        <Text className="text-xl font-bold text-typography-900">
                            Game Feed
                        </Text>
                        <HStack className="items-center bg-green-100 px-3 py-1 rounded-full space-x-2">
                            {/* Logo Icon */}
                            <Ionicons name="pulse" size={16} color="#8BC34A" />

                            {/* Status dot */}
                            <Box className="w-2 h-2 rounded-full bg-success-500" />

                            {/* Status text */}
                            <Text className="text-xs text-success-700 font-semibold">
                                Live
                            </Text>
                        </HStack>
                    </HStack>
                </HStack>

                {/* Empty state */}
                {cards.length === 0 && (
                    <Box className="bg-background-0 rounded-2xl border border-outline-200 py-12 items-center">
                        <Text className="text-4xl">⛳</Text>
                        <Text className="text-typography-400 font-semibold text-sm mt-3">
                            No scorecards yet
                        </Text>
                    </Box>
                )}

                {/* Cards */}
                {cards.map((card) => (
                    <Box
                        key={card.id}
                        className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-4 shadow-sm"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 10,
                            elevation: 2,

                            backgroundColor: isDark ? "#111" : "#fff",
                        }}
                    >
                        {/* Header row */}
                        <HStack className="px-4 pt-4 pb-3 justify-between items-start">
                            <HStack space="sm" className="items-center flex-1">
                                <Avatar size="md" className="bg-outline-400">
                                    <AvatarFallbackText>
                                        {card.playerName.charAt(0).toUpperCase()}
                                    </AvatarFallbackText>
                                </Avatar>
                                <VStack>
                                    <Text className="text-typography-900 font-semibold text-sm">
                                        {card.playerName}
                                    </Text>
                                    <HStack space="xs" className="items-center flex-wrap mt-0.5">
                                        <Ionicons name="calendar-outline" size={11} color="#9ca3af" />
                                        <Text className="text-typography-400 text-xs">
                                            {card.date}
                                        </Text>
                                        <Text className="text-outline-200 text-xs">•</Text>
                                        <Ionicons name="flag-outline" size={11} color="#9ca3af" />
                                        <Text className="text-typography-400 text-xs">
                                            {card.course}
                                        </Text>
                                        <Box className="bg-info-100 rounded px-1.5 py-0.5">
                                            <Text className="text-info-700 text-[10px] font-bold">
                                                {card.tee}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </VStack>
                            </HStack>

                            <HStack space="xs" className="items-center">
                                {card.isTournament && (
                                    <Badge
                                        size="sm"
                                        className="bg-warning-400 rounded-full px-3 py-1"
                                    >
                                        <BadgeText className="text-white font-bold text-xs">
                                            Tournament
                                        </BadgeText>
                                    </Badge>
                                )}
                                <Badge
                                    size="sm"
                                    className="bg-typography-800 rounded-full px-3 py-1"
                                >
                                    <BadgeText className="text-white font-semibold text-xs">
                                        {card.holes} Holes
                                    </BadgeText>
                                </Badge>
                            </HStack>
                        </HStack>

                        {/* Gross Score block */}
                        <Box className="mx-4 mb-4 bg-gray-50 rounded-2xl py-8 items-center border border-gray-100">
                            <Text className="text-6xl font-black text-gray-900 tracking-tighter">
                                {card.grossScore}
                            </Text>
                            <HStack space="xs" className="items-center mt-1">
                                <Text
                                    style={{ color: diffColor(card.grossDiff) }}
                                    className="text-xl font-bold"
                                >
                                    {diffLabel(card.grossDiff)}
                                </Text>
                                <Text className="text-[10px] uppercase font-bold text-gray-400 tracking-widest ml-1">
                                    Gross
                                </Text>
                            </HStack>
                        </Box>

                        {/* NET / POINTS / PAR */}
                        <HStack space="sm" className="mx-4 mb-3">
                            {[
                                { label: "NET", value: card.net, green: true },
                                { label: "POINTS", value: card.points, green: true },
                                { label: "PAR", value: card.par, green: false },
                            ].map((s) => (
                                <Box
                                    key={s.label}
                                    className="flex-1 bg-background-0 rounded-xl border border-outline-200 items-center py-3"
                                >
                                    <Text className="text-[10px] text-typography-400 uppercase tracking-widest mb-1">
                                        {s.label}
                                    </Text>
                                    <Text
                                        className={`text-base font-bold ${s.green ? "text-success-500" : "text-typography-800"
                                            }`}
                                    >
                                        {s.value}
                                    </Text>
                                </Box>
                            ))}
                        </HStack>

                        <Divider className="bg-outline-100" />

                        {/* Footer */}
                        <HStack className="px-4 py-4 justify-between items-center bg-gray-50/50">
                            <HStack space="lg" className="items-center">
                                <Pressable
                                    onPress={() => handleLike(card.id)}
                                    className="flex-row items-center"
                                >
                                    <Ionicons name="heart-outline" size={20} color="#6b7280" />
                                    <Text className="text-gray-500 text-sm font-semibold ml-1.5">
                                        {card.likes}
                                    </Text>
                                </Pressable>
                                <Pressable className="bg-gray-200/50 p-2 rounded-full">
                                    <Ionicons name="share-social-outline" size={18} color="#6b7280" />
                                </Pressable>
                            </HStack>

                            <HStack space="md" className="items-center">
                                <Button
                                    size="sm"
                                    className="rounded-full bg-[#8BC34A] px-6 h-10 shadow-sm"
                                >
                                    <Ionicons name="eye-outline" size={14} color="white" />
                                    <ButtonText className="text-white text-xs font-bold ml-1.5">
                                        View
                                    </ButtonText>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-full border-outline-200 bg-background-50 gap-1"
                                >
                                    <Ionicons
                                        name="shield-checkmark-outline"
                                        size={13}
                                        color="#6b7280"
                                    />
                                    <ButtonText className="text-typography-500 text-xs font-semibold">
                                        Auth
                                    </ButtonText>
                                </Button>
                            </HStack>
                        </HStack>
                    </Box>
                ))}
            </VStack>
        </SafeAreaView>
    );
}
