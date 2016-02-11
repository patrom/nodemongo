var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path');

var ImageSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  filename: {
    type: String
  },
  views: {
    type: Number,
    'default': 0
  },
  likes: {
    type: Number,
    'default': 0
  },
  timestamp: {
    type: Date,
    'default': Date.now
  }
});

module.exports = mongoose.model('Image', ImageSchema);
