import app from './app.js'
import 'colors'
import DB from './api/config/DB.js'
// Dotenv configuration
// import'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

 

// Server Listen
app.listen(PORT, (err) => {
    // Database Initialize
    DB()
    err ? console.log(err) : console.log(('Server is listening on http://localhost:' + PORT).bgBlue.black)
})




