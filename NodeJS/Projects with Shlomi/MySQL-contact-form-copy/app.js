const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("@hapi/joi");
const exphbs = require("express-handlebars");
// npm i express-handlebars
const app = express();
const mysql = require("mysql");

const contactSchema = Joi.object({
  fullname_field: Joi.string().required().min(2).max(70),
  email_field: Joi.string().required().email(),
  phone_field: Joi.string().regex(/^0[0-9]\d{7,8}$/),
});

let emails = [
  "hadar4476@gmail.com",
  "ido434@gmail.com",
  "nadav12345@gmail.com",
];

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    emails: emails,
  });
});

app.post("/contact", (req, res) => {
  const { error, value } = contactSchema.validate(req.body);
  if (!error) {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "eshop",
    });
    const sql = "INSERT INTO contact_log VALUES(null,?,?,?,NOW())";
    connection.connect();
    const { fullname_field, email_field, phone_field } = req.body;
    connection.query(
      sql,
      [fullname_field, email_field, phone_field],
      (error, results, field) => {
        if (results.affectedRows) {
          res.render("thanks", {
            title: "Thank You",
            fullname: value.fullname_field,
          });
        } else {
          console.log(error);
          res.render("contact", {
            title: "Contact",
            emails: emails,
          });
        }
      }
    );
  }
});

app.use((req, res) => {
  res.status(404);
  res.render("404page", { title: "Page 404" });
});

app.listen(3001, () => {
  console.log("Listening at port 3001");
});
