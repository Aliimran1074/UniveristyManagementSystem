import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CalcButtonProps = { title: string; type?: "operator" | "equal"; onPress: (value: string) => void; };

const CalcButton: React.FC<CalcButtonProps> = ({ title, type, onPress }) => (
  <TouchableOpacity style={[styles.button, type==="operator" && styles.operatorButton, type==="equal" && styles.equalButton]} onPress={()=>onPress(title)}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const SabaCalculator: React.FC = () => {
  const [input,setInput] = useState<string>(""); const [result,setResult] = useState<string>("");
  const handlePress=(value:string)=>{if(value==="AC"){setInput("");setResult("");return;}if(value==="="){try{const evalResult=eval(input);setResult(evalResult.toString());}catch(e){setResult("Error");}return;}setInput(input+value);};

  return(
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1c1c1c"/>
      <View style={styles.header}><Text style={styles.headerText}>Design & Developed by Kausar Mumtaz</Text></View>
      <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":undefined} style={styles.calculatorContainer}>
        <View style={styles.display}><Text style={styles.inputText}>{input}</Text><Text style={styles.resultText}>{result}</Text></View>
        <View style={styles.buttons}>
          <View style={styles.row}>
            <CalcButton title="AC" type="operator" onPress={handlePress}/>
            <CalcButton title="(" type="operator" onPress={handlePress}/>
            <CalcButton title=")" type="operator" onPress={handlePress}/>
            <CalcButton title="/" type="operator" onPress={handlePress}/>
          </View>
          <View style={styles.row}>
            <CalcButton title="7" onPress={handlePress}/>
            <CalcButton title="8" onPress={handlePress}/>
            <CalcButton title="9" onPress={handlePress}/>
            <CalcButton title="*" type="operator" onPress={handlePress}/>
          </View>
          <View style={styles.row}>
            <CalcButton title="4" onPress={handlePress}/>
            <CalcButton title="5" onPress={handlePress}/>
            <CalcButton title="6" onPress={handlePress}/>
            <CalcButton title="-" type="operator" onPress={handlePress}/>
          </View>
          <View style={styles.row}>
            <CalcButton title="1" onPress={handlePress}/>
            <CalcButton title="2" onPress={handlePress}/>
            <CalcButton title="3" onPress={handlePress}/>
            <CalcButton title="+" type="operator" onPress={handlePress}/>
          </View>
          <View style={styles.row}>
            <CalcButton title="0" onPress={handlePress}/>
            <CalcButton title="." onPress={handlePress}/>
            <CalcButton title="=" type="equal" onPress={handlePress}/>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SabaCalculator;

const BUTTON_HEIGHT=70;
const styles=StyleSheet.create({
container:{flex:1,backgroundColor:"gray",paddingTop:Platform.OS==="android"? (StatusBar.currentHeight??0)+10:10,paddingHorizontal:10},
header:{paddingVertical:12,alignItems:"center"},
headerText:{color:"white",fontSize:14,letterSpacing:1},
calculatorContainer:{flex:1,justifyContent:"flex-start",paddingTop:20},
display:{justifyContent:"flex-end",alignItems:"flex-end",padding:20,marginBottom:20},
inputText:{color:"black",fontSize:28},
resultText:{color:"#fff",fontSize:48,fontWeight:"bold",marginTop:10},
buttons:{},
row:{flexDirection:"row",justifyContent:"space-between",marginVertical:8},
button:{flex:1,height:BUTTON_HEIGHT,marginHorizontal:6,borderRadius:35,backgroundColor:"green",justifyContent:"center",alignItems:"center"},
operatorButton:{backgroundColor:"darkblue"},
equalButton:{flex:1,height:BUTTON_HEIGHT,marginHorizontal:6,borderRadius:35,backgroundColor:"orange"},
buttonText:{color:"#fff",fontSize:24,fontWeight:"bold"},
});
