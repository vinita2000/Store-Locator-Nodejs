const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('DATABSE connected');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
