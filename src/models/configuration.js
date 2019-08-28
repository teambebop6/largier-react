const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const ConfigurationItem = new mongoose.Schema({
  name: String,
  title: String,
  value: String,
});

const Configuration = new mongoose.Schema({
  _id: Number,
  groupName: String,
  items: [ConfigurationItem],
});

Configuration.plugin(autoIncrement.plugin, 'Configuration');

export default mongoose.model('Configuration', Configuration);
