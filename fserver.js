// all users
const express = require("express");
const app = express();
const uu = require("uuid");
const bycrpt = require("bcrypt");

// // let data=require("./data")
let data = [
  { id: 1, name: "avi", last: "cohen", pasword: 1, email: "a" },
  { id: 2, name: "asi", last: "cohen", pasword: 2, email: "b" },
  { id: 3, name: "afi", last: "cohen", pasword: 3, email: "c" },
];
const port = 3000;
function allUsers() {
  console.log("kk");
  app.use(express.json());
  app.use(express.json());
  app.get("/users", (req, res) => {
    res.send(JSON.stringify(data));
    // console.log(data)
  });
}
allUsers();
// by id
function byId() {
  // app.use(express.json())
  app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    data.forEach((element) => {
      if (userId == element.id) {
        res.send(element);
      }
    });
  });
}
byId();
// creat new user
function newUser() {
  app.post("/new", (req, res) => {
    const newUser = req.body;
    let pass = req.body.pasword;
    let mai = req.body.pasword;
    let count = 0;
    let countp = 0;
    if (pass.length >= 8) {
      count += /[@]/.test(mai) ? 1 : 0;
      countp += /[a-z]/.test(pass) ? 1 : 0;
      countp += /[A-Z]/.test(pass) ? 1 : 0;
      if (countp === 2 && count === 1) {
        res.send("pasword and email valid");
      } else {
        res.send("not valid ");
      }
    } else {
      res.send("not valid");
    }
    newUser.id = uu.v4();
    data.push(newUser);
    res.send(newUser);
    console.log(data);
  });
}
newUser();
//   update user
function updateUser() {
  console.log("kkk");
  app.put("/newusers", (req, res) => {
    const uId = req.body;
    data.forEach((element) => {
      if (element.id == uId.id) {
        element.id = uId.id;
        element.name = uId.name;
        element.last = uId.last;
        res.send(data);
      }
    });
  });
}
updateUser();
// delet user
function deleteUser() {
  app.delete("/deleteuser/:id", (req, res) => {
    const dUser = req.params.id;
    data = data.filter((user) => user.id != dUser);
    res.send(data);
  });
}
deleteUser();
// by email and pasword
function byEmail() {
  app.post("/blymail", (req, res) => {
    newUserByMail = req.body;
    let mail = req.body.email;
    let pas = req.body.pasword;
    data.forEach((element) => {
      if (mail === element.email && paswordd == element.pasword) {
        res.send(element);
        res.send("User is connected");
      } else {
        res.send("wrong credentials");
      }
    });
  });
}
byEmail();
// by Encryption
async function Encryption() {
  app.post("/creatuser", (req, res) => {
    let mailE = req.body.email;
    let id = req.body.id;
    let nae = req.body.name;
    let las = req.body.last;
    console.log("mail");
    let PaswordEncryption = req.body.pasword;
    const hashedPassword = bycrpt.hashSync(PaswordEncryption, 10);
    data.push({
      id: id,
      name: nae,
      last: las,
      pasword: hashedPassword,
      email: mailE,
    });
    // data.push(userHash)
    console.log(hashedPassword);
    console.log(data);
    // res.json({ message: "User registered successfully" });
    res.send(data);
  });
}
Encryption();
console.log(data);
function validetion() {
  app.post("/login", (req, res) => {
    let userRegularPassword = req.body.pasword;
    console.log("jj");
    data.forEach((element) => {
      const passwordMatch = bycrpt.compareSync(
        userRegularPassword,
        element.pasword
      );
      if (passwordMatch) {
        res.send(element);
      }
      res.send("sucess");
      console.log(passwordMatch);
    });
  });
}
validetion();
app.listen(port, () => {});
