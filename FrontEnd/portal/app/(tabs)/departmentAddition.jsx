import { MaterialIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import apiUrl from "../../ApiUrl/apiUrl"

function departmentAddition() {

    const [availableDepartment, setAvailableDepartment] = useState([])
    const [nameOfDepartment,setNameOfDepartment]=useState('')
    const[addModalVisible,setAddModalVisible]=useState(false)
    const [addButton,setAddButton]=useState(true)
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

        {
            addButton?
           <View style={{width:"40%",borderRadius:'2%',left:'60%',marginTop:10}}>
            <TouchableOpacity style={{backgroundColor:'blue',height:'25%'}} onPress={()=>{
                console.warn('Add Button Clicked')
                setAddModalVisible(true)
                setAddButton(false)
            }}>
                <Text style={{fontSize:16,color:'white',fontWeight:'bold',textAlign:'center'}}>Add Department +</Text>
            </TouchableOpacity>
           </View>:''
        }

{
    addModalVisible?
    <View style={{ flex: 1, alignItems: 'center',justifyContent:'center',borderWidth:3,borderColor:'black',margin:'10%' }}>
        <TouchableOpacity style={{position:'absolute',top:0,right:0}} onPress={()=>{
            setAddModalVisible(false)
            setAddButton(true)
        }}>
                <MaterialIcons name="cancel" size={30} color='red' style={{marginLeft:5}}/>
        </TouchableOpacity>
                
                <TextInput value={nameOfDepartment} placeholder="Enter Department Name" style={{fontSize:16,borderWidth:1,borderColor:'black',padding:3,width:'70%'}} onChangeText={(text)=>{
                    setNameOfDepartment(text)
                }}/>
                
                <TouchableOpacity style={{ backgroundColor: 'blue',width:'70%',marginTop:5 }} onPress={() => addDepartmentFunction()}>
                    <Text style={{ color: 'white',textAlign:'center',fontSize:16 }}>Add +</Text>
                </TouchableOpacity>
            </View>:''
}   
           <ScrollView>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginVertical: 10 }}>Department Information</Text>
                </View>
                {availableDepartment ? availableDepartment.map((currentElement, currentIndex) => {
                    return (
                        <View style={{  flexDirection: 'row',padding:5,justifyContent:'space-between',marginTop:20 }} key={currentIndex}>
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
            </ScrollView>
            {/* <View style={{ flex: 1, alignItems: 'center' }}>
                <TextInput value={nameOfDepartment} placeholder="Enter Department Name" onChangeText={(text)=>{
                    setNameOfDepartment(text)
                }}/>
                <TouchableOpacity style={{ backgroundColor: 'blue' }} onPress={() => addDepartmentFunction()}>
                    <Text style={{ color: 'white' }}>Add +</Text>
                </TouchableOpacity>
            </View> */}
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
