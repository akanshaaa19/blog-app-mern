const getDb = require("../utils/database").getDb;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const db = getDb();
  const collection = db.collection("users");

  const name = req.body.name;
  const email = req.body.email;

  const createUser = async (user) => {
    const result = await collection.insertOne(user);
    res.status(201).json({
      message: "successful",
      acknowledgment: result,
    });
  };

  collection.findOne({ email: req.body.email }).then((foundUser) => {
    if (!foundUser) {
      bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
        const user = {
          name: name,
          email: email,
          password: hashedPassword,
          posts: [],
        };

        createUser(user);
        const token = jwt.sign(
          { email: user.email, id: user._id.toString() },
          "supersecret",
          { expiresIn: "1h" }
        );

        res.status(200).json({ token: token, id: loadedUser._id.toString() });
      });
    } else {
      res.status(409).json({message: "The user email already exists! Try logging in."})
      
      // const error = new Error("The user email already exists! Try logging in.");
      // // error.status(409);
      // throw error;
      // // console.log("user exists");
    }
  });
};

exports.login = (req, res, next) => {
  const db = getDb();
  const collection = db.collection("users");

  let loadedUser;
  const email = req.body.email;

  collection
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        loadedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      } else {
        res.status(404).json({message: "The user email doesn't exists! Try Signing up."})
        // const error = new Error(
        //   "The user email doesn't exists! Try Signing up."
        // );
        // // error.status(404);
        // throw error;
      }
    })
    .then((isEqual) => {
      if (isEqual) {
        console.log("logged in");
        const token = jwt.sign(
          { email: loadedUser.email, id: loadedUser._id.toString() },
          "supersecret",
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: token, id: loadedUser._id.toString() });
      } else {
        res.status(401).json({message: "Wrong password! Try again."})
        // const error = new Error(
        //   login
        // );
        // // error.status(401);
        // throw error;
      }
    });
};
