const  mongoose= require("mongoose");

 const connexionDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connecte with database successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connexionDB