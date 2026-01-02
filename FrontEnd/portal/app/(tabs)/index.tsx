import React, { useState } from "react";
import { Alert, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IlsaCalculator from "./IlsaCalculator"; // make sure the path is correct

export default function HomePage() {
  const [showCalculator, setShowCalculator] = useState(false);

  const handleUseCalculator = () => {
    Alert.alert(
      "Info",
      "I excited to create my first calculator of course mobile application development taught by Miss Halima Sadia Khan",
      [
        {
          text: "OK",
          onPress: () => setShowCalculator(true), // navigate to calculator
        },
      ],
      { cancelable: false }
    );
  };

  // If showCalculator is true, render the calculator page
  if (showCalculator) {
    return <IlsaCalculator />;
  }

  // Otherwise, render the home page
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.name}>Ilsa Naeem</Text>
      <Text style={styles.info}>
        Hi, I am Ilsa. This calculator was built under the supervision of Miss Halima Sadiya
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleUseCalculator}>
        <Text style={styles.buttonText}>Use Calculator</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 30 : 50,
  },
  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f5b400",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 35,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
