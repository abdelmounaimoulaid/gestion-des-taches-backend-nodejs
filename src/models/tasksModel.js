const mongoose = require("mongoose");

const taskStatus = ["À faire", "En cours", "Terminé"];

const tasksSchema = mongoose.Schema(
    {
        titre: { type: String, required: true },
        description: { type: String, required: false },
        status: { type: String, enum: taskStatus, required: true, default: taskStatus[0] }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('tasks', tasksSchema);