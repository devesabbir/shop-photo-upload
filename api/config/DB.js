import mongoose from "mongoose";
import 'colors'
import dotenv from "dotenv"
dotenv.config()

const dbUrl = process.env.DB_STRING

const options = {
    // user:process.env.USER_NAME,
    // pass:process.env.PASS_WORD,
    autoIndex: true
}

const DB = async () => {
    try {
      const db = await mongoose.connect(dbUrl,options)  
      console.log(('Database connection established Host:' + db.connection.host).bgGreen.black) 
    } catch (error) {
        console.log(error);
    }
  }
  

export default DB
