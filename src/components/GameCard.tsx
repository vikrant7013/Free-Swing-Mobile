import { Text } from "@/components/text";
import React from "react";
import { View } from "react-native";

export default function GameCard({ item }: { item: any }) {
    return (
        <View className="bg-white p-4 rounded-xl mb-4 shadow-md">

            {/* Header */}
            <View className="flex-row justify-between">
                <View>
                    <Text className="font-bold text-base">{item.name}</Text>
                    <Text className="text-xs text-gray-500">
                        {item.date} • {item.club}
                    </Text>
                </View>

                <View className="bg-gray-100 px-2 py-1 rounded-md">
                    <Text className="text-xs">{item.holes} Holes</Text>
                </View>
            </View>

            {/* Score */}
            <View className="mt-4 items-center">
                <Text className="text-4xl font-bold">{item.gross}</Text>
                <Text className="text-red-500">{item.score}</Text>
                <Text className="text-xs text-gray-500">GROSS SCORE</Text>
            </View>

            {/* Stats */}
            <View className="flex-row justify-between mt-4">
                <Stat title="NET" value={item.net} />
                <Stat title="POINTS" value={item.points} />
                <Stat title="PAR" value={item.par} />
            </View>

        </View>
    );
}

function Stat({ title, value }: { title: string; value: string }) {
    return (
        <View className="flex-1 items-center">
            <Text className="text-xs text-gray-500">{title}</Text>
            <Text className="font-bold">{value}</Text>
        </View>
    );
}