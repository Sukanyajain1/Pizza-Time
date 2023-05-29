const mongoose = require("mongoose"); //importing mongoose
const db_name = "pizza_time_schema";


// mongoose connection here
mongoose.connect(`mongodb+srv://root:root@clustermay.nvakqpq.mongodb.net/${db_name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("Established a connection to the database"))
    .catch( err=>console.log("Something went wrong when connecting to the database", err));