const mongoose = require("mongoose");

const AdsSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    body: String,
    urlImage: String,
    expires: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ads", AdsSchema);
