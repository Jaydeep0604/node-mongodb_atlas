const express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const router = express.Router();
require("../db/coon");
const User = require("../model/user_model");

const middleware = (req, res, next) => {
  console.log("hello middleware");
  next();
};

router.get("/", (req, res) => {
  res.send(
    `<h1>welcome, this is home page</h1><a href="/about">Go to AboutPage</a>`
  );
});

router.get("/about", middleware, (req, res) => {
  res.send(`<h1>welcome, this is about page</h1>`);
});

router.get("/help", (req, res) => {
  res.send(`<h1>welcome, this is help page</h1>`);
});

// using promises
// router.post("/data",(req, res) => {
//   if (!req.body) {
//     return res.status(400).json({ error: "No data provided" });
//   }
//   const { name, brand, price, category } = req.body;
//   if (!name || !brand || !price || !category) {
//     return res.status(422).json({ error: "please filled the field properly" });
//   }
//   User.findOne({ name: name })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "name already exist" });
//       }
//       const data = new User({ name, brand, price, category });
//       data
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "data added successfuly" });
//         })
//         .catch((error) => res.status(500).json({ error: "faild to add data" }));
//     })
//     .catch((error) => console.log(err));
//   // console.log(name);
//   // console.log(brand);
//   // console.log("Received data:", req.body);

//   //res.json({ message: "Data received successfully", data: req.body });
// });

// asyc await
router.post("/addData", jsonParser, async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "No data provided" });
  }
  const { name, brand, price, category } = req.body;
  if (!name || !brand || !price || !category) {
    return res.status(422).json({ error: "please filled the field properly" });
  }
  try {
    const userExist = await User.findOne({ name: name });
    if (userExist) {
      return res.status(422).json({ error: "name already exist" });
    }
    const data = new User({ name, brand, price, category });
    // first method
    await data.save();
    res.status(201).json({ message: "data added successfuly" });
    // // second method
    // const userData = await data.save();
    // if (userData) {
    //   res.status(201).json({ message: "data added successfuly" });
    // }
  } catch (err) {
    console.log(err);
  }
  // console.log(name);
  // console.log(brand);
  // console.log("Received data:", req.body);
  //res.json({ message: "Data received successfully", data: req.body });
});

router.get("/findOne", async (req, res) => {
  console.log(req.body);
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "please fill the data" });
    }
    const userDeail = await User.findOne({ name: name });
    console.log(userDeail);
    if (!userDeail) {
      res.status(400).json({ error: "no data available" });
    }
    res.status(200).json({ userDeail });
  } catch (err) {
    console.log(err);
  }
});

router.get("/findAll", async (req, res) => {
  console.log(req.body);
  try {
    const userDeail = await User.find({});
    console.log(userDeail);
    if (!userDeail) {
      res.status(400).json({ error: "no data available" });
    }
    res.status(200).json({ userDeail });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/userDeail/:id", async (req, res) => {
  deleteUser = await User.deleteOne({ _id: req.params.id });
  if (!deleteUser) {
    res.status(400).json({ error: "usepr not deleted" });
  }
  res.status(200).json({ message: "user deleted successfuly" });
});

router.put("/userDeail/:id", jsonParser, async (req, res) => {
  updateUser = await User.updateOne(
    { _id: req.params.id },
    { $set: { name: req.body.name, price: req.body.price } }
  );
  if (!updateUser) {
    res.status(400).json({ error: "user not updated" });
  }
  res.status(201).json({ message: "user updated successfuly" });
});

router.get("/search/:name", async (req, res) => {
  var regx = new RegExp(req.params.name, "i");
  serchUser = await User.find({ name: regx });
  if (!serchUser) {
    res.status(400).json({ error: "no user found" });
  }
  res.status(201).json({ serchUser });
});
module.exports = router;
