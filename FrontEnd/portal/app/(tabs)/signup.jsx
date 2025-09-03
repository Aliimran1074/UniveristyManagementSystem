import { TextInput, View } from "react-native";

export default function RegistringStudent() {
  return (
    <>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <TextInput placeholder="Enter Student Name"></TextInput>
        <TextInput placeholder="Enter personal Email Address"></TextInput>
        <TextInput placeholder="Enter Contact Number"></TextInput>
        <TextInput placeholder="Enter CNIC Number"></TextInput>
        
        
            </View>
    </>
  )
}
