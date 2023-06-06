const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;
const uri ="mongodb+srv://akansha:xQT8wCovlCteOzOG@cluster0.xujh5ky.mongodb.net/feed?retryWrites=true&w=majority"
const dbName = "products"

const client = new mongoClient(uri)

let db;

async function connectToDatabase(){
  try{
    await client.connect();
    
    console.log(`Connected to database ${dbName}`);
    db = client.db()
  }catch(err){
    console.log(`Error connecting to the server: ${err}`);
  }
}

async function main(){
  try{
    await connectToDatabase();
  }
  catch(err){
    console.log(`Error connecting to the server: ${err}`);
  }

}

function getDb(){
  if(db){
    return db
  }else{
    console.log("No db found");
  }
}

exports.main = main;
exports.getDb = getDb;

