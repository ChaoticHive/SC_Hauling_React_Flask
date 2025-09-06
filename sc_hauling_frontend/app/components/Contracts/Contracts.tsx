import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  onRemove: () => void;
}

export default function Contract({ onRemove }: Props) {
  return (
    <View style={styles.card}>
      {/* Pickup Section */}
      <Text style={styles.label}>Pick Up Location</Text>
      <TextInput style={styles.input} placeholder="Pick Up Location" />

      <Text style={styles.label}>Pick Up Item</Text>
      <TextInput style={styles.input} placeholder="Pick Up Item" />

      <Text style={styles.label}>SCU Total</Text>
      <TextInput
        style={styles.input}
        placeholder="SCU Total"
        keyboardType="numeric"
      />

      {/* Dropoff Section */}
      <Text style={[styles.label, { marginTop: 15 }]}>Drop Off Location</Text>
      <TextInput style={styles.input} placeholder="Drop Off Location" />

      <Text style={styles.label}>Drop Off Item</Text>
      <TextInput style={styles.input} placeholder="Drop Off Item" />

      <Text style={styles.label}>SCU Total</Text>
      <TextInput
        style={styles.input}
        placeholder="SCU Total"
        keyboardType="numeric"
      />

      {/* Remove Button */}
      <Button title="❌ Remove Contract" onPress={onRemove} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});
