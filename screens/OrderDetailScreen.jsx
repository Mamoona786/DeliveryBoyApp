// OrderDetailScreen.jsx
import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import ordersData from "../assets/orders.json";

const theme = {
  primary: "#ff66b2",
  primaryDark: "#ff4da6",
  primaryLight: "#ffe6f2",
  secondary: "#f8f9fa",
  text: "#333333",
  textLight: "#777777",
  white: "#ffffff",
  border: "#e0e0e0",
  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  info: "#0dcaf0",
};

const normId = (v) => String(v || "").trim().replace(/^#/, "");

export default function OrderDetailScreen({ route }) {
  const passedOrder = route.params?.order ?? null;
  const passedId = route.params?.orderId ?? passedOrder?.id ?? null;

  // Always declare hooks at the top
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Pending");

  // Resolve canonical order from JSON by id. Fallback to passed object
  useEffect(() => {
    const idKey = normId(passedId);
    let found = null;

    if (Array.isArray(ordersData) && idKey) {
      found = ordersData.find((o) => normId(o.id) === idKey) || null;
    }
    if (!found && passedOrder) {
      found = passedOrder;
    }

    setOrder(found);
    setLoading(false);
  }, [passedId, passedOrder]);

  // Keep local status in sync when order changes
  useEffect(() => {
    if (order?.status) setStatus(order.status);
  }, [order]);

  const orderedItems = useMemo(() => {
    const base = Array.isArray(order?.items) ? order.items : [];
    return base.map((it, idx) => ({
      id: String(it.id ?? `${normId(order?.id)}-${idx}`),
      name: String(it.name ?? "Item"),
      quantity: Number(it.quantity ?? 1),
      price: Number(it.price ?? 0),
    }));
  }, [order]);

  const totalAmount = useMemo(
    () => orderedItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [orderedItems]
  );

  const openGoogleMaps = useCallback(async () => {
    const { coords, address } = order || {};
    let url = "";
    if (coords && typeof coords.lat === "number" && typeof coords.lng === "number") {
      url = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
    } else if (address) {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    } else {
      Alert.alert("Missing location", "This order has no address or coordinates.");
      return;
    }
    const can = await Linking.canOpenURL(url);
    if (can) Linking.openURL(url);
    else Alert.alert("Cannot open maps", "No maps app is available on this device.");
  }, [order]);

  const callCustomer = useCallback(async () => {
    if (!order?.phone) return;
    const telUrl = `tel:${order.phone}`;
    const can = await Linking.canOpenURL(telUrl);
    if (can) Linking.openURL(telUrl);
    else Alert.alert("Cannot place call", "Dialer is not available.");
  }, [order]);

  const markDelivered = useCallback(() => {
    if (status === "Delivered") return;
    setStatus("Delivered");
  }, [status]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 8, color: theme.textLight }}>Loading order...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.missingTitle}>Order not found</Text>
        <Text style={styles.missingText}>Open this order from the list again.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const lineTotal = item.quantity * item.price;
    return (
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.leftAlign]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.tableCell}>{item.quantity}</Text>
        <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
        <Text style={[styles.tableCell, styles.rightAlign]}>${lineTotal.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.statusBadge,
          status === "Delivered"
            ? { backgroundColor: theme.success }
            : { backgroundColor: theme.warning },
        ]}
      >
        <Text style={styles.statusText}>{status}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Order ID</Text>
        <Text style={styles.value}>#{normId(order.id)}</Text>

        <Text style={[styles.value, styles.customerName]}>
          {order.customerName || "Unknown customer"}
        </Text>

        {!!order.phone && (
          <Text style={styles.phone} onPress={callCustomer}>
            {order.phone}
          </Text>
        )}

        {!!order.address && <Text style={styles.address}>{order.address}</Text>}

        <TouchableOpacity style={styles.mapButton} onPress={openGoogleMaps}>
          <Text style={styles.mapButtonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.subHeading}>Ordered Items</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.headerCell, styles.leftAlign]}>Item</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Qty</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Price</Text>
          <Text style={[styles.tableCell, styles.headerCell, styles.rightAlign]}>Total</Text>
        </View>

        <FlatList
          data={orderedItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          scrollEnabled={false}
        />

        <View style={[styles.tableRow, styles.totalRow]}>
          <Text style={[styles.tableCell, styles.headerCell, styles.leftAlign]}>
            Grand Total
          </Text>
          <Text style={styles.tableCell} />
          <Text style={styles.tableCell} />
          <Text style={[styles.tableCell, styles.headerCell, styles.rightAlign]}>
            ${totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.deliverButton,
          status === "Delivered" && styles.deliverButtonDisabled,
        ]}
        onPress={markDelivered}
        disabled={status === "Delivered"}
      >
        <Text style={styles.deliverButtonText}>
          {status === "Delivered" ? "Delivered" : "Mark as Delivered"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.secondary, padding: 15 },
  center: { alignItems: "center", justifyContent: "center" },
  missingTitle: { fontSize: 18, fontWeight: "bold", color: theme.text, marginBottom: 6 },
  missingText: { fontSize: 14, color: theme.textLight },

  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
  statusText: { color: theme.white, fontWeight: "bold" },

  card: {
    backgroundColor: theme.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.border,
  },

  label: { fontSize: 15, fontWeight: "bold", color: theme.text },
  value: { fontSize: 15, color: "#555", marginBottom: 6 },
  customerName: { fontWeight: "bold", fontSize: 16, color: theme.text },
  phone: { color: theme.info, fontSize: 15, marginBottom: 6 },
  address: { fontSize: 14, color: theme.textLight, marginBottom: 10 },

  mapButton: {
    backgroundColor: theme.primaryLight,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  mapButtonText: { color: theme.primaryDark, fontWeight: "600" },

  subHeading: { fontSize: 15, fontWeight: "bold", color: theme.text, marginBottom: 8 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: theme.secondary,
    paddingVertical: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tableRow: { flexDirection: "row", paddingVertical: 10 },
  separator: { height: 1, backgroundColor: theme.border },
  totalRow: { borderTopWidth: 1, borderTopColor: theme.border, marginTop: 6 },

  tableCell: { flex: 1, fontSize: 14, color: theme.text, textAlign: "center" },
  leftAlign: { textAlign: "left" },
  rightAlign: { textAlign: "right" },
  headerCell: { fontWeight: "bold" },

  deliverButton: {
    backgroundColor: theme.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  deliverButtonDisabled: { backgroundColor: theme.primaryDark, opacity: 0.6 },
  deliverButtonText: { color: theme.white, fontWeight: "bold", fontSize: 18 },
});
