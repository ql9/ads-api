const User = require("../models/login.model.js");

exports.findOne = (req, res) => {
    console.log(req.params.username);
    console.log(req.params.password);
    User.findOne({ username: req.params.username, password: req.params.password })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with username ",
                });
            }
            res.send(user);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "User not found",
                });
            }
            return res.status(500).send({
                message: "Error retrieving user ",
            });
        });
};

exports.findAll = (req, res) => {
    User.find()
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ads.",
            });
        });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.username && !req.body.password) {
        return res.status(400).send({
            message: "Note content can not be empty",
        });
    }

    const ad = new User({
        username: req.body.username,
        password: req.body.password,
    });

    // Save Ads in the database
    ad.save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Ad.",
            });
        });
};