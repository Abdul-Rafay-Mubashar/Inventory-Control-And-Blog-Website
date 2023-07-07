const mongoose = require('mongoose');
const { Schema } = mongoose;

const ParaInfo = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    blog_id: {
        type: String,
        required: true,
    },
    secNo: {
        type: Number,
        required: true
    }
    // image: {
    //   data: Buffer,
    //   contentType: String,
    // },
});
module.exports = mongoose.model('Para', ParaInfo);