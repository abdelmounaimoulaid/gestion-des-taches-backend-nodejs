const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const tasksRouter = require("./routes/tasksRoute");
const usersRoute = require("./routes/usersRoute");

const app = express();

mongoose.connect("mongodb://localhost:27017/tasks").then((success) => {
    console.log("Mongo DB Connected Successfully !")
}).catch((error) => {
    console.log("Error while connecting the MongoDb: ", error)
})

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use('/api/auth', usersRoute);
app.use("/api/tasks", tasksRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Sorry, the page you are looking for doesnt exist !'});
});

module.exports = app;