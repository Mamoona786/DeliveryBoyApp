// DeliveryBoyApp/components/BottomNavbar.jsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const theme = {
  primary: "#ff66b2",
  primaryDark: "#ff4da6",
  primaryLight: "#ffe6f2",
  secondary: "#f8f9fa",
  text: "#333333",
  textLight: "#777777",
  white: "#ffffff",
};

export default function BottomNavbar({ navigation }) {
  const state = useNavigationState((state) => state);
  const currentRoute = state.routes[state.index]?.name || "";

  const isOrdersActive =
    currentRoute === "OrdersList" || currentRoute === "OrderDetails";
  const isProfileActive = currentRoute === "Profile";
  const isHistoryActive = currentRoute === "History";
  const isHelpActive = currentRoute === "Contact";

  return (
    <View style={styles.container}>
      <View style={styles.navContent}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("OrdersList")}
          activeOpacity={0.8}
        >
          <View style={[styles.iconWrapper, isOrdersActive && styles.activeIconWrapper]}>
            <Ionicons
              name={isOrdersActive ? "list" : "list-outline"}
              size={24}
              color={isOrdersActive ? theme.primaryDark : theme.textLight}
            />
          </View>
          <Text style={[styles.label, isOrdersActive && styles.activeLabel]}>
            Orders
          </Text>
          {isOrdersActive && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={0.8}
        >
          <View style={[styles.iconWrapper, isProfileActive && styles.activeIconWrapper]}>
            <Ionicons
              name={isProfileActive ? "person" : "person-outline"}
              size={24}
              color={isProfileActive ? theme.primaryDark : theme.textLight}
            />
          </View>
          <Text style={[styles.label, isProfileActive && styles.activeLabel]}>
            Profile
          </Text>
          {isProfileActive && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("History")}
          activeOpacity={0.8}
        >
          <View style={[styles.iconWrapper, isHistoryActive && styles.activeIconWrapper]}>
            <Ionicons
              name={isHistoryActive ? "time" : "time-outline"}
              size={24}
              color={isHistoryActive ? theme.primaryDark : theme.textLight}
            />
          </View>
          <Text style={[styles.label, isHistoryActive && styles.activeLabel]}>
            History
          </Text>
          {isHistoryActive && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Contact")}
          activeOpacity={0.8}
        >
          <View style={[styles.iconWrapper, isHelpActive && styles.activeIconWrapper]}>
            <Ionicons
              name={isHelpActive ? "help-circle" : "help-circle-outline"}
              size={24}
              color={isHelpActive ? theme.primaryDark : theme.textLight}
            />
          </View>
          <Text style={[styles.label, isHelpActive && styles.activeLabel]}>
            Help
          </Text>
          {isHelpActive && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffe6f2",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingBottom: 30,
  },
  navContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 8,
    width: 70,
    position: "relative",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  activeIconWrapper: {
    backgroundColor: theme.primaryLight,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.textLight,
  },
  activeLabel: {
    color: theme.primaryDark,
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 3,
    backgroundColor: theme.primaryDark,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
