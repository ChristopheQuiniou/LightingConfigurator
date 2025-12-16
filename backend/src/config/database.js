import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config({path:"./.env"});


const uri = process.env.DB_URI.replace("<PASSWORD>",process.env.DB_PASSWORD);

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions).then(()=>{
        console.log("Connected to the database!");
    })
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(err) {
    console.error("DB error : ",err);
    process.exit(1);
  } finally {
    // Ensures that the client will close when you finish/error
    //await mongoose.disconnect();
  }
}

export default connectDB;