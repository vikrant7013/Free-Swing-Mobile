import { Stack } from "expo-router";

export default function coursesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="teeBox"
        options={{
          title: "Tee Boxes",
        }}
      />
      <Stack.Screen
        name="holes"
        options={{
          title: "Edit Holes",
        }}
      />
    </Stack>
  );
}
