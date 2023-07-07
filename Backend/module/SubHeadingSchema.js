const mongoose = require('mongoose');
const { Schema } = mongoose;

const subheadingInfo = new Schema({
    name:{
        type: String,
        required: true,
    },
  subheading: {
    type: String,
    required: true,
  },
  blog_id:{
    type: String,
    required: true,
  },
  secNo:{
    type:Number,
    required:true
  }
  // image: {
  //   data: Buffer,
  //   contentType: String,
  // },
});
module.exports = mongoose.model('Sub', subheadingInfo);