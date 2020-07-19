const mongoose = require("mongoose");
const express = require("express");
const app = express();

// connect method is returning a promise:

mongoose
  // * eshop:
  // ------------

  // .connect("mongodb://localhost/eshop", {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  // })

  // * querytest:
  // ------------

  .connect("mongodb://localhost/querytest", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

// * eshop- users collation:
// ------------------------

// const userSchema = mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     password: String,
//   },
//   { versionKey: false }
// );

// ------------------------

// * querytest- ads collation:
// --------------------------

const adSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    tags: Array,
    showDate: Date,
    ticketPrice: Number,
    place: String,
  },
  { versionKey: false }
);

// * User for eshop-users model:
// ----------------------------
// const User = mongoose.model("User", userSchema);

// * Ad for querytest-ads model:
// -----------------------------
const Ad = mongoose.model("Ad", adSchema);

// * example for findingAll:
// ------------------------
// Ad.find({}).then((ads) => {
// //   console.log(ads);
// // });

// * example for finding documents which their ticketPrice is greater than 20, limit them to 10 document and get only title and ticketPrice fields and sort it by ASC order:
// -----------------------------------------

Ad.find({ ticketPrice: { $gt: 20 } })
  .limit(10)
  .select({ title: 1, ticketPrice: 1 })
  .sort({ price: 1 })
  .then((ads) => {
    console.log(ads);
  });

// * example for monsoose insertOne:

// const user = new User({
//   name: "hadar yamin",
//   email: "hadar@gmail.com",
//   password: "123456",
// });
// user.save().then((result) => {
//   console.log(result);
// });
// the save method returns a promise

//--------------------------------------

// * example for mongoose updateOne:

// User.findById("5f1188fb0b5dfb48c0903245").     then((user) => {
//   (user.name = "amit nadav"), (user.password = "999999");
//   user.save().then((result) => {
//     console.log(result);
//   });
// });

// -----------------------------------------

// * example for mongoose deleteOne:

// User.deleteOne({ _id: "5f1188fb0b5dfb48c0903245" }).then((res) => {
//   console.log(res);
// });

// ------------------------------------------

// *

app.listen(3002, () => {
  console.log("NodeJS's app started at port 3002");
});
