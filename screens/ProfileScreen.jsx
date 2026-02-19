// ProfileScreen.jsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    // add your auth clear here if needed
    Alert.alert("Logout", "You have been logged out.");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const profileStats = [
    { label: "Completed Deliveries", value: "128", icon: "checkmark-done" },
    { label: "Pending Deliveries", value: "5", icon: "time" },
    { label: "Total Earnings", value: "$2,845", icon: "cash" },
    { label: "Rating", value: "4.8 ★", icon: "star" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={require("../assets/avatar-placeholder.png")} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#ff4da6" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Alex Rider</Text>
          <Text style={styles.profileRole}>Delivery Partner</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name={stat.icon} size={20} color="#ff4da6" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Details */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="person-outline" size={20} color="#ff4da6" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="person-circle-outline" size={20} color="#777777" style={styles.infoIcon} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>Alex Rider</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#777777" style={styles.infoIcon} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>+1 555 210 0999</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#777777" style={styles.infoIcon} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>alex@deliveryapp.com</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#777777" style={styles.infoIcon} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Delivery Zone</Text>
              <Text style={styles.infoValue}>Downtown District</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color="#ffffff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: "#ffe6f2" },
  container: { flex: 1, backgroundColor: "#ffe6f2", padding: 20, paddingBottom: 40 },
  profileHeader: { alignItems: "center", marginBottom: 25 },
  avatarContainer: { position: "relative", marginBottom: 15 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#ff4da6" },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ffffff",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff4da6",
  },
  profileName: { fontSize: 24, fontWeight: "bold", color: "#333333", marginBottom: 5 },
  profileRole: { fontSize: 16, color: "#777777" },

  statsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 25 },
  statCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  statIconContainer: {
    backgroundColor: "#ffe6f2",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statValue: { fontSize: 20, fontWeight: "bold", color: "#ff4da6", marginBottom: 5 },
  statLabel: { fontSize: 14, color: "#777777" },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#ff4da6", marginLeft: 10 },

  infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  infoIcon: { marginRight: 15 },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 14, color: "#777777", marginBottom: 3 },
  infoValue: { fontSize: 16, color: "#333333", fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#f0f0f0" },

  logoutButton: {
    backgroundColor: "#ff4da6",
    borderRadius: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ff4da6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  logoutText: { color: "#ffffff", fontSize: 16, fontWeight: "bold", marginLeft: 10 },
});
