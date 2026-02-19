// App.js
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import OrdersListScreen from "./screens/OrdersListScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ContactScreen from "./screens/ContactScreen";

import BottomNavbar from "./components/BottomNavbar";

const Stack = createNativeStackNavigator();

// HOC to render a screen with the bottom navbar
const withBottomNavbar = (ScreenComponent) =>
  function ScreenWithBar(props) {
    return (
      <View style={styles.fill}>
        <ScreenComponent {...props} />
        <BottomNavbar navigation={props.navigation} />
      </View>
    );
  };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* No navbar here */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* Orders list with navbar */}
        <Stack.Screen
          name="OrdersList"
          component={withBottomNavbar(OrdersListScreen)}
          options={{
            title: "Your Orders",
            headerStyle: { backgroundColor: "#ff4da6" },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />

        {/* Order details with navbar and Orders tab kept active */}
        <Stack.Screen
          name="OrderDetails"
          component={withBottomNavbar(OrderDetailScreen)}
          options={{
            title: "Order Details",
            headerStyle: { backgroundColor: "#ff4da6" },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />

        {/* Profile with navbar */}
        <Stack.Screen
          name="Profile"
          component={withBottomNavbar(ProfileScreen)}
          options={{
            title: "Profile",
            headerStyle: { backgroundColor: "#ff4da6" },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />

        {/* History with navbar */}
        <Stack.Screen
          name="History"
          component={withBottomNavbar(HistoryScreen)}
          options={{
            title: "Delivery History",
            headerStyle: { backgroundColor: "#ff4da6" },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />

        {/* Help with navbar */}
        <Stack.Screen
          name="Contact"
          component={withBottomNavbar(ContactScreen)}
          options={{
            title: "Help",
            headerStyle: { backgroundColor: "#ff4da6" },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
