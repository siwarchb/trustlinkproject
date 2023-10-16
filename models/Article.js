const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    name:String,
    groupe:String,

  created_at    : { type: Date,  default: Date.now },
  updated_at    : { type: Date, default: Date.now }
})

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;