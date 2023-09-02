const config = require("../config/config")
const mongoose = require("mongoose");
mongoose.connect(config.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Increase the operation timeout to 30 seconds (30000 ms)
    serverSelectionTimeoutMS: 30000
}).then(() => {
    console.log("connection successfully")
}).catch((e) => {
    console.log(e)
});

