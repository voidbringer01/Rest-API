const app = require('./app')

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000 
const HOST = process.env.HOST || 'localhost'

app.listen(PORT,HOST,()=>{
    console.log(`Server running on ${HOST}:${PORT}...`)
})