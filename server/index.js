const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();  
const cors = require('cors');
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(express.json());


// DATABASE

// You have to create a database named "budget"
// After that, put here yout password and user of MySql

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "budget",
});

// If the balance table doesn't exists, it will be created


db.query(`CREATE TABLE balance (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    mail TEXT,
    consept TEXT,
    type TEXT,
    amount MEDIUMINT,
    category TEXT,   
    date TEXT
  );`, (err, result)=>{
    if(err){
      console.log("Balance table had already been created")
    } else{
      console.log("Balance has been created")
    }

})

// The same with the users table


db.query(`CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    mail TEXT,
    password TEXT
  );`, (err, result)=>{
    if(err){
      console.log("Users table had already been created")
    } else{
      console.log("Users has been created")
    }
})

// LOGIN AND REGISTRER

const session = require("express-session");

app.use(
  session({
    secret: "personal_balance_secret",
    resave: true,
    saveUninitialized: true,
  })
);
var actualSession;

app.post("/api/register", (req, res) => {
  const password = req.body.password;
  const mail = req.body.mail;

  
  db.query(
    "SELECT * FROM users WHERE mail = ?;",
    mail,
    (error, result) => {
      if (error || result.length === 0) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }

          db.query(
            "INSERT INTO users (password, mail) VALUES (?,?)",
            [hash, mail],
            (e, resl) => {
              console.log(e);
              if (resl) {
                res.send({ message: "User registred succesfully" });
              }
            }
          );

        });
      }
      if (result) {
        if (result.length > 0) {
          res.send({ message: "This mail is already used" });
        } 
      } else{
        res.send({message: "An error has occurred, please try again"})
      }
      
    }
  );
});

app.get("/api/login", (req, res) => {
  console.log(req.session)
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/api/login", (req, res) => {
  const password = req.body.password;
  const mail = req.body.mail;

  db.query(
    "SELECT * FROM users WHERE mail = ?;",
    mail,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session);
            res.send(result);
          } else {
            res.send({ message: "Wrong mail/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});


// USE DATABASE

app.get('/api/showBalance', (req, res) => {
  db.query('SELECT * FROM budget.balance', (err, result) => {
    res.json(result);
  });
});

app.post("/api/create", (req, res) => {
  const consept = req.body.consept;
  const type = req.body.type;
  const amount = req.body.amount;
  const date = req.body.date;
  const category = req.body.category;
  const mail = req.body.mail;

  db.query(
    "INSERT INTO balance (consept, type, amount, date, category, mail) VALUES (?,?,?,?,?,?)",
    [consept, type, amount, date, category, mail],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const consept = req.body.consept;
  const amount = req.body.amount;
  const category = req.body.category;
  db.query(
    `UPDATE balance SET consept = "${consept}", amount = "${amount}", category = "${category}" WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM budget.balance WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});