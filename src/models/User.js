/**
 * Created by Henry Huang.
 */
import mongoose from 'mongoose';
import config from '../config';
import autoIncrement from 'mongoose-auto-increment';

const connection = mongoose.createConnection(config.mongoUrl);
autoIncrement.initialize(connection);

const User = new mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
  email: String,
  role: String,
  enable: {
    type: Boolean,
    default: true
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  last_modified_date: {
    type: Date,
    default: Date.now
  }
});

User.plugin(autoIncrement.plugin, 'User');

export default mongoose.model('User', User);