import { MaterialIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import apiUrl from "../../ApiUrl/apiUrl"

function departmentAddition() {

    const [availableDepartment, setAvailableDepartment] = useState([])
    const [nameOfDepartment,setNameOfDepartment]=useState('')
    useEffect(() => {
        getAvailableDepartment()
    }, [])

    const getAvailableDepartment = async () => {
        try {
            console.log("Clicked")
            const response = await fetch(`${apiUrl}/getDepartments`)
            const data = await response.json()

            // console.log(data.gettingAllDepartment)
            if (data) {
                let departments = data.gettingAllDepartment
                setAvailableDepartment(departments)
            }
            console.log(data)
            console.warn(data)
        } catch (error) {
            console.log("Error in Getting Data", error)
        }
    }

    const addDepartmentFunction = async () => {
        try {
            if(nameOfDepartment===''){
                console.warn('Please Enter Name of Department')
                return
            }
            const response = await fetch(`${apiUrl}/departmentCreation`,{
                method:"POST",
                headers:{
                     "Content-Type":"application/json"
                },
                body:JSON.stringify({name:nameOfDepartment})
            })
            const data = await response.json()
            console.log(data)
            if(data.message==="Department Created Successfully"){
                console.warn("Department Created Successfully")
                getAvailableDepartment()
                setNameOfDepartment('')
            }
            else{
                console.log("Sorry Unable to Create Department")
            }

        } catch (error) {
            console.log("Issue in Creating Department", error)

        }
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', marginVertical: 30 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Department Information</Text>
                </View>
                {availableDepartment ? availableDepartment.map((currentElement, currentIndex) => {
                    return (
                        <View style={{  flexDirection: 'row',padding:5,justifyContent:'space-between',marginTop:10 }} key={currentIndex}>
                            <Text style={style.text}>{currentIndex + 1}</Text>
                            <Text style={style.text}>{currentElement.name}</Text>
                        <TouchableOpacity  onPress={()=>{
                            let id =currentElement._id
                            console.warn(id)
                            console.log(id)
                        }}>
                            {/* <Text >Edit</Text> */}
                            <MaterialIcons name="edit" size={20} color='green' style={{marginLeft:5}}/>

                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{
                            let id =currentElement._id
                            console.warn(id)
                            console.log(id)
                        }}>
                            {/* <Text>Delete</Text> */}
                            <MaterialIcons name="delete" size={20} color='red' style={{marginLeft:5}}/>
                        </TouchableOpacity>
                        </View>
                    )
                }) : ""}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TextInput value={nameOfDepartment} placeholder="Enter Department Name" onChangeText={(text)=>{
                    setNameOfDepartment(text)
                }}/>
                <TouchableOpacity style={{ backgroundColor: 'blue' }} onPress={() => addDepartmentFunction()}>
                    <Text style={{ color: 'white' }}>Add +</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    text: {
        fontSize: 16,
        marginHorizontal: 5
    }
})

export default departmentAddition
