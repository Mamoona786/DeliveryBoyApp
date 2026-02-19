import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function HistoryScreen() {
  // Sample data with more details
  const deliveries = [
    {
      id: 1,
      customer: "Jane Smith",
      rating: 5,
      feedback: "Fast delivery! The package arrived in perfect condition.",
      date: "2023-06-15",
      items: 3,
      earnings: "$12.50",
      address: "123 Main St, Apt 4B"
    },
    {
      id: 2,
      customer: "William Lee",
      rating: 4,
      feedback: "Good service. The delivery was slightly early which was great!",
      date: "2023-06-14",
      items: 5,
      earnings: "$18.75",
      address: "456 Oak Ave, Suite 200"
    },
    {
      id: 3,
      customer: "Maria Garcia",
      rating: 5,
      feedback: "Excellent communication and very polite delivery person.",
      date: "2023-06-12",
      items: 2,
      earnings: "$9.50",
      address: "789 Pine Rd"
    },
  ];

  return (
    <View style={styles.container}>

      {/* Delivery List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {deliveries.map((delivery) => (
          <View key={delivery.id} style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={20} color="#ff4da6" />
              </View>
              <View style={styles.customerInfo}>
                <Text style={styles.name}>{delivery.customer}</Text>
                <Text style={styles.date}>{delivery.date}</Text>
              </View>
              <View style={styles.rating}>
                {Array.from({ length: delivery.rating }).map((_, i) => (
                  <Ionicons key={i} name="star" size={16} color="#ffc107" />
                ))}
              </View>
            </View>

            {/* Delivery Details */}
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="cube" size={16} color="#777777" />
                <Text style={styles.detailText}>{delivery.items} items</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="cash" size={16} color="#777777" />
                <Text style={styles.detailText}>{delivery.earnings}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="location" size={16} color="#777777" />
                <Text style={styles.detailText} numberOfLines={1}>{delivery.address}</Text>
              </View>
            </View>

            {/* Feedback Section */}
            <View style={styles.feedbackContainer}>
              <Ionicons name="chatbubble" size={16} color="#777777" style={styles.feedbackIcon} />
              <Text style={styles.feedback}>{delivery.feedback}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="repeat" size={16} color="#ff4da6" />
                <Text style={styles.actionText}>Repeat Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-social" size={16} color="#ff4da6" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6f2",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    backgroundColor: "#ffe6f2",
    borderRadius: 10,
    padding: 15,
    width: "48%",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff4da6",
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#777777",
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffe6f2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  customerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  date: {
    fontSize: 12,
    color: "#777777",
  },
  rating: {
    flexDirection: "row",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
  },
  detailText: {
    fontSize: 12,
    color: "#777777",
    marginLeft: 5,
  },
  feedbackContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  feedbackIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  feedback: {
    flex: 1,
    fontSize: 14,
    color: "#555555",
    fontStyle: "italic",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ff4da6",
  },
  actionText: {
    color: "#ff4da6",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 5,
  },
});
