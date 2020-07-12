"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateCreation: { type: Date, required: true, unique: true },
    taskOwner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    isCompleted: { type: Boolean, required: false
    }
});
exports.default = mongoose.model('tasks', schema);
