const Tasks = require("../models/tasksModel");

exports.getTasks = (req, res, next) => {
    Tasks.find().then((tasks) => {
        res.status(200).json(tasks);
    }).catch((error) => {
        res.status(400).json({ error });
    })
}

exports.getOneTask = (req, res, next) => {
    Tasks.findOne({ _id: req.params.id }).then((task) => {
        res.status(200).json(task);
    }).catch((error) => {
        res.status(400).json({ error })
    })
}

exports.addTask = (req, res, next) => {
    delete req.body._id;
    const task = new Tasks({
        ...req.body
    });

    task.save().then(() => {
        res.status(201).json({ message: "added Successfully !" });
    }).catch((error) => {
        res.status(400).json({ error });
    })
}

exports.updateTask = (req, res, next) => {
    delete req.body._id;

    const validStatuses = ["À faire", "En cours", "Terminé"];
    if (req.body.status && !validStatuses.includes(req.body.status)) {
        return res.status(400).json({
            error: `Invalid status. Allowed values: ${validStatuses.join(", ")}`
        });
    }

    Tasks.updateOne({ _id: req.params.id }, { ...req.body }).then(() => {
        res.status(201).json({ message: "updated Successfully !" });
    }).catch((error) => {
        res.status(400).json({ error });
    })
}

exports.removeTask = (req, res, next) => {
    Tasks.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({ message: "removed Successfully !" });
    }).catch((error) => {
        res.status(400).json({ error });
    })
}