const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongodb"))
    .catch((e) => {
      console.log("Error connecting to database");
      console.log(e);
      process.exit(1);
    });
};
