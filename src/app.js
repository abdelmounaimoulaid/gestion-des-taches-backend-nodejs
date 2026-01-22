// 0.imports
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const tasksRouter = require("./routes/tasksRoute");
const usersRoute = require("./routes/usersRoute");

// 1.initialisation de express
const app = express();

// 2.helmet
app.use(helmet());

// 3.cors
app.use(cors());

// 4.body Parsers
app.use(express.json());

// 5.Nettoyage global des données entrantes (NoSQL Injection et XSS)
app.use((req, res, next) => {
    const { sanitize } = mongoSanitize;

    if (req.params) sanitize(req.params);
    if (req.query) sanitize(req.query);
    if (req.body) sanitize(req.body);

    next();
})

app.use((req, res, next) => {
    const sanitize = (obj) => {
        for (const key in obj) {
            if(obj[key] === "string") obj[key] = xss(obj[key])
        }
    }

    if(req.query) sanitize(req.query)
    if(req.params) sanitize(req.params)
    if (req.body) sanitize(req.body)
    next();
})

// 6.Limitation des requêtes (Rate Limiting)
const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 5,
    message: "To many requests !"
});

app.use(globalRateLimit);


const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 5
});

// 7.Connexion à MongoDB en local
mongoose.connect(process.env.MONGO_URL).then((success) => {
    console.log("Mongo DB Connected Successfully !")
}).catch((error) => {
    console.log("Error while connecting the MongoDb: ", error)
})

//8. Gestion des routes
app.use("/api/tasks", tasksRouter);
app.use('/api/auth', loginRateLimit, usersRoute);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Sorry, the page you are looking for doesnt exist !'});
});

module.exports = app;