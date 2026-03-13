import React, { useState } from "react";
import { Pressable, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { VStack } from "@/components/vstack";
import { HStack } from "@/components/hstack";
import { Box } from "@/components/box";
import { Divider } from "@/components/divider";
import { Avatar } from "@/components/avatar";

import { ThemedText } from "@/components/themed-text";
import Watermark from "@/components/watermark";

import { UserIcon } from "lucide-react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type Member = {
  id: string;
  username: string;
  email: string;
  mobile: string;
  handicap: number;
  invitedBy: string;
  status: "Active" | "Inactive";
};

const members: Member[] = [
  {
    id: "1",
    username: "John Doe",
    email: "johndoe@email.com",
    mobile: "+1234567890",
    handicap: 3,
    invitedBy: "Admin",
    status: "Active",
  },
  {
    id: "2",
    username: "Jane Smith",
    email: "janesmith@email.com",
    mobile: "+1987654321",
    handicap: 5,
    invitedBy: "John Doe",
    status: "Active",
  },
  {
    id: "3",
    username: "Alice Johnson",
    email: "alice@email.com",
    mobile: "+1122334455",
    handicap: 2,
    invitedBy: "Jane Smith",
    status: "Inactive",
  },
];

export default function AllMembersPage() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>(() =>
    members.reduce((acc, member) => {
      acc[member.id] = true;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const toggleMember = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000" : "#f2f2f2",
      }}
    >
      {/* WATERMARK */}
      <Watermark />

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="px-4 pt-6 pb-20">

          {/* HEADER */}
          <HStack className="items-center justify-between mb-6">
            <HStack className="items-center">
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="arrow-back-outline"
                  size={24}
                  color={isDark ? "#fff" : "#020617"}
                />
              </Pressable>

              <ThemedText
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  marginLeft: 12,
                }}
              >
                All Members
              </ThemedText>
            </HStack>

            {/* MEMBERS COUNT */}
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                backgroundColor: "rgba(34,197,94,0.15)",
              }}
            >
              <Ionicons name="people-outline" size={16} color="#22c55e" />

              <ThemedText
                style={{
                  color: "#22c55e",
                  fontWeight: "700",
                  marginLeft: 6,
                  fontSize: 14,
                }}
              >
                {members.length} Members
              </ThemedText>
            </Box>
          </HStack>

          {/* MEMBERS LIST */}
          <VStack space="md">
            {members.map((member) => (
              <Box
                key={member.id}
                className="p-4 rounded-2xl mb-3"
                style={{
                  backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  shadowColor: "#000",
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                {/* MEMBER HEADER */}
                <Pressable onPress={() => toggleMember(member.id)}>
                  <HStack className="items-center justify-between">

                    <HStack className="items-center">
                      <Avatar
                        size="md"
                        style={{
                          borderWidth: 2,
                          borderColor: "#8bc34a",
                          marginRight: 10,
                        }}
                      >
                        <UserIcon size={22} color="#8bc34a" />
                      </Avatar>

                      <ThemedText style={{ fontWeight: "700", fontSize: 16 }}>
                        {member.username}
                      </ThemedText>
                    </HStack>

                    <HStack className="items-center">
                      <Box
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 20,
                          backgroundColor:
                            member.status === "Active"
                              ? "rgba(34,197,94,0.15)"
                              : "rgba(239,68,68,0.15)",
                        }}
                      >
                        <MaterialIcons
                          name={
                            member.status === "Active"
                              ? "check-circle"
                              : "cancel"
                          }
                          size={14}
                          color={
                            member.status === "Active"
                              ? "#22c55e"
                              : "#ef4444"
                          }
                        />

                        <ThemedText
                          style={{
                            marginLeft: 6,
                            fontSize: 12,
                            fontWeight: "700",
                            color:
                              member.status === "Active"
                                ? "#22c55e"
                                : "#ef4444",
                          }}
                        >
                          {member.status}
                        </ThemedText>
                      </Box>

                      <MaterialIcons
                        name={
                          expanded[member.id]
                            ? "keyboard-arrow-up"
                            : "keyboard-arrow-down"
                        }
                        size={22}
                        color={isDark ? "#fff" : "#000"}
                        style={{ marginLeft: 10 }}
                      />
                    </HStack>

                  </HStack>
                </Pressable>

                {/* DETAILS */}
                {expanded[member.id] && (
                  <>
                    <HStack className="items-center mt-3">
                      <Ionicons
                        name="mail-outline"
                        size={16}
                        color={isDark ? "#9CA3AF" : "#6B7280"}
                      />
                      <ThemedText style={{ marginLeft: 8, fontSize: 14 }}>
                        {member.email}
                      </ThemedText>
                    </HStack>

                    <HStack className="items-center mt-2">
                      <Ionicons
                        name="call-outline"
                        size={16}
                        color={isDark ? "#9CA3AF" : "#6B7280"}
                      />
                      <ThemedText style={{ marginLeft: 8, fontSize: 14 }}>
                        {member.mobile}
                      </ThemedText>
                    </HStack>

                    <HStack className="items-center mt-2">
                      <Ionicons
                        name="person-outline"
                        size={16}
                        color={isDark ? "#9CA3AF" : "#6B7280"}
                      />
                      <ThemedText style={{ marginLeft: 8, fontSize: 14 }}>
                        Invited by {member.invitedBy}
                      </ThemedText>
                    </HStack>

                    {/* HANDICAP + BLOCK */}
                    <HStack className="items-center justify-between mt-2">

                      <HStack className="items-center">
                        <Ionicons
                          name="trophy-outline"
                          size={16}
                          color={isDark ? "#9CA3AF" : "#6B7280"}
                        />
                        <ThemedText style={{ marginLeft: 8, fontSize: 14 }}>
                          Handicap {member.handicap}
                        </ThemedText>
                      </HStack>

                      <Pressable
                        onPress={() => console.log("Block", member.id)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 999,
                          backgroundColor: "rgba(239,68,68,0.1)",
                        }}
                      >
                        <Ionicons name="ban-outline" size={16} color="#ef4444" />

                        <ThemedText
                          style={{
                            marginLeft: 6,
                            fontSize: 13,
                            fontWeight: "600",
                            color: "#ef4444",
                          }}
                        >
                          Block
                        </ThemedText>
                      </Pressable>

                    </HStack>

                    <Divider style={{ marginVertical: 10 }} />
                  </>
                )}
              </Box>
            ))}
          </VStack>

        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}