import { ScrollView } from "react-native-gesture-handler";
import Watermark from "@/components/watermark";
//               onPress={() => routePage.push("/newRound/scoreCard")}

import { useColorScheme, Text } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";

export default function EditHolesPage() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

    const routePage = useRouter();
 

  return (
    <>
      <ThemedView
        style={{
          flex: 1,
          backgroundColor: isDark ? "#000" : "#f2f2f2",
        }}
      >
        <Watermark />

        <ScrollView showsVerticalScrollIndicator={false}>
         <Text style={{ color: isDark ? "#fff" : "#000" }}>Holes Page</Text>
        </ScrollView>
      </ThemedView>

    
    </>
  );
}




