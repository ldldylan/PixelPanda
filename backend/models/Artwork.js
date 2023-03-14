const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artworkSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  ArtworkImageUrl: {
      type: String,
      required: false
  },
  price: {
    type: Number,
    require: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Artwork', artworkSchema);