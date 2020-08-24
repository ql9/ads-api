const mongoose = require("mongoose");

const AdsSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    body: String,
    urlImage: String,
    expires: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ads", AdsSchema);
