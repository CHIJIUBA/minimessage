const express = require("express");
const path = require("path");
const { check, validationResult} = require('express-validator');



const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];


app.get("/", (req, res) => {
    res.render("message", {messages: messages, title: "Mini Messageboard"});
})

app.get("/new", (req, res) => {
    res.render("form");
})

app.get("/check", (req, res) => {
  res.send("Hello world");
})

app.post("/new", [
  check('email').isEmail().withMessage("This field must be a valid email"),
  check('user').isLength({ min: 5 })
],(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

    date = new Date();
    req.body["added"] = date;
    console.log(req.body);
    messages.push(req.body);
    res.redirect("/")
})


app.listen(3030, () => {
    console.log("Server is running on port 3030")
})

