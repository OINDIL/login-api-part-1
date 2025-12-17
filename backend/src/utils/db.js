import { MongoClient } from "mongodb";

const mongo_uri = "mongodb://localhost:27017/" // Warning: Never use connection string in code like this

const client = new MongoClient(mongo_uri)

async function connectMongoDB() {
    try {
        await client.connect(); // start a connection

        console.log("MongoDB connected!")
    } catch (error) {
        await client.close()
        console.log("Mongo Error: ", error)
    }
}


const db = client.db("Authentication");


export { connectMongoDB, db }