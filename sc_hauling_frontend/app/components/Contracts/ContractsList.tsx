import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Contract from "./Contracts";

export default function ContractList() {
  const [contracts, setContracts] = useState([0]); // at least one contract

  const addContract = () => {
    setContracts([...contracts, contracts.length]);
  };

  const removeContract = (index: number) => {
    if (contracts.length === 1) return; // keep at least one
    setContracts(contracts.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {contracts.map((id, i) => (
        <Contract key={id} onRemove={() => removeContract(i)} />
      ))}
      <Button title="➕ Add Contract" onPress={addContract} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
