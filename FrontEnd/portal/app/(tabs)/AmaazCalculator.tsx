import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CalcButtonProps = { title: string; type?: "operator" | "equal"; onPress: (value: string) => void; };

const CalcButton: React.FC<CalcButtonProps> = ({ title, type, onPress }) => (
  <TouchableOpacity
    style={[styles.button, type==="operator" && styles.operatorButton, type==="equal" && styles.equalButton]}
    onPress={()=>onPress(title)}
    activeOpacity={0.7}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const MaryamCalculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handlePress = (value: string) => {
    if (value === "AC") {
      setInput("");
      setResult("");
      return;
    }

    if (value === "=") {
      try {
        const evalResult = eval(input);
        setResult(evalResult.toString());
      } catch (e) {
        setResult("Error");
      }
      return;
    }

    // Regular button press, update input
    setInput(prev => prev + value);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Design & Developed by Maryam</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":undefined} style={styles.calculatorContainer}>
        {/* Display */}
        <View style={styles.display}>
          <ScrollView
            horizontal
            contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.inputText}>{input || "0"}</Text>
          </ScrollView>
          {result.length > 0 && <Text style={styles.resultText}>{result}</Text>}
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          {[
            ["AC","(",")","/"],
            ["7","8","9","*"],
            ["4","5","6","-"],
            ["1","2","3","+"],
            ["0",".","="]
          ].map((row,i)=>(
            <View style={styles.row} key={i}>
              {row.map((t)=>(
                <CalcButton
                  key={t}
                  title={t}
                  type={t==="="?"equal": (["/","*","-","+","AC"].includes(t)?"operator":undefined)}
                  onPress={handlePress}
                />
              ))}
            </View>
          ))}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MaryamCalculator;

const BUTTON_HEIGHT = 70;

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#101010",paddingTop:Platform.OS==="android"? (StatusBar.currentHeight??0)+10:10,paddingHorizontal:10},
  header:{paddingVertical:12,alignItems:"center"},
  headerText:{color:"#1abc9c",fontSize:16,fontWeight:"600",letterSpacing:1},
  calculatorContainer:{flex:1,justifyContent:"flex-start",paddingTop:10},
  display:{
    backgroundColor:"#1f1f1f", borderRadius:20, padding:15, marginBottom:15, height:100,
    justifyContent:"center", alignItems:"flex-end",
    shadowColor:"#000", shadowOffset:{width:0,height:4}, shadowOpacity:0.5, shadowRadius:5, elevation:6
  },
  inputText:{color:"#fff",fontSize:28},
  resultText:{color:"#fff",fontSize:44,fontWeight:"bold",marginTop:5},
  buttons:{flex:1, justifyContent:"space-between"},
  row:{flexDirection:"row",justifyContent:"space-between",marginVertical:8},
  button:{flex:1,height:BUTTON_HEIGHT,marginHorizontal:6,borderRadius:35,backgroundColor:"#1f1f1f",justifyContent:"center",alignItems:"center",shadowColor:"#000",shadowOffset:{width:0,height:3},shadowOpacity:0.4,shadowRadius:4,elevation:5},
  operatorButton:{backgroundColor:"#1abc9c"},
  equalButton:{backgroundColor:"#3498db"},
  buttonText:{color:"#fff",fontSize:26,fontWeight:"bold"},
});
