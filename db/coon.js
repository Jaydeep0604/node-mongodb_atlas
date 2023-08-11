const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true, // not working when use this connection faild
    useUnifiedTopology: true,
    // useFindAndModify: false, // not working when use this connection faild
  })
  .then(() => {
    console.log("connection complete");
  })
  .catch((e) => console.log("failed"));
