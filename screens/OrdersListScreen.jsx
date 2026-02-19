// OrdersListScreen.jsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import orders from "../assets/orders.json"; // adjust path

export default function OrdersListScreen({ navigation }) {
  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("OrderDetails", { order: item })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.orderIdContainer}>
          <Ionicons name="receipt-outline" size={18} color="#ff66b2" />
          <Text style={styles.orderId}>Order {item.id}</Text>
        </View>
        <Text style={styles.price}>{item.totalPrice}</Text>
      </View>

      <View style={styles.customerInfo}>
        <Ionicons name="person-outline" size={16} color="#777777" style={styles.icon} />
        <Text style={styles.customer}>{item.customerName}</Text>
      </View>

      <View style={styles.addressInfo}>
        <Ionicons name="location-outline" size={16} color="#777777" style={styles.icon} />
        <Text style={styles.address}>{item.address}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={[
          styles.statusContainer,
          item.status === "Delivered" ? styles.statusDelivered : styles.statusPending
        ]}>
          <Ionicons
            name={item.status === "Delivered" ? "checkmark-circle" : "time"}
            size={14}
            color={item.status === "Delivered" ? "#28a745" : "#856404"}
          />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate("OrderDetails", { order: item })}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color="#ff66b2" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Deliveries</Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, styles.pendingNumber]}>
              {orders.filter(o => o.status !== "Delivered").length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Image
              source={require('../assets/empty-orders.png')}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>No orders available</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6f2"
  },
  header: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15
  },
  headerStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20
  },
  statItem: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffe6f2",
    borderRadius: 10,
    width: "48%"
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff66b2",
    marginBottom: 5
  },
  pendingNumber: {
    color: "#ffc107"
  },
  statLabel: {
    fontSize: 14,
    color: "#777777"
  },
  listContent: {
    padding: 15
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  orderIdContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff66b2",
    marginLeft: 8
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333"
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  addressInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  icon: {
    marginRight: 8
  },
  customer: {
    fontSize: 16,
    color: "#333333"
  },
  address: {
    fontSize: 14,
    color: "#777777",
    flex: 1
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#fff3cd"
  },
  statusDelivered: {
    backgroundColor: "#d4edda"
  },
  statusPending: {
    backgroundColor: "#fff3cd"
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
    color: "#856404"
  },
  statusDeliveredText: {
    color: "#28a745"
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  detailsButtonText: {
    color: "#ff66b2",
    fontWeight: "bold",
    marginRight: 4
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    opacity: 0.6
  },
  emptyText: {
    fontSize: 16,
    color: "#777777"
  }
});
