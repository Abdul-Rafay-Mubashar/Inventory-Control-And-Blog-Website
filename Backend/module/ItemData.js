const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemInfo = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

// ItemInfo.virtual('imageUrl').get(function () {
//   if (this.image && this.image.contentType) {
//     return `data:${this.image.contentType};base64,${this.image.data.toString(
//       'base64'
//     )}`;
//   }
// });

module.exports = mongoose.model('Item', ItemInfo);