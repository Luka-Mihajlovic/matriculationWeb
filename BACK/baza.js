const mongoose = require("mongoose");

async function dbConnect(){
    try {
        const link = 
        "mongodb+srv://lukamihgimnazija:lukamiha@cluster0.fgqxv80.mongodb.net/coll1?retryWrites=true&w=majority";
    
        const connection = await mongoose.connect(link, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch(err){
        console.log(`! ERROR: ${err.message}`);
    }
}

module.exports = dbConnect;