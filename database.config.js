const mongoose = require('mongoose');
const databaseUrl = process.env.DATABASE_URI;


mongoose.connect(databaseUrl,{
    useUnifiedTopology:true,
})

mongoose.connection.on('connected',() => {
    console.log('Database Connected Successfully.....')
})
mongoose.connection.on('error',(error) => {
    console.log('Error When connecting database',error)
})