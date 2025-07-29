const {z} = require('zod')

const userSchema = z.object({
  name:z.string({required_error:"Name is Required"}).trim().min(3,{message:"Name atleast of 3 characters"}),
  
  personal_email:z.string({required_error:"Email is required"}).email({message:"Email is Required"}).includes('@',{message:"Email Should Contains @ Symbol"}),
  
  password:z.string({required_error:"Password is required"}).trim().min(5,{message:"Password at least of 5 characters"}).max(15,{message:"Maximum Characters should not be exceed from 15 characters"}),
  
  contact_number:z.string({required_error:'Contact Number is required'}).trim().length(11,{message:'Phone Number should be of 11 numbers starting from 0 like this : 03123456789'}),
 
  address:z.string({required_error:'Address is Required'}).trim()

})
module.exports = userSchema