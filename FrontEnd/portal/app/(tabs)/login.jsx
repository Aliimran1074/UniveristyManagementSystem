import { Button, Text, View } from "react-native"



function Login() {
    return (
<View>
    <Text>
        All is Well
    </Text>
<Button title="Press Me" onPress={()=>{
    console.warn("Pakistan")
}}/>
</View>
)
}

export default Login     
 