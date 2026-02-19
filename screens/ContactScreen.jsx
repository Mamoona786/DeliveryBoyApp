import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Image } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function ContactScreen() {
  const contactMethods = [
    {
      id: 1,
      title: "Call Support",
      description: "Speak directly with our support team",
      icon: "call",
      action: () => Linking.openURL(`tel:+15552100123`),
      color: "#ff4da6"
    },
    {
      id: 2,
      title: "Email Us",
      description: "Get a response within 24 hours",
      icon: "mail",
      action: () => Linking.openURL(`mailto:support@deliveryapp.com`),
      color: "#ff66b2"
    },
    {
      id: 3,
      title: "Live Chat",
      description: "Instant messaging with an agent",
      icon: "chatbubbles",
      action: () => console.log("Live chat initiated"),
      color: "#ff4da6"
    },
    {
      id: 4,
      title: "FAQ",
      description: "Find answers to common questions",
      icon: "help-circle",
      action: () => console.log("FAQ opened"),
      color: "#ff66b2"
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={require('../assets/contact-support.png')}
            style={styles.headerImage}
          />
          <Text style={styles.title}>How can we help you?</Text>
          <Text style={styles.subtitle}>Our support team is available 24/7 to assist you</Text>
        </View>

        {/* Contact Methods */}
        <View style={styles.contactMethodsContainer}>
          {contactMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.contactCard, { borderLeftColor: method.color }]}
              onPress={method.action}
              activeOpacity={0.8}
            >
              <View style={styles.contactIconContainer}>
                <Ionicons
                  name={method.icon}
                  size={24}
                  color={method.color}
                />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactTitle}>{method.title}</Text>
                <Text style={styles.contactDescription}>{method.description}</Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#777777"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Support Center Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Support Center</Text>
          <View style={styles.infoRow}>
            <Ionicons name="time" size={18} color="#777777" />
            <Text style={styles.infoText}>24/7 Availability</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={18} color="#777777" />
            <Text style={styles.infoText}>123 Support St, Help City</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="whatsapp" size={18} color="#777777" />
            <Text style={styles.infoText}>+1 555 210 0123 (WhatsApp)</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#ffe6f2",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    maxWidth: 300,
  },
  contactMethodsContainer: {
    marginBottom: 30,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  contactIconContainer: {
    backgroundColor: "#ffe6f2",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: "#777777",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff4da6",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#555555",
    marginLeft: 10,
  },
});
