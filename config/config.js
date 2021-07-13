const mongoose = require('mongoose');
const urlDB = 'mongodb://localhost:27017/AddressBook'
module.exports = () =>{
    mongoose.Promise = global.Promise;

    // Connecting to the database
mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        logger.error('Problem connecting to database !');
        process.exit();
    });

return mongoose.connection;

}