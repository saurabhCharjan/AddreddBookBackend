const mongoose = require('mongoose');
require('dotenv').config();
module.exports = () =>{
    mongoose.Promise = global.Promise;

    // Connecting to the database
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        logger.error('Problem connecting to database !');
        process.exit();
    });

return mongoose.connection;

}