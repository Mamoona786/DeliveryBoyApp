import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    // Navigate to OrdersListScreen
    navigation.navigate("OrdersList");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Illustration */}
      <Image
        source={require("../assets/delivery-boy-logo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>DELIVERY BOY</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input with Toggle */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6f2",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "150%",
    height: 800,
    marginTop: -200,
    marginBottom: -200,
  },
  title: {
    fontSize: 40,
    fontWeight: 900,
    color: "#4a4a4a",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 20,
    fontSize: 18,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "100%",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    fontSize: 18,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#ff66b2",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff66b2",
    borderRadius: 12,
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 16,
    color: "#4a4a4a",
  },
  signupLink: {
    fontSize: 16,
    color: "#ff66b2",
    fontWeight: "bold",
  },
});
