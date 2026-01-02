import React, { useState } from 'react'
import { Button, Text, TextInput, View } from "react-native"


// password = 1234
// username = admin
function Login() {
const [userName,setUserName]=useState('')
const [password,setPassword]=useState('')

const adminLogin=()=>{
    if(userName==='admin' && password==='1234'){
        console.warn('Login Successfully')
        setUserName('')
        setPassword('')
    }    
    else{
        console.log(userName)
        console.log(password)
        console.warn("Invalid Credentials")
        setUserName('')
        setPassword('')
    }
}


return (
<View style={{flex:1}}>
<View style={{flex:1,justifyContent:"center",marginHorizontal:5}}>
   <Text style={{fontSize:40,fontWeight:'bold'}}>Sign In</Text> 
    <Text style={{marginTop:20}}>Strict Action will Take against if you are not an authorized person and try to login</Text>
</View>
<View style={{flex:2,width:'90%',marginLeft:10}}> 
<TextInput  
 style={{borderBlockColor:'black',fontSize:14,borderWidth:2,marginBottom:10}} value={userName} onChangeText={(text)=>{
    setUserName(text)
 }} placeholder="Enter Username" ></TextInput>

<TextInput style={{borderBlockColor:'black',fontSize:14,borderWidth:2,marginBottom:10}} value={password} onChangeText={(text)=>{
    setPassword(text)
 }} placeholder="Enter Password" secureTextEntry={true} ></TextInput>


<Button title="Login" color='blue' onPress={()=>adminLogin()}/>
</View>
</View> 
)
}

export default Login     
 