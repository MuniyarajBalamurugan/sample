const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  handler: String,
  request: Object,
  environment: Object,
  component: Object,
  context: Object,
  raw: Object
});

module.exports = mongoose.model("User", UserSchema);
