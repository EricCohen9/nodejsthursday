const jsonfile = require("jsonfile");
const express = require("express");
const app = express();
const data = "/data.json";
let users = jsonfile.readFileSync(data);
let port = 4000;
app.post('/data', async (req, res) => {
    const { id, name, email } = req.body;

    const newUser = { id, name, email };
    users.push(newUser);

    await jsonfile.writeFile(data, users);

    res.status(201).json({ message: 'User created successfully', user: newUser });
    console.log("pp")
});
app.listen(port, () => {});