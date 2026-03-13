import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function GolfLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Background image URL
  // const bgImage = { uri: "https://images.pexels.com/photos/4171735/pexels-photo-4171735.jpeg" };
  // const bgImage = require("/assets/golf-bg.jpg")
  // const bgImage = require("/assets/golf-bggg.jpg")
  const bgImage = require("/assets/golf-bgg.jpg")

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={bgImage}
        style={{ flex: 1, width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          {/* Optional Header Text */}
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold" }}>
              Login
            </Text>
            <Text style={{ color: "#e0f2d9", fontSize: 16, marginTop: 6 }}>
              Enter your account details
            </Text>
          </View>

          {/* Form Card */}
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.6)", // stronger glass
              borderWidth: 1,
              borderColor: "rgba(240,255,240,0.9)",
              borderRadius: 24,
              padding: 28,
              marginHorizontal: 20,
              shadowColor: "#000", 
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              // elevation: 12,
            }}
          >
            {/* Email */}
            <Text style={{ fontWeight: "600", marginBottom: 6, color: "#374151" }}>
              Email
            </Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="rgba(0,0,0,0.4)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.1)",
                borderRadius: 14,
                paddingHorizontal: 16,
                height: 50,
                marginBottom: 20,
                backgroundColor: "rgba(255,255,255,0.9)", // stronger input background
                color: "#000",
              }}
            />

            {/* Password */}
            <Text style={{ fontWeight: "600", marginBottom: 6, color: "#374151" }}>
              Password
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.1)",
                borderRadius: 14,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                height: 50,
                marginBottom: 24,
                backgroundColor: "rgba(255,255,255,0.9)",
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="rgba(0,0,0,0.4)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{ flex: 1, height: "100%", color: "#000" }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={22}
                  color="#374151"
                />
              </TouchableOpacity>
            </View>

            {/* Remember & Forgot */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <Text style={{ color: "#374151" }}>Remember Me</Text>
              <Text style={{ color: "#2e7d32", fontWeight: "600" }}>Forgot Password?</Text>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                backgroundColor: "#8bc34a",
                paddingVertical: 16,
                borderRadius: 14,
                alignItems: "center",
                marginBottom: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 4,
              }}
              // onPress={() => router.replace("/(drawer)/(user)/(tabs)/dashboard")}
              onPress={() => router.replace("/(drawer)/(admin)/(tabs)/dashboard")}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 17 }}>Login</Text>
            </TouchableOpacity>

            {/* Signup Link */}
            <Text style={{ textAlign: "center", color: "#374151" }}>
              Don't have an Account?{" "}
              <Text
                style={{ color: "#2e7d32", fontWeight: "600" }}
                onPress={() => router.push("/signup")}
              >
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}