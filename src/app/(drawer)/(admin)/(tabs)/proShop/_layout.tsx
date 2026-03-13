import { Stack } from "expo-router";

export default function ProShopLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="addProduct"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}