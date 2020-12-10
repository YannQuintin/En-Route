const mongoose = require("mongoose");

const { MONGO_ATLAS, MONGO_LOCAL, NODE_ENV} = process.env;

// Database connection
const connectDB = (mongoUri) => {
mongoose
  .connect(mongoUri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

};


//Check if development environement is the current
NODE_ENV === "development" ? connectDB(MONGO_LOCAL) : connectDB(MONGO_ATLAS)