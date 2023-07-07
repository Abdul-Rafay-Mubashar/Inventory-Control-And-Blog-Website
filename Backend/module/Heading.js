const mongoose = require('mongoose');
const { Schema } = mongoose;

const HeadingInfo = new Schema({
  name: {
    type: String,
    required: true,
  },
  heading: {
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

// ItemInfo.virtual('imageUrl').get(function () {
//   if (this.image && this.image.contentType) {
//     return `data:${this.image.contentType};base64,${this.image.data.toString(
//       'base64'
//     )}`;
//   }
// });

module.exports = mongoose.model('Head', HeadingInfo);