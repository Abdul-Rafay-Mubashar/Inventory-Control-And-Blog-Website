const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogInfo = new Schema({
});
module.exports = mongoose.model('Blog', BlogInfo);