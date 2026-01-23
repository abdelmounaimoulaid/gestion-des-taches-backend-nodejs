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

// 2.helmet with enhanced security configuration
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

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
            if (typeof obj[key] === "string") obj[key] = xss(obj[key])
        }
    }

    if (req.query) sanitize(req.query)
    if (req.params) sanitize(req.params)
    if (req.body) sanitize(req.body)
    next();
})

// 6.Limitation des requêtes (Rate Limiting)
const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 100, // 100 requests per 15 minutes
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(globalRateLimit);


const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 5
});

// 7.Validate critical environment variables
if (!process.env.MONGO_URL) {
    console.error("FATAL ERROR: MONGO_URL environment variable is not defined.");
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET environment variable is not defined.");
    process.exit(1);
}

// 8.Connexion à MongoDB en local
mongoose.connect(process.env.MONGO_URL).then((success) => {
    console.log("Mongo DB Connected Successfully !")
}).catch((error) => {
    console.log("Error while connecting the MongoDb: ", error)
})

//9. Gestion des routes
app.use("/api/tasks", tasksRouter);
app.use('/api/auth', loginRateLimit, usersRoute);

// 10. 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Sorry, the page you are looking for doesnt exist !' });
});

module.exports = app;