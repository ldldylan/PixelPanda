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
  },
  category: {
    type: String,
    require: false
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Artwork', artworkSchema);
// const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// const Schema = mongoose.Schema;

// const artworkSchema = new Schema({
//   _id: Number, // specify the _id field as a Number
//   author: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: false
//   },
//   ArtworkImageUrl: {
//     type: String,
//     required: false
//   },
//   price: {
//     type: Number,
//     require: false
//   }
// }, {
//   timestamps: true
// }, { _id: false });

// // add the AutoIncrement plugin to your schema
// artworkSchema.plugin(AutoIncrement);

// module.exports = mongoose.model('Artwork', artworkSchema);