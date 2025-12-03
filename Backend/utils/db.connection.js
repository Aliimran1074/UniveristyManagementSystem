const mongoose=require('mongoose')

// const url=process.env.Database
const url = "mongodb://127.0.0.1:27017"
const databaseConnection=async()=>{
    try {
        await mongoose.connect(url)
        console.log('Database connected Successfully')
    } 
     catch (error) { 
        console.log("Error in Database Connection",error)
        process.exit(1)  
    } 
}    
  
   
     
 
module.exports={databaseConnection} 
 
// // import { MongoClient } from "mongodb";


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://aliimransachwani4:<db_password>@cluster0.mjwudqk.mongodb.net/?appName=Cluster0";
// // Create a new MongoClient
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true, 
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const uri = "mongodb+srv://aliimransachwani4:VKbEu2twdIPw85a8@cluster0.mjwudqk.mongodb.net/?appName=Cluster0";

// // Create a new MongoClient 
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Database connection function
// export const databaseConnection = async () => {
//   try {
//     await client.connect();
//     // Optional: test the connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. Successfully connected to MongoDB!");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1); // Stop app if DB connection fails
//   }
// };
