
const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
  secNo: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  blog_id: {
    type: String,
    required: true,
  },
  image_id: {
    type: Number,
    required: true,
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;