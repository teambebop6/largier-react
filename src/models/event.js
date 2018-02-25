const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const Event = new mongoose.Schema({
  _id: Number,
  title: String,
  location: String,
  venue: String,
  date: {
    type: Date,
    default: Date.Now,
  },
  link: String,
  type: String,
  order: {
    type: Number,
    default: -1,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  last_modified_date: {
    type: Date,
    default: Date.now,
  },
});

Event.plugin(autoIncrement.plugin, 'Event');

export default mongoose.model('Event', Event);
