const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {type: String, required: true},
    authors: {type: String},
    date: {type: String},
    description: {type: String},
    image: {type: String},
    link: {type: String},
    saved: {type: Boolean}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;