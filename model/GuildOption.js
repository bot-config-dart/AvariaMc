const mongoose = require("mongoose");

const guildOptionSchema = new mongoose.Schema({
  "guildid": {
      type: String,
      required: true
  },
  "whitelistlist": {
    type: Array,
},
});

module.exports = mongoose.model("bot", guildOptionSchema);
