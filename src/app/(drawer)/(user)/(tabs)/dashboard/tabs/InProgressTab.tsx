import { Badge } from "@/components/badge";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { HStack } from "@/components/hstack";
import { Text } from "@/components/text";
import { VStack } from "@/components/vstack";
import { Ionicons } from "@expo/vector-icons";

export type InProgressGame = {
    id: string;
    courseName: string;
    date: string;
    holesPlayed: number;
};

type InProgressTabProps = {
    games: InProgressGame[];
    onDelete: (id: string) => void;
    onResume: (id: string) => void;
};

export function InProgressTab({ games, onDelete, onResume }: InProgressTabProps) {
    return (
        <VStack space="md">
            <HStack className="bg-orange-100 p-3 rounded-t-xl items-center pb-2">
                <Ionicons name="hourglass" size={16} color="#4b5563" />
                <Text className="font-bold text-gray-800 ml-2">In Progress Games</Text>
            </HStack>

            {games.length === 0 ? (
                <Box className="bg-white border border-gray-200 border-t-0 p-8 rounded-b-xl items-center -mt-2">
                    <Ionicons name="documents-outline" size={32} color="#9ca3af" />
                    <Text className="text-gray-400 font-medium mt-2">No games in progress</Text>
                </Box>
            ) : (
                <VStack className="bg-white border border-gray-200 border-t-0 rounded-b-xl -mt-2">
                    {games.map((game, index) => (
                        <Box
                            key={game.id}
                            className={`p-4 flex-col ${index !== games.length - 1 ? "border-b border-gray-100" : ""
                                }`}
                        >
                            <VStack>
                                <Text className="font-bold text-base text-gray-900">{game.courseName}</Text>
                                <HStack className="items-center mt-1 space-x-2">
                                    <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                                    <Text className="text-xs text-gray-500">{game.date}</Text>
                                    <Text className="text-xs text-gray-300 mx-1">•</Text>
                                    <Badge className="bg-gray-100 rounded-md px-2 py-0.5 shrink-0 self-start">
                                        <Text className="text-[10px] font-medium text-gray-800">
                                            {game.holesPlayed} Holes Played
                                        </Text>
                                    </Badge>
                                </HStack>
                            </VStack>

                            <HStack space="md" className="mt-4 pt-4 border-t border-gray-100 w-full justify-between items-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onPress={() => onDelete(game.id)}
                                    className="border border-red-200 rounded-full h-10 w-[48%] bg-red-50 flex-row items-center justify-center flex-1"
                                >
                                    <Ionicons
                                        name="trash-outline"
                                        size={14}
                                        color="#ef4444"
                                    />
                                    <Text className="text-red-500 text-sm font-semibold ml-1.5">Delete</Text>
                                </Button>
                                <Button
                                    size="sm"
                                    onPress={() => onResume(game.id)}
                                    className="bg-[#8BC34A] rounded-full h-10 w-[48%] flex-row items-center justify-center flex-1 ml-2"
                                >
                                    <Text className="text-white text-sm font-semibold mr-1.5">Resume</Text>
                                    <Ionicons name="arrow-forward" size={14} color="white" />
                                </Button>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            )}
        </VStack>
    );
}
