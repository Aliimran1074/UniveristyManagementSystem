import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Button props type
type ButtonProps = {
  title: string;
  style?: object;
  textStyle?: object;
  onPress: (value: string) => void;
};

// Button component
const Button: React.FC<ButtonProps> = ({ title, style, textStyle, onPress }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => onPress(title)}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

// Calculator main component
const IlsaCalculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handlePress = (value: string) => {
    if (value === "AC") {
      setInput("");
      setResult("");
      return;
    }

    if (value === "⌫") {
      setInput(input.slice(0, -1));
      return;
    }

    if (value === "=") {
      try {
        setResult(eval(input).toString());
      } catch {
        setResult("Error");
      }
      return;
    }

    setInput(input + value);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
        Developed By Ilsa Naeem.        </Text>
      </View>

      {/* Display */}
      <View style={styles.display}>
        <Text style={styles.input}>{input || "0"}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.row}>
        <Button title="AC" style={styles.grey} textStyle={styles.blackText} onPress={handlePress} />
        <Button title="⌫" style={styles.grey} textStyle={styles.blackText} onPress={handlePress} />
        <Button title="%" style={styles.grey} textStyle={styles.blackText} onPress={handlePress} />
        <Button title="/" style={styles.yellow} onPress={handlePress} />
      </View>

      <View style={styles.row}>
        <Button title="7" style={styles.black} onPress={handlePress} />
        <Button title="8" style={styles.black} onPress={handlePress} />
        <Button title="9" style={styles.black} onPress={handlePress} />
        <Button title="*" style={styles.yellow} onPress={handlePress} />
      </View>

      <View style={styles.row}>
        <Button title="4" style={styles.black} onPress={handlePress} />
        <Button title="5" style={styles.black} onPress={handlePress} />
        <Button title="6" style={styles.black} onPress={handlePress} />
        <Button title="-" style={styles.yellow} onPress={handlePress} />
      </View>

      <View style={styles.row}>
        <Button title="1" style={styles.black} onPress={handlePress} />
        <Button title="2" style={styles.black} onPress={handlePress} />
        <Button title="3" style={styles.black} onPress={handlePress} />
        <Button title="+" style={styles.yellow} onPress={handlePress} />
      </View>

      <View style={styles.row}>
        <Button title="00" style={styles.black} onPress={handlePress} />
        <Button title="0" style={styles.black} onPress={handlePress} />
        <Button title="." style={styles.black} onPress={handlePress} />
        <Button title="=" style={styles.yellow} onPress={handlePress} />
      </View>
    </View>
  );
};

export default IlsaCalculator;

// Styles
const BUTTON_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 30 : 40,
    paddingHorizontal: 10,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  headerText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  display: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  input: {
    color: "white",
    fontSize: 30,
  },
  result: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 6,
  },
  button: {
    flex: 1,
    height: BUTTON_HEIGHT,
    marginHorizontal: 6,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  black: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "#333",
  },
  grey: {
    backgroundColor: "#bdbdbd",
  },
  yellow: {
    backgroundColor: "#f5b400",
  },
  blackText: {
    color: "black",
  },
});
