import { useEffect, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

function departmentAddition() {
  
    const [availableDepartment,setAvailableDepartment]=useState([])

    useEffect(()=>{
        getAvailableDepartment()
    },[])
    
    const getAvailableDepartment= async()=>{
        try { console.log("Clicked")
            const response = await fetch('http://192.168.2.111:3000/api/getDepartments')
            const data = await response.json()
            // console.log(data.gettingAllDepartment)
            if(data){
                let departments= data.gettingAllDepartment
                setAvailableDepartment(departments)
            }
            console.log(data)
            console.warn(data)
        } catch (error) {
            console.log("Error in Getting Data",error)   
        }
    }
    return (
    <View>
        <Text>Department Information</Text>
        {
availableDepartment?availableDepartment.map((currentElement,currentIndex)=>{
    return(
    <View key={currentIndex}>
        <Text>{currentElement.name}</Text>
    </View>
    )
}):""
        }
        <TextInput placeholder="Enter Department Name"></TextInput>
        <TouchableOpacity style={{backgroundColor:'blue'}} onPress={()=>console.log("Hello World")}>
            <Text style={{color:'white'}}>Add +</Text>
        </TouchableOpacity>
    </View>    
  )
}

export default departmentAddition
