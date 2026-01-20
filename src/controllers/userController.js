const Users = require("../models/usersModel");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;

exports.login = (req, res, next) => {
    Users.findOne({ email: req.body.email }).then((user) => {
        if (!user) res.status(404).json({ message: "Email or Password Incorrect !" });

        bycript.compare(req.body.password, user.password).then((valid) => {
            if (!valid) res.status(404).json({ message: "Email or Password Incorrect !" });
            res.status(201).json({
                userId: user._id,
                token: jwt.sign(
                    { email: user.email },
                    SECRET_TOKEN,
                     { expiresIn: '24h' }
                )
            })

        });

    }).catch((error) => {
        res.status(400).json({ error })
    })
}

exports.signUp = (req, res, next) => {
    bycript.hash(req.body.password, 10).then(hash => {
        const user = new Users({
            email: req.body.email,
            password: hash
        });

        user.save().then(() => {
            res.status(201).json({ message: "User Created Successfully !" });
        }).catch((error) => {
            res.status(400).json({ error });
        })
    }).catch((error) => {
        res.status(500).json({ error });
    })
}